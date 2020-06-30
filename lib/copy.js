const CONTENT_KEYS = ['terms_and_conditions']

const parseCopy = str =>
  str.split(/\[\[/).reduce(
    (copyObj, line) =>
      line.trim().length > 0
        ? {
            ...copyObj,
            [line.split(/\]\]/)[0]]: line.split(/\]\]/)[1],
          }
        : copyObj,
    {},
  )

export const getGoogleDocCopy = async () => {
  const docURL = `https://docs.google.com/document/d/${process.env.GOOGLE_DOCS_COPY_ID}/export?format=txt`
  const docResponse = await fetch(docURL)
  const contentRaw = await docResponse.text()
  const content = parseCopy(contentRaw)

  if (!CONTENT_KEYS.every(key => !!content[key]))
    throw new Error('Missing copy')

  return content
}
