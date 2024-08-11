import CardMinhaAvaliacao from './CardMinhaAvaliacao.vue'

const avaliacao = {
      nota_total: 4,
      nome_materia: "Calculo 1",
    }

describe('<CardMinhaAvaliacao />', () => {
  it('renders', () => {
    cy.mount(CardMinhaAvaliacao, {
      props: { avaliacao },
    })
  })

  it('Teste da funcao onDelete', () => {
    const onDeleteSpy = cy.spy().as('onDeleteSpy')
    cy.mount(CardMinhaAvaliacao, {
      props: { avaliacao, onDelete: onDeleteSpy }
      }
    )

    cy.get('#trash-button').click()
  })
})