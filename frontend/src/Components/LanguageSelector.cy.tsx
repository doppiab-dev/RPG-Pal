import { getViewport } from '../Cypress/utils'
import TestContainer from '../Cypress/TestContainer'
import LanguageSelector from './LanguageSelector'

describe('<LanguageSelector />', () => {
  const { height, width }: { height: number, width: number } = getViewport()

  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <TestContainer>
        <LanguageSelector />
      </TestContainer>
    )
  })

  it('renders', () => {
    cy.get("[data-testid='language-selector']").should('exist').and('be.visible')
  })

  it('has correct styles', () => {
    cy.get("[data-testid='language-selector']").should('have.css', 'justify-content', 'center')

    cy.get("[data-testid='language-paper']").should('exist')
    cy.get("[data-testid='language-paper']").should('have.css', 'display', 'flex')
    cy.get("[data-testid='language-paper']").should('have.css', 'height', '56px')

    cy.get("[data-testid='language-select']").should('exist')
    cy.get("[data-testid='language-select']").should('have.css', 'display', 'flex')
    cy.get("[data-testid='language-select']").should('have.css', 'height', '56px')
  })

  it('displays default language as English and both language options', () => {
    cy.get("input[value='en']").should('exist')
  })
})
