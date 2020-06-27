import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

export default async (req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id: userId} = validateHeaderToken(req.headers)
    if (!userId) throw new Error({message: 'Authentication failed'})

    const {id} = req.body // FIXME: use url

    let updatedUser
    switch (req.method) {
      case 'POST':
        updatedUser = await Prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            bookmarks: {
              connect: {id: Number(id)},
            },
          },
        })
        break
      case 'DELETE':
        updatedUser = await Prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            bookmarks: {
              disconnect: {id: Number(id)},
            },
          },
        })
        break
      default:
        break
    }

    res.status(204) // no return
    res.json({user: updatedUser})
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
