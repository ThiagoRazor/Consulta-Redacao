<template>
  <div id="app">
    <div v-if="!isAuthenticated" class=" relative">
      <div class="absolute bg-gradient-to-b from-violet-800 to-violet-300 opacity-75 inset-0 z-0"></div>
      <div class="h-screen min-[200px]:flex min-[200px]:flex-row mx-0 justify-center">
        <div class="flex justify-center self-center  z-10">
          <div class="p-12 bg-white mx-auto md:mx-auto rounded-2xl w-100 ">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p class="text-gray-500">Por favor entre com a sua conta.</p>
            </div>
            <form @submit.prevent="login">
              <div class="space-y-5">
                <div class="space-y-2">
                  <label for="email" class="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                  <ValidationProvider rules="required|email" name="email" v-slot="{ errors }">
                    <input v-model="email"
                      class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-violet-400"
                      type="email" placeholder="mail@gmail.com" id="email" />
                    <p class="text-red-500">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
                <div class="space-y-2">
                  <label for="password" class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Senha:
                  </label>
                  <ValidationProvider rules="required|min:8" name="password" v-slot="{ errors }">
                    <input v-model="password"
                      class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-violet-400"
                      type="password" placeholder="Entre com a sua senha" />
                    <p class="text-red-500">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
                <div>
                  <button type="submit"
                    class="w-full flex justify-center bg-violet-400  hover:bg-violet-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <TelaRedacoes />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../src/router/index';
import { ValidationProvider } from 'vee-validate';
import TelaRedacoes from '../src/views/TelaRedacoes.vue';

const BASE_URL = 'https://desafio.pontue.com.br';

export default {
  name: 'App',
  components: {
    ValidationProvider,
    TelaRedacoes,
  },
  data() {
    return {
      email: '',
      password: '',
      isAuthenticated: false,
    }
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.isAuthenticated = true;
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
          email: this.email,
          password: this.password,
        });
        const token = response.data.access_token;
        const studentId = response.data.aluno_id;

        localStorage.setItem('aluno_id', studentId);
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.isAuthenticated = true;
        if (this.$route.path !== '/redacoes') {
          router.push({ name: 'redacoes.show' });
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
