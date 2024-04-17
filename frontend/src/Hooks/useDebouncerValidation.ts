import { useCallback } from 'react'
import { debounce } from 'lodash'

interface UseDebouncerValidation {
  handleTextChange: (value: string) => Promise<void>
}

const useDebouncerValidation = (
  token: string,
  validateFunction: (token: string, username: string) => Promise<boolean>,
  setErrorMessage: (msg?: string) => void,
  username: string
): UseDebouncerValidation => {
  const debouncedValidateUsername = debounce(async (value: string) => {
    if (username !== '' && value.toLocaleLowerCase() === username.toLocaleLowerCase()) {
      setErrorMessage("It's already your username")
    } else {
      const isValid = await validateFunction(token, value.trim())
      if (!isValid) {
        setErrorMessage()
      }
    }
  }, 300)

  const handleTextChange = useCallback(async (value: string): Promise<void> => {
    await debouncedValidateUsername(value)
  }, [debouncedValidateUsername])

  return { handleTextChange }
}

export default useDebouncerValidation
