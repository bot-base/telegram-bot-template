export function chunk<T>(array: T[], size: number) {
  const result = []
  for (let index = 0; index < array.length; index += size)
    result.push(array.slice(index, index + size))

  return result
}
