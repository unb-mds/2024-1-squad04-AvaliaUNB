import axios from "axios";
import CryptoJS from "crypto-js";

export async function getUsuarioLogado() {
  const apiUrl = process.env.VUE_APP_API_URL;
  try {
    const response = await axios.get(`${apiUrl}/chave`);
    const key = response.data;

    const encryptedMatricula = sessionStorage.getItem("matricula");

    if (encryptedMatricula) {
      const bytes = CryptoJS.AES.decrypt(encryptedMatricula, key);
      const decryptedMatricula = bytes.toString(CryptoJS.enc.Utf8);

      return decryptedMatricula;
    } else {
      throw new Error("No matricula found in session storage");
    }
  } catch (error) {
    console.error("Error decrypting matricula:", error);
  }
}
