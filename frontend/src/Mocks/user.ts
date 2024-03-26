import { type AxiosResponse } from 'axios'
import mock from '.'

export const userInfoMock = async (_token: string): Promise<AxiosResponse<UserInfoDTO>> => {
  await new Promise(resolve => setTimeout(resolve, 500))

  const mockResponse: AxiosResponse<UserInfoDTO> = {
    ...mock,
    data: {
      username: null,
      player: { characters: 0 },
      master: { campaigns: 2 }
    }
  }

  return {
    ...mockResponse
  }
}

export const usernameIsValidMock = async (_token: string, username: string): Promise<AxiosResponse<boolean>> => {
  await new Promise(resolve => setTimeout(resolve, 500))

  const data = username.toLocaleLowerCase() !== 'pippo'
  const mockResponse: AxiosResponse<boolean> = {
    ...mock,
    data
  }

  return {
    ...mockResponse
  }
}

export const updateUsernameMock = async (_token: string, username: string): Promise<AxiosResponse<UsernameDTO>> => {
  await new Promise(resolve => setTimeout(resolve, 500))

  const mockResponse: AxiosResponse<UsernameDTO> = {
    ...mock,
    data: {
      username
    }
  }

  return {
    ...mockResponse
  }
}
