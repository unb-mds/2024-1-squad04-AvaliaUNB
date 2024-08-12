import AvaliacaoPage from './AvaliacaoPage.vue'

const avaliacaoMateria = {
  nota_total: 4,
  nome_materia: "Calculo 1",
}

const avaliacaoProfessor = {
  nota_total: 4,
  nome_professor: "DANIEL SUNDFELD LIMA",
}


describe('<AvaliacaoPage />', () => {
  it('renders', () => {
    cy.mount(AvaliacaoPage, {
      props: { avaliacaoMateria },
    })
  })

  it('renders', () => {
    cy.mount(AvaliacaoPage, {
      props: { avaliacaoProfessor },
    })
  })
})