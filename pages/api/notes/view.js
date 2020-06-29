import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

const handlePostViewNote = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id: userId} = validateHeaderToken(req.headers)
    if (!userId) throw new Error('Authentication failed')

    const {id} = req.body

    const note = await Prisma.note.findOne({where: {id: Number(id)}})

    if (note.authorId === userId) {
      res.json({note})
      return
    }

    const updatedNote = await Prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        viewers: {
          connect: {id: Number(userId)},
        },
      },
    })

    res.json({note: updatedNote})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await handlePostViewNote({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
