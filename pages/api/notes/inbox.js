import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

export default async (req, res) => {
  const Prisma = new PrismaClient({log: ['query']})
  const {id} = validateHeaderToken(req.headers)

  if (!id) {
    res.status(500)
    res.json({error: 'Error fetching notes'})
    return
  }

  try {
    const notes = await Prisma.note.findMany({
      where: {
        authorId: {
          not: id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        viewers: true,
      },
      // take: 20,
    })

    res.json({notes})
  } catch (error) {
    res.status(500)
    res.json({error: 'Error fetching notes'})
  } finally {
    await Prisma.disconnect()
  }
}
