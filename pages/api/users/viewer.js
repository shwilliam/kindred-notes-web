import {validateHeaderToken} from '../../../lib'

const handleGetViewer = ({req, res}) => {
  try {
    const token = validateHeaderToken(req.headers)

    if (!token)
      res.status(401).json({error: {message: 'Authentication failed'}})
    else res.json(token)
  } catch (error) {
    res.status(401).json({error})
  }
}

export default (req, res) => {
  switch (req.method) {
    case 'GET':
      handleGetViewer({req, res})
      break
    default:
      res.status(405).end()
      break
  }
}
