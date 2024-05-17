/// <reference types="cypress" />
export const checkIfWeAreInSetUsernameComponent = () => {
  cy.get("[data-testid='set-username-component']").should('exist').and('be.visible')
}

export const loginBeforeEach = () => {
  const cy_ext = cy as any
  beforeEach(() => {
    cy_ext.loginByGoogleApi().wait(500)
    setViewportAndStart()
  })
}

export const login = () => {
  const cy_ext = cy as any
  cy_ext.loginByGoogleApi().wait(500)
  setViewportAndStart()
}

export const setViewportAndStart = () => {
  cy.viewport(1440, 900).wait(500)
  cy.visit("http://localhost:3000")
}

const invalidUsername = 'Pippo'
const validUsername = 'test'
const invalidCampaign = '<>'
const validcampaign = 'test'

export const selectAnInvalidUsername = () => {
  cy.get("[data-testid='username-text']").should('exist').and('be.visible').type(invalidUsername).wait(100)
  cy.get('button[type="submit"]').click().wait(500)
}

export const checkIfThereIsError = () => {
  cy.get("[data-testid='error-helpertext-1']").should('exist').and('be.visible')
}

export const selectAValidUsername = () => {
  cy.get("[data-testid='clear-username']").should('exist').and('be.visible').click().wait(200)
  cy.get("[data-testid='username-text']").should('exist').and('be.visible').type(validUsername).wait(100)
  cy.get('button[type="submit"]').click().wait(200)
}

export const checkIfWeAreInHomeComponent = () => {
  cy.get("[data-testid='home-component']").should('exist').and('be.visible')
}

export const logout = () => {
  cy.get("[data-testid='logout-button']").should('exist').and('be.visible').click().wait(200)
}

export const checkIfWeAreInLoginComponent = () => {
  cy.get("[data-testid='login-component']").should('exist').and('be.visible')
}

export const goToCampaign = () => {
  cy.get("[data-testid='browse-campaigns']").should('exist').and('be.visible').click().wait(200)
}

export const deleteUserAndLogout = () => {
  cy.get("[data-testid='campaign-list-user']").should('exist').and('be.visible').click().wait(200)
  cy.get("[data-testid='delete-user-button']").should('exist').and('be.visible').click().wait(200)
  cy.get("[data-testid='confirmationDialog-confirm']").should('exist').and('be.visible').click().wait(400)
}

export const openCampaign = () => {
  cy.get("[data-testid='campaign-list-create']").should('exist').and('be.visible').click().wait(200)
  cy.get('button[type="submit"]').click().wait(500)
}

export const checkInvalidCampaign = () => {
  cy.get("[data-testid='first-text']").should('exist').and('be.visible').click().wait(200).type(invalidCampaign).wait(100)
  cy.get('.MuiFormHelperText-root').should('exist')
}
export const createCampaign = () => {
  cy.get("[data-testid='first-text']")
    .type('{selectall}', { delay: 50 })
    .type('{backspace}', { delay: 50 })
    .type('{backspace}', { delay: 50 })
    .wait(200).click().wait(200).type(validcampaign).wait(100)
  cy.get('button[type="submit"]').click().wait(500)
}

export const editCampaign = () => {
  cy.get("[data-testid='edit-campaign-button']").should('exist').and('be.visible').click().wait(200)
  cy.get("[data-testid='first-text']").should('exist').and('be.visible').click().wait(200).type('a').wait(100)
  cy.get('button[type="submit"]').click().wait(500)
}

export const deleteCampaign = () => {
  cy.get("[data-testid='delete-campaign-button']").should('exist').and('be.visible').click().wait(200)
  cy.get("[data-testid='confirmationDialog-confirm']").should('exist').and('be.visible').click().wait(200)
}
export const description = 'description'
export const plot = 'plot'
export const name = 'name'
export const newName = 'newName'
export const date = '22'

export const checkUnlinkedLocationDescription = () => {
  cy.get('[data-testid="chunked-poi-description-continent-text"]').should('contain', description)
}
export const changeDescriptionAndUnlinkPoi = () => {
  cy.get('[data-testid="add-poi-description-continent-button"]').click().wait(200)
  cy.get('[data-testid="add-edit-poi-description-italic"]').click().wait(200)
  cy.get('[data-testid="add-edit-poi-description-underlined"]').click().wait(200)
  cy.get('[data-testid="poi-description-text"]').type(description).wait(100)
  cy.get('[data-testid="thumbnail-text"]').type(description).wait(100)
  cy.get('[data-testid="second-select"]').click().wait(200)
  cy.get('[data-testid="option-second-default"]').click().wait(200)
  cy.get('[type="submit"]').click().wait(200)
}
export const addLinkedLocation = () => {
  cy.get('[data-testid="add-poi-continent-button"]').click().wait(200)
  cy.get('[data-testid="first-text"]').type(name).wait(200)
  cy.get('[type="submit"]').click().wait(200)
}
export const checkLocationDescription = () => {
  cy.get('[data-testid="chunked-poi-description-world-text"]').should('contain', description)
}
export const addDescriptionToLocation = () => {
  cy.get('[data-testid="add-poi-description-world-button"]').click().wait(200)
  cy.get('[data-testid="textArea-dialog"]').type(description).wait(100)
  cy.get('[data-testid="thumbnail-text"]').type(description).wait(100)
  cy.get('[data-testid="add-edit-poi-description-bold"]').click().wait(200)
  cy.get('[type="submit"]').click().wait(200)
}
export const checkLocationNameChanged = () => {
  cy.get('.MuiListItemButton-root > .MuiBox-root').should('contain', newName)
}
export const changeLocationName = () => {
  cy.get('[data-testid="edit-poi-name-button"]').click().wait(200)
  cy.get('[data-testid="first-text"]')
    .type('{selectall}', { delay: 50 })
    .type('{backspace}', { delay: 50 })
    .type('{backspace}', { delay: 50 })
  cy.get('[data-testid="first-text"]').type(newName).wait(200)
  cy.get('[type="submit"]').click().wait(200)
}
export const checkLocationCreated = () => {
  cy.get('.MuiListItemButton-root > .MuiBox-root').should('contain', name)
}
export const addLocationUnlinked = () => {
  cy.get("[data-testid='points']").should('exist').and('be.visible').click().wait(200)
  cy.get('[data-testid="add-location-button"]').click().wait(200)
  cy.get('[data-testid="first-text"]').type(name).wait(200)
  cy.get('[data-testid="second-select"]').click().wait(200)
  cy.get('[data-testid="option-second-world"]').click().wait(200)
  cy.get('[type="submit"]').click().wait(200)
}
export const checkPlot = () => {
  cy.get('[data-testid="chunked-plot-text"]').should('contain', plot)
}
export const addPlot = () => {
  cy.get("[data-testid='notes']").should('exist').and('be.visible').click().wait(200)
  cy.get('[data-testid="add-plot-button"]').click().wait(200)
  cy.get('.MuiInputBase-root').type(plot).wait(100)
  cy.get('[data-testid="add-edit-plot-subtitle"]').click().wait(200)
  cy.get('[type="submit"]').click().wait(200)
}
export const checkDescription = () => {
  cy.get('[data-testid="chunked-description-text"]').should('contain', description)
}
export const addDescription = () => {
  cy.get('[data-testid="campaign-item"]').click().wait(200)
  cy.get('[data-testid="add-description-button"]').click().wait(200)
  cy.get('.MuiInputBase-root').type(description).wait(100)
  cy.get('[data-testid="add-edit-description-title"]').click().wait(200)
  cy.get('[type="submit"]').click().wait(200)
}
export const addTimeline = () => {
  cy.get('[data-testid="campaign-item"]').click().wait(200)
  cy.get("[data-testid='events']").should('exist').and('be.visible').click().wait(200)
  cy.get('[data-testid="add-timeline-event"]').click().wait(200)
  cy.get('[data-testid="first-text"]').type(name).wait(200)
  cy.get('[data-testid="date-text"]').type(date).wait(200)
  cy.get('[type="submit"]').click().wait(200)
}
export const checkTimeline = () => {
  cy.get('[data-testid="event-name"]').should('contain', name)
  cy.get('[data-testid="event-date"]').should('contain', date)
}
