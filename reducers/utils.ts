const deepCompare = (fst, snd) => {
  const keys = Object.keys(fst)
  if (keys.length !== Object.keys(snd).length) {
    return false
  }
  return keys.reduce((res, key) => res && fst[key] === snd[key], true)
}

// eslint-disable-next-line import/prefer-default-export
export const addToRecents = (recents = [], item, max: number) => {
  if (recents.filter((recent) => deepCompare(recent, item)).length > 0) {
    return recents
  }
  const newRecents = [item, ...recents]
  while (newRecents.length > max) {
    newRecents.pop()
  }
  return newRecents
}
