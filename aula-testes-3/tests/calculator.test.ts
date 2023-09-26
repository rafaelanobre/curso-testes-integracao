import calculator from "calculator";

describe("Funções Calculadora", () => {
    it("soma", () => {
		const soma = calculator.sum(2, 1);
        expect(soma).toBe(3);
    });
    it("subtração", () => {
        const subtracao = calculator.sub(2, 1);
        expect(subtracao).toBe(1);
    });
    it("divisão", () => {
        const divisao = calculator.div(2, 1);
        expect(divisao).toBe(2);
    });
    it("multiplicação", () => {
        const multiplicao = calculator.mul(2, 1);
        expect(multiplicao).toBe(2);
    });
});