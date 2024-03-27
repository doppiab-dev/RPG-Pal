import { checkIfWeAreInLoginComponent, setViewportAndStart } from "./utils"

describe('login-setUsername-logout', function () {
  beforeEach(() => {
    setViewportAndStart()
  })
  it("valid no redirect without token", () => {
    cy.visit("http://localhost:3000/login")
    checkIfWeAreInLoginComponent()
  })
  it("check if we force to / without token", () => {
    cy.visit("http://localhost:3000/")
    checkIfWeAreInLoginComponent()
  })
})
