import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_SCHEMA } = process.env;

const DATABASE_URL = `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=${DATABASE_SCHEMA}`;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: DATABASE_URL,
        },
    },
});

export default prisma;