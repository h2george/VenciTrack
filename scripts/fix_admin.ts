import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const user = await prisma.user.update({
            where: { email: 'admin@vencitrack.com' },
            data: { role: 'ADMIN' },
        })
        console.log(`✅ Admin role restored for: ${user.email}`)
    } catch (error) {
        console.error("Error updating user:", error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
