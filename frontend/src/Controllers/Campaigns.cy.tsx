import { getViewport, hexToRgb, theme } from '../Cypress/utils'
import TestContainer from '../Cypress/TestContainer'
import Campaigns from './Campaigns'
import en from '../Translations/en'

describe('<Campaign />', () => {
  const { height, width }: { height: number, width: number } = getViewport()
  const checkCss = (id: string): Cypress.Chainable<JQuery<HTMLElement>> =>
    cy.get(`[data-testid=${id}]`)
      .should('have.css', 'width', '250px')
      .and('have.css', 'justify-content', 'space-between')

  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <TestContainer>
        <Campaigns />
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
    cy.get("[data-testid='campaign-list-user']").should('contain', en.campaign.user)
  })

  it('has correct button styles', () => {
    cy.get("[data-testid='campaign-list-create']").should('exist').and('be.visible')
    cy.get("[data-testid='campaign-list-home']").should('exist').and('be.visible')
    cy.get("[data-testid='campaign-list-logout']").should('exist').and('be.visible')
    cy.get("[data-testid='campaign-list-user']").should('exist').and('be.visible')
  })

  it('has correct CSS styles', () => {
    cy.get("[data-testid='campaign-component']").should('have.css', 'display', 'flex')
      .and('have.css', 'align-items', 'flex-start')
      .and('have.css', 'flex-direction', 'column')
      .and('have.css', 'width', '250px')
      .and('have.css', 'color', hexToRgb(theme.palette.primary.main))
      .and('have.css', 'background-color', hexToRgb(theme.palette.background.paper))
    cy.get("[data-testid='campaign-list']").should('have.css', 'width', '250px').and('have.css', 'height', '884px')
    cy.get("[data-testid='campaign-list-title']").should('have.css', 'font-size', '14px').and('have.css', 'letter-spacing', '0')
    checkCss('campaign-list-create')
    checkCss('campaign-list-home')
    checkCss('campaign-list-logout')
    checkCss('campaign-list-user')
  })

  it('displays correct icons', () => {
    cy.get("[data-testid='campaign-list-title-icon']").should('exist')
    cy.get("[data-testid='campaign-list-create'] svg").should('exist')
    cy.get("[data-testid='campaign-list-home'] svg").should('exist')
    cy.get("[data-testid='campaign-list-logout'] svg").should('exist')
    cy.get("[data-testid='campaign-list-user'] svg").should('exist')
  })
})
