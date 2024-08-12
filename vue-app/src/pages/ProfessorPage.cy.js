import ProfessorPage from './ProfessorPage.vue'

describe('<ProfessorPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ProfessorPage)
  })
})