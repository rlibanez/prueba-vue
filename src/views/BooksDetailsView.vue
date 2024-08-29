<template>
    <div class="container">
        <bookForm v-if="selectedbook" :book="selectedbook" @save-book="handlebookSaved" title="Editar Autor"
            buttonText="Actualizar" />
    </div>
</template>

<script>
import bookTable from '@/components/BookTable.vue';
import bookForm from '@/components/BookForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    components: {
        bookTable,
        bookForm
    },
    data() {
        return {
            books: [],
            selectedbook: null
        };
    },
    async created() {
        await this.fetchbooks();
        const bookId = this.$route.params.id;
        if (bookId) {
            this.selectbookById(bookId);
        }
    },
    watch: {
        '$route.params.id': function (newId) {
            if (newId) {
                this.selectbookById(newId);
            }
        }
    },
    methods: {
        async fetchbooks() {
            try {
                const response = await axios.get('/api/libro');
                this.books = response.data.map(book => ({
                    id: book.id,
                    titulo: book.titulo,
                    isbn: book.isbn,
                    annoPublicacion: book.annoPublicacion
                }));
                const bookId = this.$route.params.id;
                if (bookId) {
                    this.selectbookById(bookId);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        },
        selectbookById(id) {
            const book = this.books.find(book => book.id === parseInt(id));
            if (book) {
                this.selectedbook = book;
            } else {
                console.error(`book with id ${id} not found`);
            }
        },
        handlebookSelected(book) {
            this.selectedbook = book;
            this.$router.push(`/books/${book.id}`);
        },
        async handlebookDeleted(book) {
            const toast = useToast();
            try {
                await axios.delete(`/api/book/${book.id}`);
                this.books = this.books.filter(u => u.id !== book.id);
                if (this.selectedbook && this.selectedbook.id === book.id) {
                    this.selectedbook = null;
                    this.$router.push('/');
                }
                toast.success(`book with id ${book.id} deleted successfully.`);
            } catch (error) {
                console.error('Error deleting book:', error);
                toast.error(`Error deleting book with id ${book.id}.`);
            }
        },
        async handlebookSaved(updatedbook) {
            const toast = useToast();
            try {
                console.log('Updated book:', updatedbook);

                // Transformar los nombres de los parámetros
                const transformedbook = {
                    id: updatedbook.id,
                    nombre: updatedbook.firstName,
                    apellidos: updatedbook.lastName,
                    annoNacimiento: updatedbook.anno
                };

                const response = await axios.put(`/api/book`, transformedbook);
                const updatedbookData = response.data;
                const index = this.books.findIndex(book => book.id === updatedbookData.id);
                if (index !== -1) {
                    this.books.splice(index, 1, {
                        id: updatedbookData.id,
                        firstName: updatedbookData.nombre,
                        lastName: updatedbookData.apellidos,
                        anno: updatedbookData.annoNacimiento
                    });
                }
                toast.success(`book ${response.data.nombre} ${response.data.apellidos} updated.`);
            } catch (error) {
                console.error('Error updating book:', error);
                toast.error(`Error updating book with id ${updatedbook.id}.`);
            }
        }
    }
};
</script>

<style scoped>
.container {
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
    .container {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: auto;
    }
}
</style>
