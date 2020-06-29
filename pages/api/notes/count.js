import {PrismaClient} from '@prisma/client'

const handleGetNotesCount = async ({res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const notes = await Prisma.note.count()

    res.json({notes})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetNotesCount({res})
      break
    default:
      res.status(405).end()
      break
  }
}
