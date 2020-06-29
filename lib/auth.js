import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'

const {JWT_SECRET} = getConfig().serverRuntimeConfig

export const validateHeaderToken = headers => {
  try {
    const {token} = cookie.parse(headers?.cookie || '')
    if (!token) return null

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
}

export const protectRoute = ({req, res}) => {
  const token = validateHeaderToken(req.headers)
  if (!token)
    res
      .writeHead(301, {
        Location: '/signin',
      })
      .end()
}

export const emailExistsRequest = async data => {
  const response = await fetch(`/api/users/email?query=${data.email}`)
  const responseJson = response.ok && (await response.json())

  return responseJson?.emailExists
}

export const signUpRequest = async data => {
  const response = await fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.ok && (await response.json())
}

export const signOutRequest = async () => {
  const response = await fetch('/api/users/signout', {method: 'POST'})
  return response.ok && (await response.json())
}
