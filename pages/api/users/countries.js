import {PrismaClient} from '@prisma/client'

const handleGetCountriesCount = async ({res}) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    // TODO: refactor w/ raw db query
    const users = await Prisma.user.findMany()
    const uniqueCountries = users.reduce((uniqueCountries, country) => {
      if (uniqueCountries.includes(country)) return uniqueCountries
      return [...uniqueCountries, country]
    }, [])
    res.json({countries: uniqueCountries.length})
  } catch (error) {
    res.status(500).json({error})
  } finally {
    await Prisma.disconnect()
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetCountriesCount({res})
      break
    default:
      res.status(405).end()
      break
  }
}
