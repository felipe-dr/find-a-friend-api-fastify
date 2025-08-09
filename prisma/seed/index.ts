import { prisma } from '@/shared/libs'

async function seed() {
  await prisma.size.create({
    data: { level: 1, description: 'Small' },
  })
  await prisma.size.create({
    data: { level: 2, description: 'Medium' },
  })
  await prisma.size.create({
    data: { level: 3, description: 'big' },
  })

  await prisma.energyLevel.create({
    data: { level: 1, description: 'Very low' },
  })
  await prisma.energyLevel.create({
    data: { level: 2, description: 'Low' },
  })
  await prisma.energyLevel.create({
    data: { level: 3, description: 'Medium' },
  })
  await prisma.energyLevel.create({
    data: { level: 4, description: 'High' },
  })
  await prisma.energyLevel.create({
    data: { level: 5, description: 'Very high' },
  })

  await prisma.independenceLevel.create({
    data: { level: 1, description: 'Low' },
  })
  await prisma.independenceLevel.create({
    data: { level: 2, description: 'Medium' },
  })
  await prisma.independenceLevel.create({
    data: { level: 3, description: 'High' },
  })

  console.log('Databased seeded.')

  await prisma.$disconnect()
}

seed().catch((error: unknown) => {
  console.error(error)
  prisma.$disconnect()
  process.exit(1)
})
