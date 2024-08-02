import {
  verificarEmail,
  verificarUrl,
  verificarCPF,
  verificarNomeSobrenome,
  verificarMatricula,
} from "../../../src/generals/verificarInputs"; // Substitua pelo caminho correto

describe("Funções de Validação", () => {
  describe("verificarEmail", () => {
    test("deve retornar false para email inválido", () => {
      expect(verificarEmail("invalidemail")).toBe(false);
      expect(verificarEmail("invalid@domain")).toBe(false);
      expect(verificarEmail("invalid@domain.")).toBe(false);
      expect(verificarEmail("invalid@.com")).toBe(false);
      expect(verificarEmail("invalid@domain..com")).toBe(false);
    });

    test("deve retornar true para email válido", () => {
      expect(verificarEmail("valid.email@example.com")).toBe(true);
      expect(verificarEmail("valid_email+test@example.co")).toBe(true);
      expect(verificarEmail("valid-email@example.com")).toBe(true);
    });
  });

  describe("verificarUrl", () => {
    test("deve retornar false para URL inválida", () => {
      expect(verificarUrl("htp://example.com")).toBe(false);
      expect(verificarUrl("http://example")).toBe(false);
      expect(verificarUrl("http://.com")).toBe(false);
    });

    test("deve retornar true para URL válida", () => {
      expect(verificarUrl("http://example.com")).toBe(true);
      expect(verificarUrl("https://example.com")).toBe(true);
      expect(verificarUrl("http://example.com:8080")).toBe(true);
      expect(verificarUrl("https://subdomain.example.com/path")).toBe(true);
    });
  });

  describe("verificarCPF", () => {
    test("deve retornar false para CPF inválido", () => {
      expect(verificarCPF("12345678900")).toBe(false);
      expect(verificarCPF("111.111.111-11")).toBe(false);
      expect(verificarCPF("123.456.789-00")).toBe(false);
      expect(verificarCPF("00000000000")).toBe(false);
    });

    test("deve retornar true para CPF válido", () => {
      expect(verificarCPF("123.456.789-09")).toBe(true);
    });
  });

  describe("verificarNomeSobrenome", () => {
    test("deve retornar false para nome ou sobrenome inválido", () => {
      expect(verificarNomeSobrenome("J", "Doe")).toBe(false);
      expect(verificarNomeSobrenome("John", "D0e")).toBe(false);
      expect(verificarNomeSobrenome("John", "Doe123")).toBe(false);
    });

    test("deve retornar true para nome e sobrenome válidos", () => {
      expect(verificarNomeSobrenome("John", "Doe")).toBe(true);
      expect(verificarNomeSobrenome("José", "da Silva")).toBe(true);
      expect(verificarNomeSobrenome("Ana", "Maria")).toBe(true);
    });
  });

  describe("verificarMatricula", () => {
    test("deve retornar false para matrícula inválida", () => {
      expect(verificarMatricula("123456")).toBe(false);
      expect(verificarMatricula("12345678")).toBe(false);
      expect(verificarMatricula("345678901")).toBe(false);
    });

    test("deve retornar true para matrícula válida", () => {
      expect(verificarMatricula("1234567")).toBe(true);
      expect(verificarMatricula("123456789")).toBe(true);
    });
  });
});
