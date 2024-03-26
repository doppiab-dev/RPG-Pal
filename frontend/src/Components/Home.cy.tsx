/* eslint-disable max-len */
import { getViewport } from '../Cypress/utils'
import TestContainer from '../Cypress/TestContainer'
import Home from './Home'
import en from '../Translations/en'

describe('<Home />', () => {
  const userInfo = {
    username: 'username',
    player: { characters: 0 },
    master: { campaigns: 2 }
  }
  const { height, width }: { height: number, width: number } = getViewport()
  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <TestContainer>
        <Home userInfo={userInfo} />
      </TestContainer>
    )
  })
  it('renders', () => {
    cy.get("[data-testid='home-component']").should('exist').and('be.visible')
  })

  it('displays title', () => {
    cy.get("[data-testid='home-component']").should('contain', en.home.title)
  })

  it('displays correct player information', () => {
    cy.get("[data-testid='home-component']").should('contain', en.home.becomePlayer)
    cy.get("[data-testid='home-component']").should('contain', en.home.emptyPlayer)
  })

  it('displays correct master information', () => {
    cy.get("[data-testid='home-component']").should('contain', `${en.home.masterButton1} ${userInfo.master.campaigns} ${en.home.masterButton2}`)
  })

  it('has correct title styles', () => {
    cy.get("[data-testid='home-component'] [data-testid='home-title']").should('exist').and('be.visible').and('have.css', 'font-size', '17.5px')
  })

  it('has correct button styles', () => {
    cy.get("[data-testid='home-component'] button")
      .should('exist')
      .and('be.visible')
      .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px')
  })
})
