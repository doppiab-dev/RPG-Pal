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
