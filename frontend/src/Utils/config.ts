import packageJson from '../../package.json'

export const environment = process.env.REACT_APP_MODE
export const secretKey = process.env.REACT_APP_SECRET_KEY ?? 'unaChiaveSegreta'
export const authorization =
  process.env.REACT_APP_AUTHORIZATION ?? 'authorization'
export const clientId = process.env.REACT_APP_CLIENT_ID
export const randomBg = 'url(https://source.unsplash.com/random?wallpapers)'
export const mainColor = '#42047E'
export const secondaryColor = '#07F49E'
export const Version = packageJson.version
