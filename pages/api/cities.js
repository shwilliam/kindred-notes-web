import cities from 'cities.json'
import nc from 'next-connect'
import {cacheMiddleware} from '../../lib'

const handler = nc()

handler.get(cacheMiddleware(600), async (_req, res) => {
  res.json({cities})
})

export default handler
