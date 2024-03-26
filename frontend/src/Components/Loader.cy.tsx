import { getViewport } from '../Cypress/utils'
import Loader from './Loader'
import TestContainer from '../Cypress/TestContainer'
import en from '../Translations/en'

describe('<Loader />', () => {
  const { height, width }: { height: number, width: number } = getViewport()

  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <TestContainer>
        <Loader />
      </TestContainer>
    )
  })
  it('renders', () => {
    cy.get("[data-testid='loader-container']").should('exist').and('be.visible')
  })
  it('displays title and text', () => {
    cy.get("[data-testid='title']").should('exist').and('be.visible').and('contain', en.loader.title)
    cy.get("[data-testid='text']").should('exist').and('be.visible').and('contain', en.loader.text)
  })

  it('has correct container styles', () => {
    const containerHeight = height
    cy.get("[data-testid='loader-container']").should('have.css', 'height', `${containerHeight}px`)
  })

  it('has correct title styles', () => {
    cy.get("[data-testid='title']").should('exist').and('be.visible').and('have.css', 'font-size', '14px')
  })

  it('has correct text styles', () => {
    cy.get("[data-testid='text']").should('exist').and('be.visible').and('have.css', 'font-size', '14px')
  })

  it('has correct CircularProgress styles', () => {
    cy.get("[data-testid='loader']").should('exist').and('be.visible').and('have.css', 'color', 'rgb(66, 4, 126)')
  })

  it('has correct text tytle', () => {
    const title = 'custom title'
    const text = 'custom text'
    cy.mount(<Loader text={text} title={title} />).wait(500)
    cy.get("[data-testid='title']").should('exist').and('be.visible').and('contain', title)
    cy.get("[data-testid='text']").should('exist').and('be.visible').and('contain', text)
  })
})
