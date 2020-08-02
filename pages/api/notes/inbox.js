import {PrismaClient} from '@prisma/client'
import nc from 'next-connect'
import {validateHeaderToken, cacheMiddleware} from '../../../lib'

const handler = nc()

handler.get(cacheMiddleware(60), async (req, res) => {
  const Prisma = new PrismaClient({log: ['query']})
  const {id} = validateHeaderToken(req.headers)

  try {
    if (!id) throw new Error('Error authenticating user')

    const user = await Prisma.user.findOne({
      where: {
        id,
      },
      include: {
        interests: true,
      },
    })

    if (!user) throw new Error('User not found')

    const notes = user.interests?.length
      ? await Prisma.note.findMany({
          where: {
            AND: [
              {
                authorId: {
                  not: id,
                },
              },
              {
                tags: {
                  some: {
                    title: {
                      in: user.interests.map(({title}) => title),
                    },
                  },
                },
              },
            ],
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            viewers: true,
            author: true,
          },
          // take: 20,
        })
      : []

    res.json({notes})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
})

export default handler
