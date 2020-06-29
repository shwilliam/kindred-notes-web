import {PrismaClient} from '@prisma/client'
import {findNewOrExistingTags, validateHeaderToken} from '../../../lib'

const handlePostInterest = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id} = validateHeaderToken(req.headers)
    const {title} = req.body

    const allTags = await Prisma.tag.findMany()
    const {newTags, existingTags} = findNewOrExistingTags(allTags, [title])

    const user = await Prisma.user.update({
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

    res.json({user})
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}

const handleDeleteInterest = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id} = validateHeaderToken(req.headers)
    const {title} = req.body

    const user = await Prisma.user.update({
      where: {
        id,
      },
      data: {
        interests: {
          delete: {title},
        },
      },
    })

    res.json({user})
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await handlePostInterest({req, res})
      break
    case 'DELETE':
      await handleDeleteInterest({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
