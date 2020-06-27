import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'

const {JWT_SECRET} = getConfig().serverRuntimeConfig

const isValidPassword = (hashedPassword, password) =>
  bcrypt.compareSync(password, hashedPassword)

export default async (req, res) => {
  const Prisma = new PrismaClient({log: ['query']})

  try {
    const {email, password} = req.body

    const user = await Prisma.user.findOne({
      where: {
        email,
      },
    })

    if (isValidPassword(user.password, password)) {
      const token = jwt.sign(
        {email: user.email, id: user.id, time: new Date()},
        JWT_SECRET,
        {
          expiresIn: '6h',
        },
      )

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          maxAge: 6 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        }),
      )
    }

    res.json({user})
  } catch (error) {
    res.status(500)
    res.json({error})
  } finally {
    await Prisma.disconnect()
  }
}
