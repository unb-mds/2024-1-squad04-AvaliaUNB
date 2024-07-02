export function verificarEmail(email) {
	// Expressão regular para validar o formato
	const re =
		/^(?!.*\.\.)(?!.*\.$)(?!^\.)[a-zA-Z0-9._%+-]+(?<!\.)@[a-zA-Z0-9.-]+(?<!\.)\.[a-zA-Z]{2,}$/;

	if (!re.test(String(email).toLowerCase())) {
		return false; //email não é válido
	}

	// Verifica se contém apenas um "@" e se o domínio é plausível
	const parts = email.split("@");
	if (parts.length !== 2) {
		return false;
	}

	const domainParts = parts[1].split(".");
	if (domainParts.length < 2) {
		return false;
	}

	// Verifica se cada parte do domínio é válida
	for (const part of domainParts) {
		if (part.length === 0) {
			return false;
		}
	}

	return true; //email é válido
}

export function verificarUrl(url) {
	const re =
		/^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
	return re.test(String(url).toLowerCase());
}

export function verificarCPF(cpf) {
	// Remove caracteres não numéricos
	cpf = cpf.replace(/[^\d]/g, "");

	// Verifica se o CPF tem 11 dígitos
	if (cpf.length !== 11) {
		return false;
	}

	// Verifica se todos os dígitos são iguais
	if (/^(\d)\1+$/.test(cpf)) {
		return false;
	}

	// Calcula o primeiro dígito verificador
	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += parseInt(cpf.charAt(i)) * (10 - i);
	}
	let firstVerifier = 11 - (sum % 11);
	if (firstVerifier >= 10) firstVerifier = 0;

	// Verifica se o primeiro dígito verificador é válido
	if (firstVerifier !== parseInt(cpf.charAt(9))) {
		return false;
	}

	// Calcula o segundo dígito verificador
	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += parseInt(cpf.charAt(i)) * (11 - i);
	}
	let secondVerifier = 11 - (sum % 11);
	if (secondVerifier >= 10) secondVerifier = 0;

	// Verifica se o segundo dígito verificador é válido
	if (secondVerifier !== parseInt(cpf.charAt(10))) {
		return false;
	}

	return true;
}

export function verificarNomeSobrenome(nome, sobrenome) {
	// Expressão regular para verificar se contém apenas letras (incluindo acentos) e espaços
	const re = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

	// Função auxiliar para verificar um nome ou sobrenome
	function verificarParte(parte) {
		if (!re.test(parte) || parte.length < 2) {
			return false;
		}
		return true;
	}

	// Verifica o nome e o sobrenome
	if (!verificarParte(nome) || !verificarParte(sobrenome)) {
		return false;
	}

	return true;
}

export function verificarMatricula(matricula) {
	// Verifica se a matrícula tem 7 ou 9 dígitos
	if (!/^\d{7}$|^\d{9}$/.test(matricula)) {
		return false;
	}

	// Verifica se a matrícula de 9 dígitos começa com 1 ou 2
	if (matricula.length === 9 && !/^[12]/.test(matricula)) {
		return false;
	}

	return true;
}
