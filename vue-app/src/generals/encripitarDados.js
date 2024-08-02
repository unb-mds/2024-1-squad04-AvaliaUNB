import CryptoJS from "crypto-js";
import axios from "axios";

export async function encriptarDados(dado) {
  if (!dado) {
    console.error("Erro ao criptografar dado!");
  }
  try {
    const apiUrl = process.env.VUE_APP_API_URL;
    const response = await axios.get(`${apiUrl}/chave`);
    const chave = response.data;
    const jsonDados = JSON.stringify(dado);
    const encrypted = CryptoJS.AES.encrypt(jsonDados, chave).toString();
    return encrypted;
  } catch (error) {
    console.error(error);
  }
}
