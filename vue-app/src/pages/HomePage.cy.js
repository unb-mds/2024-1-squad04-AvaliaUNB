import HomePage from './HomePage.vue'

describe('<HomePage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(HomePage)
  })
})