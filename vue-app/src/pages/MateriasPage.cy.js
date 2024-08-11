import MateriasPage from './MateriasPage.vue'

describe('<MateriasPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(MateriasPage)
  })
})