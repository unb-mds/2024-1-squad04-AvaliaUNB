import MateriaIndividualPage from './MateriaIndividualPage.vue'

describe('<MateriaIndividualPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(MateriaIndividualPage)
  })
})