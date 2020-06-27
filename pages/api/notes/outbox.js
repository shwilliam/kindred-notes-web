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
    const user = await Prisma.user.findOne({where: {id}})

    const notes = await Prisma.note.findMany({
      where: {
        tags: {
          in: user.interests,
        },
        authorId: {
          equals: id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        replies: true,
      },
      // take: 20,
    })

    res.json({notes})
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
