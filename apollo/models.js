import bcrypt from 'bcrypt'
import v4 from 'uuid/v4'

export const createUser = data => {
  const salt = bcrypt.genSaltSync()

  return {
    id: v4(),
    email: data.email,
    hashedPassword: bcrypt.hashSync(data.password, salt),
    interests: data.interests,
    avatar: data.avatar,
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
  }
}

export const createReply = data => {
  return {
    id: v4(),
    content: data.content,
    author: data.author,
    avatar: data.avatar,
  }
}
