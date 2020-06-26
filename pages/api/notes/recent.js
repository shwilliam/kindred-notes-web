import {PrismaClient} from '@prisma/client'

export default async (_req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const notes = await Prisma.note.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    })

    res.json({notes})
  } catch (error) {
    res.status(500)
    res.json({error: 'Error fetching notes'})
  } finally {
    await Prisma.disconnect()
  }
}
