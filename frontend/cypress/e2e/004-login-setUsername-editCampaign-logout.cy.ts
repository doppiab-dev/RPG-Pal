import { addDescription, checkDescription, addPlot, checkPlot, addLocationUnlinked, checkLocationCreated, changeLocationName, checkLocationNameChanged, addDescriptionToLocation, checkLocationDescription, addLinkedLocation, changeDescriptionAndUnlinkPoi, checkUnlinkedLocationDescription } from "./utils"
import { checkIfWeAreInLoginComponent, checkIfWeAreInSetUsernameComponent, createCampaign, deleteUserAndLogout, goToCampaign, loginBeforeEach, openCampaign, selectAValidUsername } from "./utils"

describe('login-setUsername-createcampaign-logout', function () {
  loginBeforeEach()
  it("validate actions", () => {
    checkIfWeAreInSetUsernameComponent()
    selectAValidUsername()
    goToCampaign()
    openCampaign()
    createCampaign()
    addDescription()
    checkDescription()
    addPlot()
    checkPlot()
    addLocationUnlinked()
    checkLocationCreated()
    changeLocationName()
    checkLocationNameChanged()
    addDescriptionToLocation()
    checkLocationDescription()
    addLinkedLocation()
    checkLocationCreated()
    changeDescriptionAndUnlinkPoi()
    checkUnlinkedLocationDescription()
    deleteUserAndLogout()
    checkIfWeAreInLoginComponent()
  })
})

