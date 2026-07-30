const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { fork } = require('child_process');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
    
    // START THE WHATSAPP BOT IN THE BACKGROUND
    console.log('> Starting WhatsApp Bot as a child process...');
    const botPath = path.join(__dirname, 'whatsapp-bot.js');
    const botProcess = fork(botPath);
    
    botProcess.on('error', (err) => {
      console.error('Bot process error:', err);
    });
    
    botProcess.on('exit', (code) => {
      console.log(`Bot process exited with code ${code}`);
    });
  });
});
