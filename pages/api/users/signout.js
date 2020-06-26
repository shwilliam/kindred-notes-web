import {clearHeaderToken} from '../../../lib'

export default async (_req, res) => {
  try {
    clearHeaderToken(res)
    res.send({user: null})
  } catch (error) {
    res.status(500)
    res.json({error: 'Error signing out'})
  }
}
