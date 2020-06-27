import {PrismaClient} from '@prisma/client'

export default async (_req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const notes = await Prisma.note.count()

    res.json({notes})
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
