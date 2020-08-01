import cities from 'cities.json'
import nc from 'next-connect'

const handler = nc()

handler.get(async (_req, res) => {
  res.json({cities})
})

export default handler
