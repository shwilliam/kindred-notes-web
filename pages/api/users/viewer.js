import {validateHeaderToken} from '../../../lib'

export default async (req, res) => {
  const user = validateHeaderToken(req.headers)

  if (user) res.json(user)
  else {
    res.status(401)
    res.json({error: 'Error authenticating user'})
  }
}
