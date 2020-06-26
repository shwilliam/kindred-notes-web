import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'

const {JWT_SECRET} = getConfig().serverRuntimeConfig

export const validateHeaderToken = headers => {
  const {token} = cookie.parse(headers?.cookie || '')
  if (!token) return null

  try {
    const {id, email} = jwt.verify(token, JWT_SECRET)
    return {id, email}
  } catch (error) {
    return null
  }
}
export const clearHeaderToken = res => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      maxAge: -1,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  )

  return true
}
