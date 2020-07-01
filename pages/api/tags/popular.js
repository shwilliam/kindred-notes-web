import {PrismaClient} from '@prisma/client'

const handleGetPopularTags = async ({res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const tags = await Prisma.tag.findMany({
      include: {
        notes: true,
      },
    })
    const tagsByPopularity = tags.sort(
      (tagA, tagB) => tagB?.notes.length - tagA?.notes.length,
    )

    res.json({tags: tagsByPopularity.slice(0, 10)})
  } catch (error) {
    console.log({error})
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetPopularTags({res})
      break
    default:
      res.status(405).end()
      break
  }
}
