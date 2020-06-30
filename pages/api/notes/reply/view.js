import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../../lib'

const handlePostViewReplies = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id: userId} = validateHeaderToken(req.headers)
    if (!userId) throw new Error('Authentication failed')

    const {id} = req.body

    const note = await Prisma.note.findOne({
      where: {id: Number(id)},
    })

    if (note.authorId !== userId) {
      res.json({note})
      return
    }

    const updatedReplies = await Prisma.reply.updateMany({
      where: {
        noteId: Number(id),
      },
      data: {
        viewed: true,
      },
    })

    res.json({replies: updatedReplies})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await handlePostViewReplies({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
