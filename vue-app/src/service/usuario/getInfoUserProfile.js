import { descriptarDados } from "@/generals/descriptografarDados";
import { getInfoUserProfile } from "@/repositories/usuario/obterInformacoesPerfilUsuario";

export async function getInfoUserProfileService() {
	try {
		const usuarioEncriptografado = sessionStorage.getItem("matricula");
		const usuarioDescriptografado = await descriptarDados(
			usuarioEncriptografado
		);

		const userInformationProfile = await getInfoUserProfile(
			usuarioDescriptografado
		);

		// Return the first element of the array directly
		return userInformationProfile[0];
	} catch (error) {
		console.error("Erro ao buscar minhas informações", error);
		throw error;
	}
}
