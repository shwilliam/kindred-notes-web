import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

export default async (req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {id: userId} = validateHeaderToken(req.headers)
    if (!userId) throw new Error({message: 'Authentication failed'})

    const {id} = req.body

    let note
    let updatedNote
    switch (req.method) {
      case 'POST':
        note = await Prisma.note.findOne({where: {id: Number(id)}})

        if (note.authorId === userId) return

        updatedNote = await Prisma.note.update({
          where: {
            id: Number(id),
          },
          data: {
            viewers: {
              connect: {id: Number(userId)},
            },
          },
        })
        break
      default:
        break
    }

    res.status(204) // no return
    res.json({note: updatedNote})
  } catch (error) {
    res.status(500)
    res.json(error)
  } finally {
    await Prisma.disconnect()
  }
}
