import {PrismaClient} from '@prisma/client'
import nc from 'next-connect'
import {cacheMiddleware} from '../utils'

const handler = nc()

handler.get(cacheMiddleware(30), async (_req, res) => {
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
})

export default handler
