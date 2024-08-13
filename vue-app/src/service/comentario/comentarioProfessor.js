/*
Para curtir um comentário:
 - descriptografar o sessionStorage e ver o array likesDislikesProfessores - ok
 - verificar se existe um relacionamento entre o usuario e esse comentário] - ok
 - se não existir:
  - atualizar a quantidade de likes na tabela comentário - ok
  - adicionar o relacionamento na tabela de relacionamento - ok
  - adicionar o relacionamento no sessionStorage - ok
 - se existir:
  - verificar se o relacionamento é de like ou de deslike -ok
  -se for de like:
    - atualizar a quantidade de likes na tabela comentario, diminuindo um like -ok
    - apagar o relacionamento na tabela de relacionamento -ok
    - apagar o relacionamento no sessionStorage -ok
  - se for de dislike:
    - atualizar a quantidade de like e deslike na tabela comentário, somar um no like e subtrair um no dislike
    - editar a tabela de relacionamento entre usuario e comentario, trocando like para true e dislike para false
    - atualizando o sessionstorage também
*/

import { descriptarDados } from "../../generals/descriptografarDados";
import { encriptarDados } from "../../generals/encripitarDados";
import {
  curtirDescurtirComentarioProfessor,
  relacionamentoUsuarioCurtidaProfessor,
} from "@/repositories/comentario/enviarLikeDislikeProfessor";
import { deletarRelacionamentoUsuarioComentarioProfessor } from "@/repositories/comentario/deletarLikeDislikeProfessor";
import { editarRelacionamentoUsuarioComentarioProfessor } from "@/repositories/comentario/editarRelacionamentoUsuarioComentario";

async function curtirComentario(cod_comentario, comentariosCurtidos) {
  const matriculaDescriptografada = await descriptarDados(
    sessionStorage.getItem("matricula")
  );
  await curtirDescurtirComentarioProfessor(
    parseInt(1),
    parseInt(0),
    parseInt(cod_comentario)
  );
  await relacionamentoUsuarioCurtidaProfessor(
    parseInt(cod_comentario),
    parseInt(matriculaDescriptografada),
    parseInt(1),
    parseInt(0)
  );
  const novaCurtida = {
    cod_comentario: cod_comentario,
    like: 1,
    dislike: 0,
  };

  const curtidasAtualizadas = [...comentariosCurtidos, novaCurtida];

  const comentariosAtualizadosEncriptados = await encriptarDados(
    curtidasAtualizadas
  );

  sessionStorage.setItem(
    "likes_dislikes_professores",
    comentariosAtualizadosEncriptados
  );

  return { num_likes: 1, num_dislikes: 0, liked: true, disliked: false };
}

async function curtirComentarioComDislike(cod_comentario, comentariosCurtidos) {
  const matriculaDescriptografada = await descriptarDados(
    sessionStorage.getItem("matricula")
  );
  await curtirDescurtirComentarioProfessor(
    parseInt(1),
    parseInt(-1),
    parseInt(cod_comentario)
  );
  await editarRelacionamentoUsuarioComentarioProfessor(
    parseInt(cod_comentario),
    parseInt(matriculaDescriptografada),
    parseInt(1),
    parseInt(0)
  );
  const novaCurtida = {
    cod_comentario: cod_comentario,
    like: 1,
    dislike: 0,
  };

  const comentariosAtualizados = comentariosCurtidos.filter(
    (comentario) => comentario.cod_comentario != cod_comentario
  );

  const curtidasAtualizadas = [...comentariosAtualizados, novaCurtida];

  const comentariosAtualizadosEncriptados = await encriptarDados(
    curtidasAtualizadas
  );

  sessionStorage.setItem(
    "likes_dislikes_professores",
    comentariosAtualizadosEncriptados
  );
  return { num_likes: 1, num_dislikes: -1, liked: true, disliked: false };
}

async function descurtirComentario(cod_comentario, comentariosCurtidos) {
  const matriculaDescriptografada = await descriptarDados(
    sessionStorage.getItem("matricula")
  );
  await curtirDescurtirComentarioProfessor(
    parseInt(-1),
    parseInt(0),
    parseInt(cod_comentario)
  );
  await deletarRelacionamentoUsuarioComentarioProfessor(
    parseInt(cod_comentario),
    parseInt(matriculaDescriptografada)
  );
  const comentariosAtualizados = comentariosCurtidos.filter(
    (comentario) => comentario.cod_comentario != cod_comentario
  );
  const comentariosAtualizadosEncriptados = await encriptarDados(
    comentariosAtualizados
  );
  sessionStorage.setItem(
    "likes_dislikes_professores",
    comentariosAtualizadosEncriptados
  );
  return { num_likes: -1, num_dislikes: 0, liked: false, disliked: false };
}

export async function verificacaoCurtida(comentariosCurtidos, cod_comentario) {
  const comentarioProcurado = comentariosCurtidos.find(
    (comentario) => comentario.cod_comentario == cod_comentario
  );
  if (!comentarioProcurado) {
    return await curtirComentario(cod_comentario, comentariosCurtidos);
  } else if (comentarioProcurado.like == 1) {
    return await descurtirComentario(cod_comentario, comentariosCurtidos);
  } else {
    return await curtirComentarioComDislike(
      cod_comentario,
      comentariosCurtidos
    );
  }
}
