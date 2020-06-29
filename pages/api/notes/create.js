import {PrismaClient} from '@prisma/client'
import {findNewOrExistingTags, validateHeaderToken} from '../../../lib'

const handlePostNewNote = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const user = validateHeaderToken(req.headers)
    if (!user) throw new Error('Authentication failed')

    const {content, color, style, font, tags} = req.body

    const allTags = await Prisma.tag.findMany()
    const {newTags, existingTags} = findNewOrExistingTags(allTags, tags)

    const note = await Prisma.note.create({
      data: {
        author: {
          connect: {id: Number(user.id)},
        },
        content,
        color,
        style,
        font,
        tags: {
          create: newTags.map(topic => ({title: topic})),
          connect: existingTags.map(topic => ({title: topic})),
        },
      },
    })

    res
      .status(201) // created
      .json({note})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await handlePostNewNote({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
