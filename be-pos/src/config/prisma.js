import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Pakai DATABASE_URL yang sama dengan prisma.config.ts (migrate) supaya database-nya konsisten
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

const prisma = new PrismaClient({ adapter });

export default prisma;
