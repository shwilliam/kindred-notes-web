import {PrismaClient} from '@prisma/client'
import nc from 'next-connect'
import {cacheMiddleware} from '../../../lib'

const handler = nc()

handler.get(cacheMiddleware(120), async (req, res) => {
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
})

export default handler
