import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import Login from "../pages/LoginPage.vue";
import Cadastro from "../pages/CadastroPage.vue";
import Landing from "../pages/LandingPage.vue";
import Professor from "../pages/ProfessorPage.vue";
import ProfessorIndividualPage from "@/pages/ProfessorIndividualPage.vue";
import MateriaIndividualPage from "@/pages/MateriaIndividualPage.vue";
import Materias from "../pages/MateriasPage.vue";
import Avaliacao from "../pages/AvaliacaoPage.vue";
import PerfilPage from "../pages/PerfilPage.vue";
import axios from "axios";
import { descriptarDados } from "@/generals/descriptografarDados";

export const beforeEnterCheck = async () => {
  const apiUrl = process.env.VUE_APP_API_URL;
  if (sessionStorage.getItem("matricula") != null) {
    try {
      const responseuser = await axios.get(`${apiUrl}/usuario`);
      const user = responseuser.data;
      const usuarioSessionStorage = sessionStorage.getItem("matricula");

      const matriculaDescriptografada = await descriptarDados(
        usuarioSessionStorage
      );

      for (const element of user) {
        if (element.matricula === parseInt(matriculaDescriptografada)) {
          return;
        }
      }
      router.push("/login");
      return;
    } catch (error) {
      console.log(error);
      router.push("/login");
      return;
    }
  }
  router.push("/login");
};

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/cadastro",
      name: "cadastro",
      component: Cadastro,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      beforeEnter: beforeEnterCheck,
    },
    {
      path: "/landingpage",
      name: "landing",
      component: Landing,
    },
    {
      path: "/professores",
      name: "professor",
      component: Professor,
    },

    {
      path: "/paginaProfessor/:id",
      name: "paginaProfessor",
      component: ProfessorIndividualPage,
    },

    {
      path: "/materias",
      name: "materia",
      component: Materias,
    },
    {
      path: "/paginaMateria/:cod",
      name: "paginaMateria",
      component: MateriaIndividualPage,
    },
    {
      path: "/avaliacao",
      name: "avaliacao",
      component: Avaliacao,
    },
    {
      path: "/profile",
      name: "profile",
      component: PerfilPage,
      beforeEnter: beforeEnterCheck,
    },
    {
      path: "/:catchAll(.*)",
      redirect: () => {
        return "/landingpage";
      },
    },
  ],
});
export default router;
