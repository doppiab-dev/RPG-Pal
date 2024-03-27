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

const invalidUsername = 'pippo'
const validUsername = 'test'

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