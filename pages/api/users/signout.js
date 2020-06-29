import {clearHeaderToken} from '../../../lib'

const handlePostSignOut = ({res}) => {
  try {
    clearHeaderToken(res)
    res.json({user: null})
  } catch (error) {
    res.status(500).json({error})
  }
}

export default (req, res) => {
  switch (req.method) {
    case 'POST':
      handlePostSignOut({res})
      break
    default:
      res.status(405).end()
      break
  }
}
