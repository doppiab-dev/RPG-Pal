import { addTimeline, checkIfWeAreInLoginComponent, checkIfWeAreInSetUsernameComponent, checkTimeline, createCampaign, deleteUserAndLogout, goToCampaign, loginBeforeEach, openCampaign, selectAValidUsername } from "./utils"

describe('login-setUsername-createcampaign-logout', function () {
  loginBeforeEach()
  it("validate actions", () => {
    checkIfWeAreInSetUsernameComponent()
    selectAValidUsername()
    goToCampaign()
    openCampaign()
    createCampaign()
    addTimeline()
    checkTimeline()
    deleteUserAndLogout()
    checkIfWeAreInLoginComponent()
  })
})

