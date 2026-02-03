import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding users...')

    // Hashing passwords
    const adminPassword = await bcrypt.hash('admin123', 10)
    const userPassword = await bcrypt.hash('user123', 10)

    // 1. Create ADMIN user
    const admin = await prisma.user.upsert({
        where: { email: 'admin@vencitrack.com' },
        update: {
            password: adminPassword, // Force update password
        },
        create: {
            email: 'admin@vencitrack.com',
            name: 'Administrador General',
            password: adminPassword,
            role: 'ADMIN',
            company: 'VenciTrack HQ'
        },
    })
    console.log(`✅ Admin user created/updated: ${admin.email}`)

    // 2. Create REGULAR user
    const user = await prisma.user.upsert({
        where: { email: 'user@vencitrack.com' },
        update: {
            password: userPassword, // Force update password
        },
        create: {
            email: 'user@vencitrack.com',
            name: 'Usuario Demo',
            password: userPassword,
            role: 'USER',
            company: 'Empresa Demo S.A.'
        },
    })
    console.log(`✅ Regular user created/updated: ${user.email}`)

    // 3. Create initial Document Types (Global)
    const docTypes = [
        { name: 'SOAT', category: 'VEHICLE' },
        { name: 'Licencia de Conducir', category: 'PERSON' },
        { name: 'Seguro Vehicular', category: 'VEHICLE' },
        { name: 'Revisión Técnica', category: 'VEHICLE' },
        { name: 'Pasaporte', category: 'PERSON' },
        { name: 'Seguro de Salud', category: 'PERSON' }
    ]

    for (const type of docTypes) {
        await prisma.documentType.upsert({
            where: { name: type.name },
            update: {},
            create: type
        })
    }
    console.log('✅ Global document types created')

    console.log('🚀 Seeding finished successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
