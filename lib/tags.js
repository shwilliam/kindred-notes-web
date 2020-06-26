export const findNewOrExistingTags = (allTags, tags) => {
  const allTagTitles = allTags.map(({title}) => title)
  return tags.reduce(
    ({newTags, existingTags}, tag) => {
      if (allTagTitles.includes(tag))
        return {newTags, existingTags: [...existingTags, tag]}
      else return {existingTags, newTags: [...newTags, tag]}
    },
    {newTags: [], existingTags: []},
  )
}
