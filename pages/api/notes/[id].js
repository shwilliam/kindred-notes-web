import {PrismaClient} from '@prisma/client'

const handleGetNoteById = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {
      query: {id},
    } = req

    const note = await Prisma.note.findOne({
      where: {id: Number(id)},
      include: {
        viewers: true,
        replies: {
          select: {
            id: true,
            content: true,
            author: {select: {nickname: true, avatar: true}},
          },
        },
      },
    })

    if (note) {
      res.json({note})
    } else {
      res.status(404).json({error: {message: 'Note not found'}})
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
      await handleGetNoteById({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
