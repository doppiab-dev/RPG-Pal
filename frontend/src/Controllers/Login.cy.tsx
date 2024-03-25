/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable max-len */
import { hexToRgb, vhToPixel, vwToPixel } from '../Utils/f'
import { getViewport, theme } from '../Cypress/utils'
import { clientId } from '../Utils/config'
import { GoogleOAuthProvider } from '@react-oauth/google'
import TestContainer from '../Cypress/TestContainer'
import Login from './Login'
import en from '../Translations/en'

describe('<Login />', () => {
  const { height, width }: { height: number, width: number } = getViewport()
  if (clientId === undefined) return
  const id: string = clientId

  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <GoogleOAuthProvider clientId={id}>
        <TestContainer>
          <Login />
        </TestContainer>
      </GoogleOAuthProvider>
    )
  })

  it('renders', () => {
    cy.get("[data-testid='login-component']").should('exist').and('be.visible')
  })

  it('displays signin text', () => {
    cy.get("[data-testid='login-text']").should('exist').and('contain.text', en.login.signin)
  })

  it('displays Google signin button', () => {
    cy.get("[data-testid='login-button']").should('exist').and('contain.text', en.login.signin)
  })

  it('logs in when Google signin button is clicked', () => {
    cy.get("[data-testid='login-button']").click()
  })

  it('login-box has correct container styles', () => {
    cy.get("[data-testid='login-box']").should('have.css', 'display', 'flex')
    cy.get("[data-testid='login-box']").should('have.css', 'flex-direction', 'column')
    cy.get("[data-testid='login-box']").should('have.css', 'align-items', 'center')
    cy.get("[data-testid='login-box']").should('have.css', 'align-self', 'center')
    cy.get("[data-testid='login-box']").should('have.css', 'justify-content', 'space-between')
    cy.get("[data-testid='login-box']").should('have.css', 'width', `${vwToPixel(35, width)}px`)
    cy.get("[data-testid='login-box']").should('have.css', 'padding', '57.5938px')
    cy.get("[data-testid='login-box']").should('have.css', 'border-radius', '5%')
    cy.get("[data-testid='login-box']").should('have.css', 'min-height', '55%')
  })

  it('login-avatar has correct avatar styles', () => {
    const color: string = hexToRgb(theme.palette.secondary.main)
    cy.get("[data-testid='login-avatar']").should('have.css', 'background-color', color)
    cy.get("[data-testid='login-avatar']").should('have.css', 'margin-top', `${vhToPixel(2, height)}px`)
    cy.get("[data-testid='login-avatar']").should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px')
  })

  it('button has correct styles', () => {
    cy.get("[data-testid='login-button']").should('have.css', 'margin', `${vhToPixel(3, height)}px 0px`)
    cy.get("[data-testid='login-button']").should('have.css', 'font-weight', `${800}`)
  })
})
