import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import {findNewOrExistingTags} from '../../../lib'

export default async (req, res) => {
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

    res.status(201) // created
    res.json({user})
  } catch (error) {
    res.status(500)
    res.json({error: 'Error creating new user'})
  } finally {
    await Prisma.disconnect()
  }
}
