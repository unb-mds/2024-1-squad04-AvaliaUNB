import LoginPage from './LoginPage.vue'

describe('<LoginPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(LoginPage)
  })
})