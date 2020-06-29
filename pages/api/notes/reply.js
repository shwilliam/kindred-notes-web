import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

const handlePostReply = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const user = validateHeaderToken(req.headers)
    if (!user) throw new Error('Authentication failed')

    const {content, noteId} = req.body

    const reply = await Prisma.reply.create({
      data: {
        author: {
          connect: {id: Number(user.id)},
        },
        note: {
          connect: {id: Number(noteId)},
        },
        content,
      },
    })

    res.status(201).json({reply})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await handlePostReply({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
