import bcrypt from 'bcrypt'
import v4 from 'uuid/v4'

export function createUser(data) {
  const salt = bcrypt.genSaltSync()
  const interestsArr = data.interests.split(',').map(str => str.toLowerCase())

  return {
    id: v4(),
    email: data.email,
    hashedPassword: bcrypt.hashSync(data.password, salt),
    interests: interestsArr,
  }
}

export function createNote(data) {
  const tags = data.tags.split(',').map(str => str.toLowerCase())

  return {
    id: v4(),
    content: data.content,
    author: data.author,
    tags: tags,
    color: data.color,
    style: data.style,
    font: data.font,
  }
}
