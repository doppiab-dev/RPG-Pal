import { getViewport } from '../Cypress/utils'
import TestContainer from '../Cypress/TestContainer'
import CampaignItem from './CampaignItem'
import en from '../Translations/en'

describe('<CampaignItem />', () => {
  const { height, width }: { height: number, width: number } = getViewport()
  const campaign = {
    groups: 0,
    id: 13,
    name: 'sad',
    status: 'active'
  } satisfies Campaign

  console.log(`${en.campaign.status} ${en.campaign[campaign.status]}`)

  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <TestContainer>
        <CampaignItem
          campaign={campaign}
          activeCampaign={0}
          openEditCampaign={(id: number): void => { }}
          openDeleteCampaign={(id: number): void => { }}
          setActiveCampaign={(id: number): void => { }}
          setValue={() => { }}
        />
      </TestContainer>
    )
  })

  it('renders', () => {
    cy.get("[data-testid='campaign-item']").should('exist').and('be.visible')
  })

  it('displays campaign name', () => {
    cy.get("[data-testid='campaign-text']").should('exist').and('be.visible')
      .find('.MuiListItemText-primary')
      .should('contain', campaign.name)
  })

  it('displays campaign details 1', () => {
    cy.get("[data-testid='campaign-text']").should('exist').and('be.visible')
      .within(() => {
        cy.get('.MuiListItemText-secondary').should('exist')
          .contains(`${campaign.groups} ${en.campaign.groups}`)
      })
  })

  it('displays campaign details 2', () => {
    cy.get("[data-testid='campaign-text']").should('exist').and('be.visible')
      .within(() => {
        cy.get('.MuiListItemText-secondary').should('exist')
          .contains(`${en.campaign.status}${en.campaign[campaign.status]}`)
      })
  })

  it('displays buttons', () => {
    cy.get("[data-testid='edit-campaign-button']")
      .should('exist').and('be.visible')
    cy.get("[data-testid='delete-campaign-button']")
      .should('exist').and('be.visible')
  })

  it('displays status icon', () => {
    cy.get("[data-testid='campaign-item']")
      .find('.MuiListItemIcon-root svg')
      .should('exist')
      .then(icon => {
        const iconColor = Cypress.$(icon).css('color')
        expect(iconColor).to.equal('rgb(0, 128, 0)')
      })
  })
})
