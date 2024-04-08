export const decodeToken = (bearerToken: string): string => {
  const userId = bearerToken.split('Bearer ')[1]

  return userId
}

export const verifyMissingToken = (token: string | undefined): string => {
  if (token === undefined || token === '') throw new Error('token is missing in headers')

  return token
}
