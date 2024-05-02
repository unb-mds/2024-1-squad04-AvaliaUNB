import { createRouter, createWebHistory } from "vue-router";
import Home from'../components/HomeComponent.vue';
import Login from'../components/LoginComponent.vue';
import Cadastro from '../components/CadastroComponent.vue'
import axios from 'axios'
import CryptoJS from "crypto-js";

const beforeEnterCheck = async () => {
    if (sessionStorage.getItem('matricula') != null){
        try {
            const responsekey = await axios.get('http://localhost:3000/chave');
            const responseuser = await axios.get('http://localhost:3000/usuario');
    
            const key = responsekey.data
            const user = responseuser.data
    
            const decryptedBytes = CryptoJS.AES.decrypt(sessionStorage.getItem('matricula'), key);
            const matriculadec = decryptedBytes.toString(CryptoJS.enc.Utf8);
    
            for (let i = 0; i < user.length; i++){
                if (user[i].matricula.toString() === matriculadec){
                    return;
                }
                else {
                    router.push('/login')
                    return;
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    else{
        router.push('/login');
        return;
    }
}

const router = createRouter({
    history: createWebHistory(''),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },

        {
            path: '/cadastro',
            name: 'cadastro',
            component: Cadastro
        },

        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter: beforeEnterCheck
        },

        // {
        //     path: '/cadastro',
        //     name: 'cadastro',
        //     component: Cadastro,
        // },
        
        {
            path: '/:catchAll(.*)',
            redirect: () => {
                return '/home';
            }
        }
    ]
});

export default router;