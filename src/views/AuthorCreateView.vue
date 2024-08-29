<template>
    <div class="create">
        <AuthorForm :author="newAuthor" @save-author="handleAuthorSaved" title="Crear Autor" buttonText="Crear" />
    </div>
</template>

<script>
import AuthorForm from '@/components/AuthorForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    components: {
        AuthorForm
    },
    data() {
        return {
            newAuthor: {
                nombre: '',
                apellidos: '',
                annoNacimiento: null
            }
        };
    },
    methods: {
        async handleAuthorSaved(author) {
            const toast = useToast();
            try {
                // Transformar los nombres de los parámetros
                const transformedAuthor = {
                    id: null,
                    nombre: author.firstName,
                    apellidos: author.lastName,
                    annoNacimiento: author.anno
                };

                console.log('New Author:', transformedAuthor);

                const response = await axios.post('/api/autor', transformedAuthor);
                toast.success(`Author ${response.data.nombre} ${response.data.apellidos} created.`);
                // Redirigir a otra vista si es necesario
                this.$router.push('/authors');
            } catch (error) {
                console.error('Error creating author:', error);
                toast.error('Error creating author.');
            }
        }
    }
};
</script>

<style scoped>
.create {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    gap: 30px;
    padding: 20px;
    box-sizing: border-box;
    min-width: 900px;
}

@media (max-width: 768px) {
    .create {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: auto;
    }
}
</style>