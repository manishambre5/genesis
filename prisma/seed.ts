import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const userId = "yhF1a7ryM1Ph7e2TEkKhQ6I4IbMMGZr8";

    //Create dummy book records...
    await prisma.shelf.createMany({
        data: Array.from({ length: 25 }).map((_, i) => ({
            bookID: `${i + 1}`,
            userID: userId,
            title: `Book ${i + 1}`,
            author: `Author ${Math.floor(i / 5) + 1}`,
            isbn: `978-0-${String(Math.floor(i / 3) + 1).padStart(3, '0')}-${String(i + 1).padStart(4, '0')}-${Math.floor(Math.random() * 10)}`,
            publisher: ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Hachette', 'Macmillan'][i % 5],
            publicationYear: 2000 + (i % 24),
            genre: ['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Biography'][i % 5],
            totalCopies: Math.floor(Math.random() * 10) + 1,
            availableCopies: Math.floor(Math.random() * 10) + 1,
            location: `Shelf ${String.fromCharCode(65 + (i % 5))}-${Math.floor(i / 5) + 1}`,
            status: 'available',
            dateAdded: new Date(),
        })),
    });

    console.log("Seed data created. 25 books added to the shelf.");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});