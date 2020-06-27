import {PrismaClient} from '@prisma/client'

export default async (req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {search: query} = req.query

    const notes = await Prisma.note.findMany({
      include: {
        tags: true,
      },
      where: {
        OR: [
          {
            tags: {
              some: {
                title: {
                  contains: query,
                },
              },
            },
          },
          {
            content: {
              contains: query,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json({notes})
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
