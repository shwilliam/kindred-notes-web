import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

const handlePostNewBookmark = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id: userId} = validateHeaderToken(req.headers)
    if (!userId) throw new Error('Authentication failed')

    const {id} = req.body // FIXME: use url

    const updatedUser = await Prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        bookmarks: {
          connect: {id: Number(id)},
        },
      },
    })

    res.json({user: updatedUser})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

const handleDeleteBookmark = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id: userId} = validateHeaderToken(req.headers)
    if (!userId) throw new Error('Authentication failed')

    const {id} = req.body // FIXME: use url

    const updatedUser = await Prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        bookmarks: {
          disconnect: {id: Number(id)},
        },
      },
    })

    res.json({user: updatedUser})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await handlePostNewBookmark({req, res})
      break
    case 'DELETE':
      await handleDeleteBookmark({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
