import {PrismaClient} from '@prisma/client'

export default async (_req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    // TODO: refactor w/ raw db query
    const notes = await Prisma.note.findMany({include: {viewers: true}})
    const viewers = notes.reduce(
      (viewers, note) => [...viewers, ...note.viewers],
      [],
    )
    res.json({connections: viewers.length})
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
