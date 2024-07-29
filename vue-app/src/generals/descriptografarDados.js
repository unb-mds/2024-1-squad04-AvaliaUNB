import CryptoJS from "crypto-js";
import axios from "axios";

export async function descriptarDados(dadoCriptografado) {
  const apiUrl = process.env.VUE_APP_API_URL;
  try {
    const response = await axios.get(`${apiUrl}/chave`);
    const chave = response.data;
    const bytes = CryptoJS.AES.decrypt(dadoCriptografado, chave);
    const jsonDados = bytes.toString(CryptoJS.enc.Utf8);
    if (!jsonDados) {
      return [];
    }
    const dados = JSON.parse(jsonDados);
    return dados;
  } catch (error) {
    console.error("Erro ao descriptografar os dados:", error);
    return [];
  }
}
