import router from "../routes/index.js";
import { getUsuarioByID } from "../repositories/usuario/obterUsuarios.js";
import { encriptarDados } from "../generals/encripitarDados.js";

export async function authGuard(auth, matricula) {
  if (auth) {
    const usuario = await getUsuarioByID(matricula);
    const matriculaEncriptografada = await encriptarDados(usuario.matricula);
    const professoresAvaliadosEncriptografado = await encriptarDados(
      usuario.professoresAvaliados
    );
    const materiasAvaliadasEncriptografadas = await encriptarDados(
      usuario.materiasAvaliadas
    );
    const likesDislikesProfessoresEncriptografado = await encriptarDados(
      usuario.likesDislikesProfessores
    );
    const likesDislikesMateriasEncriptografado = await encriptarDados(
      usuario.likesDislikesMaterias
    );
    sessionStorage.setItem("matricula", matriculaEncriptografada);
    sessionStorage.setItem(
      "materias_avaliadas",
      materiasAvaliadasEncriptografadas
    );
    sessionStorage.setItem(
      "professores_avaliados",
      professoresAvaliadosEncriptografado
    );
    sessionStorage.setItem(
      "likes_dislikes_professores",
      likesDislikesProfessoresEncriptografado
    );
    sessionStorage.setItem(
      "likes_dislikes_materias",
      likesDislikesMateriasEncriptografado
    );
    sessionStorage.setItem("foto_perfil", usuario.foto_url);
    router.push("/home");
    return 1;
  } else {
    sessionStorage.removeItem("matricula");
    return 0;
  }
}
