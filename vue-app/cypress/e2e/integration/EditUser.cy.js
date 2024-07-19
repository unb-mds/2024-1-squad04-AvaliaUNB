describe("Editando informações do usuario", () => {
  before(() => {
    // Visita a página do login
    cy.visit("http://localhost:8080/login");
    // Digita o email
    cy.get('input[placeholder="Insira o seu e-mail"]').type(
      "testee2e@cypress.com"
    );
    // Digita a senha
    cy.get('input[placeholder="Insira sua senha"]').type("teste123456");
    // Clica no botão de login
    cy.get(".login-button").click();

    // Verifica se foi redirecionado para a página correta após o login
    cy.url().should("include", "/home"); // ou qualquer que seja a URL de destino após o login

    // Abre o perfil de usuário
    cy.get(".notification-picture").click();

    // Verifica se foi redirecionado para a página correta após clicar no perfil
    cy.url().should("include", "/profile"); // ou qualquer que seja a URL de destino após clicar na foto de perfil
  });

  beforeEach(() => {
    // Visita a página do login
    cy.visit("http://localhost:8080/login");
    // Digita o email
    cy.get('input[placeholder="Insira o seu e-mail"]').type(
      "testee2e@cypress.com"
    );
    // Digita a senha
    cy.get('input[placeholder="Insira sua senha"]').type("teste123456");
    // Clica no botão de login
    cy.get(".login-button").click();
    // Verifica se foi redirecionado para a página correta após o login
    cy.url().should("include", "/home"); // ou qualquer que seja a URL de destino após o login
    // Redireciona para a página de perfil do usuário
    cy.visit("http://localhost:8080/profile");
    // Clica no botão de editar para abrir o popup
    cy.contains("button", "Editar").click();
  });

  it("Deve inserir uma URL inválida", () => {
    // Insere um URL inválido
    cy.get("#photoUrl").clear().type(" ");
    // Tenta enviar o URL inválido
    cy.contains("button", "Salvar").click();
    // Verifica se a mensagem de erro foi exibida
    cy.contains("Insira uma url de foto válida");
    // Sai do popup
    cy.contains("button", "Cancelar").click();
  });

  it("Deve inserir uma URL valida", () => {
    // Insere um URL inválido
    cy.get("#photoUrl")
      .clear()
      .type(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYdWp-lWzIL7Zilj8N8P1FTM8LJNwVsDqRYw&s"
      );
    // Tenta enviar o URL inválido
    cy.contains("button", "Salvar").click();
  });

  it("Deve mudar para um nome inválido", () => {
    // Insira um nome inválido (se necessário)
    cy.get("#firstName").clear().type("Sr. Caralho");
    //Tenta enviar o nome inválido
    cy.contains("button", "Salvar").click();
    //Verifica se a mensagem de erro foi exibida (se houver)
    cy.contains("Não insira palavrões em nenhum dos campos!");
    // Sai do popup
    cy.contains("button", "Cancelar").click();
  });

  it("Deve mudar para um nome valido", () => {
    // Insira um nome inválido (se necessário)
    cy.get("#firstName").clear().type("Teste");
    //Tenta enviar o nome inválido
    cy.contains("button", "Salvar").click();
    // Sai do popup
    cy.contains("button", "Cancelar").click();
  });

  it("Deve mudar para um sobrenome inválido", () => {
    // Insira um nome inválido (se necessário)
    cy.get("#lastName").clear().type("Porra Mole da Silva");
    //Tenta enviar o nome inválido
    cy.contains("button", "Salvar").click();
    //Verifica se a mensagem de erro foi exibida (se houver)
    cy.contains("Não insira palavrões em nenhum dos campos!");
    // Sai do popup
    cy.contains("button", "Cancelar").click();
  });

  it("Deve mudar para um sobrenome valido", () => {
    // Insira um nome inválido (se necessário)
    cy.get("#lastName").clear().type("Cypress");
    //Tenta enviar o nome inválido
    cy.contains("button", "Salvar").click();
    // Sai do popup
    cy.contains("button", "Cancelar").click();
  });

  it("Deve mudar para um email inválido", () => {
    // Insira um email inválido (se necessário)
    cy.get("#email").clear().type(" ");
    //Tenta enviar o email inválido
    cy.contains("button", "Salvar").click();
    //verifica a mensagem de erro
    cy.contains("Insira um email válido.");
    // Sai do popup
    cy.contains("button", "Cancelar").click();
  });

  it("Deve mudar para um email valido", () => {
    // Insira um email valido
    cy.get("#email").clear().type("testee2e@cypress.com");
    //Tenta enviar o nome valido
    cy.contains("button", "Salvar").click();
    // Sai do popup
    cy.contains("button", "Cancelar").click();
  });

  it("Deve selecionar um curso valido", () => {
    //clique no dropdown e pegue um opção
    cy.get("#dropdown").select("Engenharia de Software");
  });
});
