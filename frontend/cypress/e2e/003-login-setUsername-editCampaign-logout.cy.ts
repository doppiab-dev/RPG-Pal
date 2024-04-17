import { checkIfWeAreInLoginComponent, checkIfWeAreInSetUsernameComponent, checkInvalidCampaign, createCampaign, deleteCampaign, deleteUserAndLogout, editCampaign, goToCampaign, loginBeforeEach, openCampaign, selectAValidUsername } from "./utils"

describe('login-setUsername-createcampaign-logout', function () {
  loginBeforeEach()
  it("validate actions", () => {
    checkIfWeAreInSetUsernameComponent()
    selectAValidUsername()
    goToCampaign()
    openCampaign()
    checkInvalidCampaign()
    createCampaign()
    editCampaign()
    deleteCampaign()
    deleteUserAndLogout()
    checkIfWeAreInLoginComponent()
  })
})
