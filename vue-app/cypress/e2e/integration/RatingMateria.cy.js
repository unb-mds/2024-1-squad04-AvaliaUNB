describe("Avaliando Professor", () => {
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

        cy.contains(".item-web", "Matérias").click();
    });

    it("Deve avaliar uma matéria", () => {
        //clica em cima de um card de professor
        cy.get(".card-materia").first().click();
        cy.url().should("include", "paginaMateria/FGA0030");
        cy.contains(".avaliar", "Avaliar").click();
        cy.get(".popup").should("be.visible");

        cy.get('input[name="notaExperiencia"][id="star1-5"]').click();
        cy.get('input[name="notaDificuldade"][id="star2-2"]').click();
        cy.get(".camp-txt").type(
            "Aprendi que o tamanho de um ponteiro depende da arquitetura"
        );
        cy.get(".send-btn").click();

        cy.wait(4000);
    });

    it("Deve excluir uma avaliação", () => {
        cy.visit("http://localhost:8080/login");
        // Digita o email
        cy.get('input[placeholder="Insira o seu e-mail"]').type(
            "testee2e@cypress.com"
        );
        // Digita a senha
        cy.get('input[placeholder="Insira sua senha"]').type("teste123456");
        // Clica no botão de login
        cy.get(".login-button").click();

        cy.contains(".item-web", "Minhas Avaliações").click();
        cy.get(".materias").click();

        cy.get(".trash-button").first().click();
    });
});
