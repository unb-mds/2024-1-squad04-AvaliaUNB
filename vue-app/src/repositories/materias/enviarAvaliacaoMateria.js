
export async function enviarAvaliacaoMateria(nota_dif, nota_exp, comentario, matricula, materia) {
    const avaliacao = {
        nota_dif,
        nota_exp,
        comentario,
        matricula,
        materia
    };

    // Aqui você pode enviar a requisição para o servidor
    try {
        const response = await fetch("http://localhost:3000/avaliacao_materia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(avaliacao)  // Envie o objeto avaliacao como JSON
        });
        if (!response.ok) {
            throw new Error('Erro ao enviar avaliação do professor');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
