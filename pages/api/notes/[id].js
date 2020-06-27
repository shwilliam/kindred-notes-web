import {PrismaClient} from '@prisma/client'

export default async (req, res) => {
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
      res.status(404)
      res.json({error: {message: 'Note not found'}})
    }
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
