<template>
    <div class=" bg-gray-700 shadow relative h-2/4">
        <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-gray-100 text-xl lg:text-2xl font-semibold dark:text-white">
                Adicionar Redação
            </h3>
        </div>
        <div class="p-4 space-y-6 h-2/4">
            <ValidationObserver ref="observer">
                <ValidationProvider rules="required" name="arquivo" v-slot="{ errors }">
                    <div class="form-group text-gray-100">
                        <label class="text-gray-100" for="arquivo">Arquivo:</label>
                        <input type="file" id="arquivo" ref="fileInput" />
                        <div class="text-red-500">{{ errors[0] }}</div>
                    </div>
                </ValidationProvider>
            </ValidationObserver>
            <button @click.prevent="enviarRedacao"
                class="bg-purple-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Enviar</button>
        </div>
    </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import axios from 'axios';
import router from '../src/router/index';
import TelaRedacoes from '../src/views/TelaRedacoes.vue'

export default {
    name: 'App',
    components: {
        ValidationProvider,
        TelaRedacoes
    },
    data() {
        return {
            email: '',
            password: '',
            authenticated: false
        }
    },
    created() {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            this.authenticated = true;
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('https://desafio.pontue.com.br/auth/login', {
                    email: this.email,
                    password: this.password
                });
                const token = response.data.access_token;
                const aluno_id = response.data.aluno_id;

                localStorage.setItem('aluno_id', aluno_id);
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                this.authenticated = true;
                if (this.$route.path !== '/redacoes') {
                    router.push({ name: 'redacoes.show' });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
