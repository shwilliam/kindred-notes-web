import {PrismaClient} from '@prisma/client'

export default async (_req, res) => {
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
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
