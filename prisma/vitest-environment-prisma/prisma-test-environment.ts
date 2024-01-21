import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
import { prisma } from '../../src/libs/prisma'
import fs from 'node:fs/promises'

function generateDatabaseURL(file: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable.')
    }

    const databaseUrl = process.env.DATABASE_URL.slice(0, 7)

    return databaseUrl.concat(file).concat('.db').toString()
}

export default <Environment> {
    name: 'prisma',
    async setup() {
        const file = randomUUID()
        const databaseUrl = generateDatabaseURL(file)
        const fileUrl = databaseUrl.slice(7)

        process.env.DATABASE_URL = databaseUrl

        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$disconnect()
            },
        }
    }
}