describe("Login Page", () => {
	beforeEach(() => {
		// Visita a página de login antes de cada teste
		cy.visit("http://localhost:8080/login");
	});

	it("Deve exibir o título correto", () => {
		cy.contains("h1", "Entrar");
	});

	it("Deve fazer login com credenciais válidas", () => {
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
	});

	it("Deve exibir mensagem de erro com credenciais inválidas", () => {
		// Digita um email inválido
		cy.get('input[placeholder="Insira o seu e-mail"]').type(
			"usuario@invalido.com"
		);
		// Digita uma senha inválida
		cy.get('input[placeholder="Insira sua senha"]').type("senhaerrada");
		// Clica no botão de login
		cy.get(".login-button").click();

		// Verifica se a mensagem de erro é exibida
		cy.contains("Erro ao fazer login. Por favor, verifique suas credenciais.");
	});

	it("Deve redirecionar para a página de cadastro ao clicar no link de cadastro", () => {
		// Clica no link de cadastro
		cy.contains("Não possui conta? Cadastre-se aqui.").click();

		// Verifica se foi redirecionado para a página de cadastro
		cy.url().should("include", "/cadastro");
	});
});
