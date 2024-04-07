import { useCallback } from 'react'
import { debounce } from 'lodash'

interface UseDebouncerValidation {
  handleTextChange: (value: string) => Promise<void>
}

const useDebouncerValidation = (
  token: string,
  validateFunction: (token: string, username: string) => Promise<boolean>,
  setErrorMessage: () => void
): UseDebouncerValidation => {
  const debouncedValidateUsername = debounce(async (value: string) => {
    const isValid = await validateFunction(token, value.trim())
    if (!isValid) {
      setErrorMessage()
    }
  }, 300)

  const handleTextChange = useCallback(async (value: string): Promise<void> => {
    await debouncedValidateUsername(value)
  }, [debouncedValidateUsername])

  return { handleTextChange }
}

export default useDebouncerValidation
