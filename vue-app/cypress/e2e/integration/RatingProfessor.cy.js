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

		cy.contains(".item-web", "Professores").click();
	});

	it("Deve avaliar um professor", () => {
		//clica em cima de um card de professor
		cy.get(".card-professor").first().click();
		cy.url().should("include", "paginaProfessor/1007019");
		cy.contains(".role-button", "Avaliar").click();
		cy.get(".popup").should("be.visible");
		cy.get(".popup .select-box").select(
			"ALGORITMOS E PROGRAMAÇÃO DE COMPUTADORES"
		);

		cy.get('input[name="notaAcesso"][id="star1-5"]').click();
		cy.get('input[name="notaMetodologia"][id="star3-5"]').click();
		cy.get('input[name="notaCarisma"][id="star4-5"]').click();
		cy.get('input[name="notaDidatica"][id="star2-5"]').click();
		cy.get(".comentario").type("As aulas desse professor são muito boas");
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

		cy.get(".professores-text").click();

		cy.get(".trash-button").first().click();
	});
});
