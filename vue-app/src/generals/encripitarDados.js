import CryptoJS from "crypto-js";
import axios from "axios";

export async function encriptarDados(dado) {
	const response = await axios.get("http://localhost:3000/chave");
	const chave = response.data;
	const jsonDados = JSON.stringify(dado);
	const encrypted = CryptoJS.AES.encrypt(jsonDados, chave).toString();
	return encrypted;
}
