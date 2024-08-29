<template>
    <div class="create">
        <bookForm :book="newbook" @save-book="handlebookSaved" title="Crear Libro" buttonText="Crear" />
    </div>
</template>

<script>
import bookForm from '@/components/BookForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    components: {
        bookForm
    },
    data() {
        return {
            newbook: {
                titulo: '',
                isbn: '',
                annoPublicacion: null
            }
        };
    },
    methods: {
        async handlebookSaved(book) {
            const toast = useToast();
            try {
                // Transformar los nombres de los parámetros
                const transformedbook = {
                    id: null,
                    titulo: book.titulo,
                    isbn: book.isbn,
                    annoPublicacion: book.annoPublicacion
                };

                console.log('New book:', transformedbook);

                const response = await axios.post('/api/autor', transformedbook);
                toast.success(`book ${response.data.nombre} ${response.data.apellidos} created.`);
                // Redirigir a otra vista si es necesario
                this.$router.push('/books');
            } catch (error) {
                console.error('Error creating book:', error);
                toast.error('Error creating book.');
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
    /* min-width: 900px; */
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