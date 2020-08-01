import {PrismaClient} from '@prisma/client'
import nc from 'next-connect'
import {cacheContent} from '../utils'

const handler = nc()

handler.get(cacheContent(120), async (_req, res) => {
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
