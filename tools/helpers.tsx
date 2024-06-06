import { capitalizeEach } from '@/tools/utils'

export function setPokeName(str: string) {
  return capitalizeEach(str.replace(/-/g, ' ').replace('special ', 'S. '))
}

export function callApi(path: string) {
  const apiUrl = process.env.NEXT_API_URL

  if (!apiUrl) {
    throw new Error('Did you forget include API url in the env?')
  }

  return apiUrl + path
}
