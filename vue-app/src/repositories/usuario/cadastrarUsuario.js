const apiUrl = process.env.VUE_APP_API_URL;
//método POST de usuário
export async function cadastrarUsuarioDB(formData) {
	try {
		const response = await fetch(`${apiUrl}/usuario`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}
