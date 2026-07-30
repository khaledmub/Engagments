import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Initialize Prisma
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export async function POST(req) {
  try {
    const { name, phone, companions } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    // Generate a simple random entry number
    const entryNumber = Math.floor(1000 + Math.random() * 9000).toString();
    const companionsCount = parseInt(companions) || 0;

    // Save to database
    const guest = await prisma.guest.create({
      data: {
        name,
        phone,
        companions: companionsCount,
        entryNumber,
        messageSent: false
      }
    });

    return NextResponse.json({ success: true, guest, entryNumber }, { status: 200 });

  } catch (error) {
    console.error("RSVP Error:", error);
    // Handle unique constraint if entry number collides
    if (error.code === 'P2002') {
       return NextResponse.json({ error: "Entry number collision, please try again." }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
