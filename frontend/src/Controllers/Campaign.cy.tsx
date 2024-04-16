import { getViewport, hexToRgb, theme } from '../Cypress/utils'
import TestContainer from '../Cypress/TestContainer'
import Campaign from './Campaign'
import en from '../Translations/en'

describe('<Campaign />', () => {
  const { height, width }: { height: number, width: number } = getViewport()

  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <TestContainer>
        <Campaign />
      </TestContainer>
    )
  })

  it('renders', () => {
    cy.get("[data-testid='campaign-component']").should('exist').and('be.visible')
  })

  it('displays correct button text', () => {
    cy.get("[data-testid='campaign-list-create-text']").should('contain', en.campaign.new)
    cy.get("[data-testid='campaign-list-home-title']").should('contain', en.campaign.home)
    cy.get("[data-testid='campaign-list-logout-text']").should('contain', en.campaign.logout)
  })

  it('has correct button styles', () => {
    cy.get("[data-testid='campaign-list-create']").should('exist').and('be.visible')
    cy.get("[data-testid='campaign-list-home']").should('exist').and('be.visible')
    cy.get("[data-testid='campaign-list-logout']").should('exist').and('be.visible')
  })

  it('has correct CSS styles', () => {
    cy.get("[data-testid='campaign-component']").should('have.css', 'display', 'flex')
      .and('have.css', 'align-items', 'flex-start')
      .and('have.css', 'flex-direction', 'column')
      .and('have.css', 'width', '250px')
      .and('have.css', 'color', hexToRgb(theme.palette.primary.main))
      .and('have.css', 'background-color', hexToRgb(theme.palette.background.paper))
    cy.get("[data-testid='campaign-list']").should('have.css', 'width', '250px')
      .and('have.css', 'height', '884px')
    cy.get("[data-testid='campaign-list-title']").should('have.css', 'font-size', '14px')
      .and('have.css', 'letter-spacing', '0')
    cy.get("[data-testid='campaign-list-create']").should('have.css', 'width', '250px')
      .and('have.css', 'justify-content', 'space-between')
    cy.get("[data-testid='campaign-list-home']").should('have.css', 'width', '250px')
      .and('have.css', 'justify-content', 'space-between')
    cy.get("[data-testid='campaign-list-logout']").should('have.css', 'width', '250px')
      .and('have.css', 'justify-content', 'space-between')
  })

  it('displays correct icons', () => {
    cy.get("[data-testid='campaign-list-title-icon']").should('exist')
    cy.get("[data-testid='campaign-list-create'] svg").should('exist')
    cy.get("[data-testid='campaign-list-home'] svg").should('exist')
    cy.get("[data-testid='campaign-list-logout'] svg").should('exist')
  })
})
