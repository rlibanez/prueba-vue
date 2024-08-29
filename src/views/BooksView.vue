<template>
    <div class="container">
        <BookTable :Books="Books" @Book-selected="handleBookSelected" @Book-deleted="handleBookDeleted" />
    </div>
</template>

<script>
import BookTable from '@/components/BookTable.vue';
import BookForm from '@/components/BookForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    components: {
        BookTable,
        BookForm
    },
    data() {
        return {
            Books: [],
            selectedBook: null
        };
    },
    async created() {
        await this.fetchBooks();
        const BookId = this.$route.params.id;
        if (BookId) {
            this.selectBookById(BookId);
        }
    },
    watch: {
        '$route.params.id': function (newId) {
            if (newId) {
                this.selectBookById(newId);
            }
        }
    },
    methods: {
        async fetchBooks() {
            try {
                const response = await axios.get('/api/libro');
                this.Books = response.data.map(libro => ({
                    id: libro.id,
                    titulo: libro.titulo,
                    isbn: libro.isbn,
                    annoPublicacion: libro.annoPublicacion
                }));
                const BookId = this.$route.params.id;
                if (BookId) {
                    this.selectBookById(BookId);
                }
            } catch (error) {
                console.error('Error fetching Books:', error);
            }
        },
        selectBookById(id) {
            const Book = this.Books.find(Book => Book.id === parseInt(id));
            if (Book) {
                this.selectedBook = Book;
            } else {
                console.error(`Book with id ${id} not found`);
            }
        },
        handleBookSelected(Book) {
            this.selectedBook = Book;
            this.$router.push(`/books/${Book.id}`);
        },
        async handleBookDeleted(Book) {
            const toast = useToast();
            try {
                await axios.delete(`/api/libro/${Book.id}`);
                this.Books = this.Books.filter(u => u.id !== Book.id);
                if (this.selectedBook && this.selectedBook.id === Book.id) {
                    this.selectedBook = null;
                    this.$router.push('/');
                }
                toast.success(`Book with id ${Book.id} deleted successfully.`);
            } catch (error) {
                console.error('Error deleting Book:', error);
                toast.error(`Error deleting Book with id ${Book.id}.`);
            }
        },
        async handleBookSaved(updatedBook) {
            const toast = useToast();
            try {
                console.log('Updated Book:', updatedBook);

                // Transformar los nombres de los parámetros
                const transformedBook = {
                    id: updatedBook.id,
                    titulo: updatedBook.titulo,
                    isbn: updatedBook.isbn,
                    annoPublicacion: updatedBook.annoPublicacion
                };

                const response = await axios.put(`/api/libro`, transformedBook);
                const updatedBookData = response.data;
                const index = this.Books.findIndex(Book => Book.id === updatedBookData.id);
                if (index !== -1) {
                    this.Books.splice(index, 1, {
                        id: libro.id,
                        titulo: libro.titulo,
                        isbn: libro.isbn,
                        annoPublicacion: libro.annoPublicacion
                    });
                }
                toast.success(`Book with id ${updatedBookData.id} updated successfully.`);
            } catch (error) {
                console.error('Error updating Book:', error);
                toast.error(`Error updating Book with id ${updatedBook.id}.`);
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
    /* min-width: 900px; */
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
