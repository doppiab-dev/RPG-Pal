import { checkIfThereIsError, checkIfWeAreInLoginComponent, checkIfWeAreInSetUsernameComponent, deleteUserAndLogout, goToCampaign, loginBeforeEach, selectAValidUsername, selectAnInvalidUsername } from "./utils"

describe('login-setUsername-logout', function () {
  loginBeforeEach()
  it("validate actions", () => {
    checkIfWeAreInSetUsernameComponent()
    selectAnInvalidUsername()
    checkIfThereIsError()
    selectAValidUsername()
    goToCampaign()
    deleteUserAndLogout()
    checkIfWeAreInLoginComponent()
  })
})
