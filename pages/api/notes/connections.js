import {PrismaClient} from '@prisma/client'

const handleGetConnectionsCount = async ({res}) => {
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
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetConnectionsCount({res})
      break
    default:
      res.status(405).end()
      break
  }
}
