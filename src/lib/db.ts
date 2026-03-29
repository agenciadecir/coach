import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use inline database URL for Supabase (overrides environment variable issues)
const databaseUrl = process.env.DATABASE_URL?.startsWith('postgresql')
  ? process.env.DATABASE_URL
  : 'postgresql://postgres.bgtqnwneuxbjhaqtlnsj:GymCoach2026-@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true'

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    datasourceUrl: databaseUrl,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
