import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

const handleGetOutbox = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})
  try {
    const {id} = validateHeaderToken(req.headers)

    if (!id) {
      res.status(500).json('Error fetching notes')
      return
    }

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
        viewers: true,
      },
    })

    res.json({notes})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetOutbox({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
