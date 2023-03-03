<template>
    <div
        class="flex overflow-x-hidden overflow-y-auto fixed top-40 left-0 right-0 md:inset-0 z-50 justify-center items-center">
        <div class=" relative  w-screen max-w-xl px-4 h-full md:h-auto">
            <div class=" bg-gray-700 rounded-lg shadow relative h-2/4">
                <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                        Redação
                    </h3>
                    <button type="button" @click="fecharModal"
                        class="text-gray-400 bg-transparent hover:bg-violet-800 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center ">
                        <svg class=" w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div class="p-4 space-y-6 h-2/4">
                    <div v-if="isPdf(redacao)">
                        <iframe :src="redacao" width="100%" height="600px"></iframe>
                    </div>
                    <div v-else-if="isImage(redacao)">
                        <img :src="redacao" alt="Imagem da Redacao">
                    </div>
                    <div v-else>
                        <h1>Redação não encontrada.</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

const BASE_URL = 'https://desafio.pontue.com.br';

export default {
    data() {
        return {
            redacao: '',
        }
    },

    mounted() {
        const redacao_id = localStorage.getItem('id');

        var token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.get(`${BASE_URL}/redacao/${redacao_id}`)
            .then(response => {
                this.redacao = response.data["data"]["urls"][0]["url"];
            })
            .catch(error => {
                console.log(error);
            })
    },

    methods: {
        isPdf(redacao) {
            return redacao.endsWith(".pdf");
        },
        isImage(redacao) {
            return /\.(jpe?g|png|gif|bmp)$/i.test(redacao);
        },
        fecharModal() {
            this.redacao = '';
            this.$emit('fecharModal');
        }
    }
}
</script>