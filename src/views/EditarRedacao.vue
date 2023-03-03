<template>
    <div
        class="flex overflow-x-hidden overflow-y-auto fixed top-40 left-0 right-0 md:inset-0 z-50 justify-center items-center">
        <div class=" relative  w-screen max-w-xl px-4 h-full md:h-auto">
            <div class=" bg-gray-700 rounded-lg shadow relative h-2/4">
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
                    <button @click.prevent="editarRedacao"
                        class="bg-purple-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Salvar</button>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    data() {
        return {
        }
    },
    methods: {
        editarRedacao() {
            const redacao_id = localStorage.getItem('id');
            this.$emit("editar", this.$refs.fileInput.files[0], redacao_id)
        }
    },
    components: {
        ValidationObserver,
        ValidationProvider,
    },
}
</script>