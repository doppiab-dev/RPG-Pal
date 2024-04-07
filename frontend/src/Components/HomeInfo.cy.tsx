import { getViewport } from '../Cypress/utils'
import TestContainer from '../Cypress/TestContainer'
import HomeInfo from './HomeInfo'
import en from '../Translations/en'
import packageJson from '../../package.json'

describe('<HomeInfo />', () => {
  const { height, width }: { height: number, width: number } = getViewport()

  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <TestContainer>
        <HomeInfo handleLogOut={() => { }} />
      </TestContainer>
    )
  })

  it('renders', () => {
    cy.get("[data-testid='home-info-component']").should('exist').and('be.visible')
  })

  it('has logout button', () => {
    cy.get("[data-testid='logout-button']").should('exist').and('be.visible').and('have.css', 'cursor', 'pointer')
  })

  it('displays logout text', () => {
    cy.get("[data-testid='logout-button']").should('contain', en.home.logout)
  })

  it('has info icon', () => {
    cy.get("[data-testid='InfoOutlinedIcon']").should('exist').and('be.visible').and('have.css', 'cursor', 'pointer')
  })

  it('has tooltip with version information', () => {
    cy.get("[data-testid='InfoOutlinedIcon']").trigger('mouseover')
    cy.contains(en.home.version).should('exist')
    cy.contains(en.home.version).should('contain', packageJson.version)
  })
})
