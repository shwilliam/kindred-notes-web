import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

export default async (req, res) => {
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
      res.status(404)
      res.json({error: {message: 'User not found'}})
    }
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
