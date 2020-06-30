import cities from 'cities.json'

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      res.json({cities})
      break
    default:
      res.status(405).end()
      break
  }
}
