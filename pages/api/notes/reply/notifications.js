import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../../lib'

const handleGetUnreadReplies = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id: userId} = validateHeaderToken(req.headers)
    if (!userId) throw new Error('Authentication failed')

    const unreadReplies = await Prisma.reply.findMany({
      where: {
        AND: [
          {
            viewed: {
              equals: false,
            },
          },
          {
            note: {
              authorId: {
                equals: userId,
              },
            },
          },
        ],
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json({replies: unreadReplies})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetUnreadReplies({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
