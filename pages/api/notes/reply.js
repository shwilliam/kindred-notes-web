import {PrismaClient} from '@prisma/client'
import {validateHeaderToken} from '../../../lib'

export default async (req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const user = validateHeaderToken(req.headers)
    if (!user) throw new Error({message: 'Authentication failed'})

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

    res.status(201)
    res.json({reply})
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
