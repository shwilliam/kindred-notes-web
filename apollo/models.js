import bcrypt from 'bcrypt'
import v4 from 'uuid/v4'

export const createUser = data => {
  const salt = bcrypt.genSaltSync()

  return {
    id: v4(),
    email: data.email,
    nickname: data.nickname,
    hashedPassword: bcrypt.hashSync(data.password, salt),
    interests: data.interests,
    avatar: data.avatar,
    country: data.country,
    city: data.city,
    coords: data.coords,
    createdAt: new Date(),
  }
}

export const createNote = data => {
  return {
    id: v4(),
    content: data.content,
    author: data.author,
    tags: data.tags,
    color: data.color,
    style: data.style,
    font: data.font,
    createdAt: new Date(),
  }
}

export const createReply = data => {
  return {
    id: v4(),
    content: data.content,
    author: data.author,
    avatar: data.avatar,
    nickname: data.nickname,
    coords: data.coords,
    createdAt: new Date(),
  }
}
