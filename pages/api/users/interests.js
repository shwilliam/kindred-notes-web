import {PrismaClient} from '@prisma/client'
import {findNewOrExistingTags, validateHeaderToken} from '../../../lib'

export default async (req, res) => {
  const Prisma = new PrismaClient({log: ['query']})
  let user

  try {
    const {id} = validateHeaderToken(req.headers)
    const {title} = req.body

    switch (req.method) {
      case 'POST':
        const allTags = await Prisma.tag.findMany()
        const {newTags, existingTags} = findNewOrExistingTags(allTags, [title])

        user = await Prisma.user.update({
          where: {
            id,
          },
          data: {
            interests: {
              create: newTags?.map(topic => ({title: topic})),
              connect: existingTags?.map(topic => ({title: topic})),
            },
          },
        })
        break
      case 'DELETE':
        user = await Prisma.user.update({
          where: {
            id,
          },
          data: {
            interests: {
              delete: {title},
            },
          },
        })
        break
      default:
        break
    }

    res.status(204) // no content
    res.json({user})
  } catch (error) {
    res.status(500)
    res.json({error: 'Error updating user interests'})
  } finally {
    await Prisma.disconnect()
  }
}
