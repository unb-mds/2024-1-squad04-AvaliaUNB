import LandingPage from './LandingPage.vue'

describe('<LandingPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(LandingPage)
  })
})