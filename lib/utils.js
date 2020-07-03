export const truncate = (maxLength, str) =>
  str.length <= maxLength ? str : `${str.substring(0, maxLength)}...`
