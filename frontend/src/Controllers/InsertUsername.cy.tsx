/* eslint-disable max-len */
import { getViewport } from '../Cypress/utils'
import TestContainer from '../Cypress/TestContainer'
import InsertUsername from './InsertUsername'
import en from '../Translations/en'

describe('<InsertUsername />', () => {
  const { height, width }: { height: number, width: number } = getViewport()

  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <TestContainer>
        <InsertUsername handleLogOut={() => { }} />
      </TestContainer>
    )
  })

  it('renders', () => {
    cy.get("[data-testid='set-username-component']").should('exist').and('be.visible')
  })

  it('displays title and text', () => {
    cy.get("[data-testid='set-username-title']").should('exist').and('be.visible').and('contain', en.username.title)
    cy.get("[data-testid='set-username-text']").should('exist').and('be.visible').and('contain', en.username.text)
  })

  it('has correct title styles', () => {
    cy.get("[data-testid='set-username-title']").should('exist').and('be.visible').and('have.css', 'font-size', '17.5px')
  })

  it('has correct button styles', () => {
    cy.get("[data-testid='update-username-button']")
      .should('exist').and('be.visible').and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px')
  })

  it('clears username field when clicking clear button', () => {
    cy.get("[data-testid='username-text']").type('Test Username')
    cy.get("[data-testid='clear-username']").click()
    cy.get("[data-testid='username-text']").should('have.value', '')
  })
})
