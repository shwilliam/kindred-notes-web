import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

const handleGetProfile = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id} = validateHeaderToken(req.headers)
    const user = await Prisma.user.findOne({
      where: {id: Number(id)},
      include: {interests: true, bookmarks: true},
    })

    if (user) {
      res.json({user})
    } else {
      res.status(404).json({error: {message: 'User not found'}})
    }
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetProfile({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
