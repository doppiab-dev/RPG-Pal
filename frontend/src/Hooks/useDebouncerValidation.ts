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
  /**
   * Disabling react-hooks/exhaustive-deps because of this eslint error:
   * React Hook useCallback received a function whose dependencies are unknown. Pass an inline function instead.
   * We can't pass debounce inline, because it's coming from lodash, more info at ->
   * https://stackoverflow.com/questions/69830440/react-hook-usecallback-received-a-function-whose-dependencies-are-unknown-pass
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedValidateUsername = useCallback(debounce(async (value: string) => {
    if (username !== '' && value.toLocaleLowerCase() === username.toLocaleLowerCase()) {
      setErrorMessage("It's already your username")
    } else {
      const isValid = await validateFunction(token, value.trim())
      if (!isValid) {
        setErrorMessage()
      }
    }
  }, 500), [token, validateFunction, setErrorMessage, username])

  const handleTextChange = useCallback(async (value: string): Promise<void> => {
    await debouncedValidateUsername(value)
  }, [debouncedValidateUsername])

  return { handleTextChange }
}

export default useDebouncerValidation
