
//método POST de usuário
export async function cadastrarUsuarioDB(formData) {
    const response = await fetch("http://localhost:3000/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
    }
    return await response.json();
}