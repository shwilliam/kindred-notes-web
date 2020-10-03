import {PrismaClient} from '@prisma/client'
import nc from 'next-connect'
import {cacheMiddleware} from '../../../lib'

const handler = nc()

handler.get(cacheMiddleware(30 * 60), async (_req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    // FIXME
    const tags = await Prisma.tag.findMany({
      include: {
        notes: true,
      },
    })
    const tagsByPopularity = tags.sort(
      (tagA, tagB) => tagB?.notes.length - tagA?.notes.length,
    )

    res.json({tags: tagsByPopularity.slice(0, 10)})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
})

export default handler
