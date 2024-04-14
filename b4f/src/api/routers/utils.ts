export const verifyMissingToken = (token: string | undefined): string => {
  if (token === undefined || token === '') throw new Error('token is missing in headers')

  return token
}

interface Tokens {
  userId: string
}

export const validateToken = (bearerToken: string): Tokens => {
  const userId = decodeToken(bearerToken)

  return { userId }
}

const decodeToken = (bearerToken: string): string => {
  const token = bearerToken.split('Bearer ')[1]

  return token
}
