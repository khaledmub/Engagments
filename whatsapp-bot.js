import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import pino from 'pino';

// Initialize Prisma
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

let pollingStarted = false;
let isProcessing = false; // Lock to prevent overlapping polls
let currentSock = null;

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('\n======================================================');
            console.log('  SCAN THIS QR CODE WITH YOUR WHATSAPP:');
            console.log('  Phone → Settings → Linked Devices → Link a Device');
            console.log('======================================================\n');
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            if (statusCode === DisconnectReason.loggedOut) {
                console.log('❌ Logged out. Delete auth_info_baileys and re-scan.');
                process.exit(1);
            } else if (statusCode === 440) {
                console.log('⚠️  Conflict. Waiting 10s...');
                setTimeout(() => connectToWhatsApp(), 10000);
            } else {
                console.log('Connection closed. Reconnecting in 3s...');
                setTimeout(() => connectToWhatsApp(), 3000);
            }
        } else if (connection === 'open') {
            console.log('\n✅ WhatsApp Bot is Ready and Connected!\n');
            currentSock = sock;
            
            if (!pollingStarted) {
                pollingStarted = true;
                console.log('📡 Polling database every 5 seconds for new RSVPs...\n');
                setInterval(checkDatabaseAndSendMessages, 5000);
            }
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

async function checkDatabaseAndSendMessages() {
    // Skip if already processing or not connected
    if (isProcessing || !currentSock) return;
    isProcessing = true;
    
    try {
        const pendingGuests = await prisma.guest.findMany({
            where: { messageSent: false }
        });

        if (pendingGuests.length === 0) {
            isProcessing = false;
            return;
        }

        console.log(`Found ${pendingGuests.length} pending guest(s)...`);

        for (const guest of pendingGuests) {
            let cleanPhone = guest.phone.replace(/\D/g, '');
            
            // Auto-fix Egyptian numbers: 01... → 201...
            if (cleanPhone.startsWith('0')) {
                cleanPhone = '2' + cleanPhone;
            }
            
            // Skip invalid numbers
            if (cleanPhone.length < 10) {
                console.log(`⏭️  Skipping ${guest.name} — invalid phone "${guest.phone}"`);
                await prisma.guest.update({ where: { id: guest.id }, data: { messageSent: true } });
                continue;
            }

            const chatId = `${cleanPhone}@s.whatsapp.net`;
            const totalAttendees = 1 + guest.companions;
            const msg = `أهلاً ${guest.name}، تم تأكيد حضورك لحفل خطوبة عمرو وياسمين!
رقم الدخول الخاص بك هو: ${guest.entryNumber}
عدد الحضور المسجل: ${totalAttendees}

الموقع: فندق الأنفوشي · قاعة الفيروز · بحري، الإسكندرية
رابط جوجل ماب: https://maps.app.goo.gl/qJt9yN31W5aQhXzZ9

نتطلع لرؤيتكم.`;

            console.log(`📤 Sending to ${guest.name} → ${cleanPhone}...`);
            
            try {
                const sendPromise = currentSock.sendMessage(chatId, { text: msg });
                const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('Timed out (15s)')), 15000));
                await Promise.race([sendPromise, timeout]);
                
                await prisma.guest.update({ where: { id: guest.id }, data: { messageSent: true } });
                console.log(`✅ Sent to ${guest.name}!`);
            } catch (err) {
                console.error(`❌ Failed: ${guest.name} — ${err.message}`);
                // Mark as sent anyway after 3 failures to avoid infinite loop
            }
            
            // 2s gap between messages
            await new Promise(r => setTimeout(r, 2000));
        }
    } catch (error) {
        console.error("DB error:", error.message);
    }
    
    isProcessing = false;
}

connectToWhatsApp();
