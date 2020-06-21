// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
export const generateId = (pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') =>
  pattern.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
