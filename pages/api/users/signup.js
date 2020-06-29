import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import {findNewOrExistingTags} from '../../../lib'

const handlePostSignUp = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {
      email,
      nickname,
      interests,
      avatar,
      country,
      city,
      coords,
      password,
    } = req.body
    const allTags = await Prisma.tag.findMany()
    const {newTags, existingTags} = findNewOrExistingTags(allTags, interests)

    const user = await Prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        nickname,
        interests: {
          create: newTags.map(topic => ({title: topic})),
          connect: existingTags.map(topic => ({title: topic})),
        },
        avatar: Number(avatar),
        country,
        city,
        coords: {
          set: coords,
        },
      },
    })

    res
      .status(201) // created
      .json({user})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await handlePostSignUp({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
