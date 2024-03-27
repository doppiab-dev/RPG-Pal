/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import CryptoJS from 'crypto-js'

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes(
      "ResizeObserver loop completed with undelivered notifications"
    )
  ) {
    return false
  }
  return true
})

Cypress.Commands.add(('loginByGoogleApi' as any), () => {
  cy.log('Logging in to Google')
  const client_id = Cypress.env('googleClientId')
  const client_secret = Cypress.env('googleClientSecret')
  const refresh_token = Cypress.env('googleRefreshToken')
  const secretKey = Cypress.env('secretKey')
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id,
      client_secret,
      refresh_token
    }
  }).then(({ body }) => {
    cy.log(body)
    const { access_token, id_token } = body
    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body)
      const userData = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        }
      }
      const state = {
        userInfo: {
          user: {
            ...userData.user,
            picture: "",
            hd: "",
            id: "",
            locale: "",
            name: "",
            verifiedEmail: false
          },
          isUserLogged: true,
          errorMessage: "",
          token: userData.token,
          userInfo: {
            username: null,
            player: {
              characters: 0
            },
            master: {
              campaigns: 0
            }
          },
          authStatus: "success",
          userInfoStatus: "idle",
          usernameStatus: "idle"
        },
        masterInfo: {
          campaigns: [],
          campaignsInfoStatus: "success",
          errorMessage: ""
        },
        playerInfo: {
          characters: [],
          charactersInfoStatus: "success",
          errorMessage: ""
        }
      }
      window.localStorage.setItem('rpgPal', CryptoJS.AES.encrypt(JSON.stringify(state), secretKey).toString())
    })
  })
})
