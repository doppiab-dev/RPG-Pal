import { checkIfThereIsError, checkIfWeAreInHomeComponent, checkIfWeAreInLoginComponent, checkIfWeAreInSetUsernameComponent, loginBeforeEach, logout, selectAValidUsername, selectAnInvalidUsername } from "./utils"

describe('login-setUsername-logout', function () {
  loginBeforeEach()
  it("validate actions", () => {
    checkIfWeAreInSetUsernameComponent()
    selectAnInvalidUsername()
    checkIfThereIsError()
    selectAValidUsername()
    checkIfWeAreInHomeComponent()
    logout()
    checkIfWeAreInLoginComponent()
  })
})
