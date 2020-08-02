import {PrismaClient} from '@prisma/client'
import nc from 'next-connect'
import {cacheMiddleware} from '../../../lib'

const handler = nc()

handler.get(cacheMiddleware(120), async (_req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const notes = await Prisma.note.count()

    res.json({notes})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
})

export default handler
