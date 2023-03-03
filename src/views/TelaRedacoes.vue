<template>
    <div @load="mounted()">
        <VisualizarRedacao v-if="mostrarRedacao" @fecharModal="mostrarRedacao = false" />
        <EditarRedacao v-if="mostrarEditarRedacao" @editar="editarRedacao" />
        <div class="bg-gray-700 p-8 w-full">
            <div class=" flex items-center justify-between pb-6">
                <div>
                    <h2 class="text-gray-100 font-semibold">Lista de Redações</h2>
                </div>
                <button @click="logout()"
                    class="bg-purple-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                    Logout
                </button>

            </div>
            <div>
                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Título
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Aluno
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Data de criação
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Opções
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in data" :key="item.id">
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button @click="abrirRedacao(item)"> {{ item.id }}</button>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{{ item.numero }}</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {{ item.created_at }}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button @click="editarRedacaoProp(item)" class="text-gray-900 whitespace-no-wrap">
                                            Editar
                                        </button>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button @click="deletarRedacao(item)" class="text-gray-900 whitespace-no-wrap">
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
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
    </div>
</template>


<script>
import axios from 'axios';
import VisualizarRedacao from '../views/VisualizarRedacao.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import EditarRedacao from './EditarRedacao.vue';


const BASE_URL = 'https://desafio.pontue.com.br';

export default {
    data() {
        return {
            data: [],
            authenticated: false,
            mostrarRedacao: false,
            mostrarEditarRedacao: false,
            submitting: false,
            redacao: '',
            mostrarModal: false,
        };
    },

    mounted() {
        this.loadRedacoes();
    },

    methods: {
        abrirRedacao(item) {
            localStorage.setItem('id', item.id);
            this.$router.push({ name: 'verRedacoes.show' });
            this.mostrarRedacao = true;
        },

        deletarRedacao(item) {
            const token = localStorage.getItem('token');
            const id = item.id;

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            axios.delete(`${BASE_URL}/redacao/${id}/delete`)
                .then(response => {
                    console.log(response);
                    this.loadRedacoes();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        editarRedacaoProp(item) {
            localStorage.setItem('id', item.id);
            this.$router.push({ name: 'editarRedacoes.show' });
            this.mostrarEditarRedacao = true;
        },

        async editarRedacao(file, id) {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const formData = new FormData();
            formData.append('file[]', file);
            formData.append('urls[]', id);

            try {
                await axios.post(`${BASE_URL}/redacao/${id}/update`, formData);
                this.loadRedacoes();
                this.atualizarRedacoes();
            } catch (error) {
                console.log(error);
            } finally {
                this.mostrarEditarRedacao = false;
            }
        },

        loadRedacoes() {
            const token = localStorage.getItem('token');
            const aluno_id = localStorage.getItem('aluno_id');

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            axios.get(`${BASE_URL}/index/aluno/${aluno_id}`)
                .then(response => {
                    this.data = response.data.data;
                    window.scrollTo(0, 0);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        enviarRedacao() {
            const token = localStorage.getItem('token');

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            this.$refs.observer.validate().then(success => {
                if (success) {
                    const fileInput = this.$refs.fileInput;
                    const file = fileInput.files[0];
                    const formData = new FormData();
                    formData.append('file[]', file);

                    this.submitting = true;

                    axios.post(`${BASE_URL}/alunos/redacao/create`, formData)
                        .then(() => {
                            this.loadRedacoes();
                            this.atualizarRedacoes();
                            this.mostrarModal = false;
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => {
                            this.submitting = false;
                        });
                }
            });
        },

        fecharModal() {
            this.redacao = '';
            this.$emit('fecharModal');
        },

        logout() {
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = '';
            window.location.href = '/';
        },
    },
    components: {
        VisualizarRedacao,
        ValidationObserver,
        ValidationProvider,
        EditarRedacao,
    },
}


</script>

