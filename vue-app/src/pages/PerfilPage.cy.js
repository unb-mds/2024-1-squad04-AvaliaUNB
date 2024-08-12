import PerfilPage from './PerfilPage.vue'

describe('<PerfilPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(PerfilPage)
  })
})