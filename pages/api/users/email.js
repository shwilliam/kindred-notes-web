import {PrismaClient} from '@prisma/client'

const handleGetEmailValidity = async ({req, res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {query} = req.query
    const user = await Prisma.user.findOne({
      where: {
        email: query,
      },
    })
    res.json({emailExists: !!user})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetEmailValidity({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
