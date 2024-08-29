<template>
    <div class="container">
        <AuthorForm v-if="selectedAuthor" :author="selectedAuthor" @save-author="handleAuthorSaved" title="Editar Autor"
            buttonText="Actualizar" />
    </div>
</template>

<script>
import AuthorTable from '@/components/AuthorTable.vue';
import AuthorForm from '@/components/AuthorForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    components: {
        AuthorTable,
        AuthorForm
    },
    data() {
        return {
            authors: [],
            selectedAuthor: null
        };
    },
    async created() {
        await this.fetchAuthors();
        const authorId = this.$route.params.id;
        if (authorId) {
            this.selectAuthorById(authorId);
        }
    },
    watch: {
        '$route.params.id': function (newId) {
            if (newId) {
                this.selectAuthorById(newId);
            }
        }
    },
    methods: {
        async fetchAuthors() {
            try {
                const response = await axios.get('/api/autor');
                this.authors = response.data.map(persona => ({
                    id: persona.id,
                    firstName: persona.nombre,
                    lastName: persona.apellidos,
                    anno: persona.annoNacimiento
                }));
                const authorId = this.$route.params.id;
                if (authorId) {
                    this.selectAuthorById(authorId);
                }
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        },
        selectAuthorById(id) {
            const author = this.authors.find(author => author.id === parseInt(id));
            if (author) {
                this.selectedAuthor = author;
            } else {
                console.error(`Author with id ${id} not found`);
            }
        },
        handleAuthorSelected(author) {
            this.selectedAuthor = author;
            this.$router.push(`/authors/${author.id}`);
        },
        async handleAuthorDeleted(author) {
            const toast = useToast();
            try {
                await axios.delete(`/api/persona/${author.id}`);
                this.authors = this.authors.filter(u => u.id !== author.id);
                if (this.selectedAuthor && this.selectedAuthor.id === author.id) {
                    this.selectedAuthor = null;
                    this.$router.push('/');
                }
                toast.success(`Author with id ${author.id} deleted successfully.`);
            } catch (error) {
                console.error('Error deleting author:', error);
                toast.error(`Error deleting author with id ${author.id}.`);
            }
        },
        async handleAuthorSaved(updatedAuthor) {
            const toast = useToast();
            try {
                console.log('Updated Author:', updatedAuthor);

                // Transformar los nombres de los parámetros
                const transformedAuthor = {
                    id: updatedAuthor.id,
                    nombre: updatedAuthor.firstName,
                    apellidos: updatedAuthor.lastName,
                    annoNacimiento: updatedAuthor.anno
                };

                const response = await axios.put(`/api/persona`, transformedAuthor);
                const updatedAuthorData = response.data;
                const index = this.authors.findIndex(author => author.id === updatedAuthorData.id);
                if (index !== -1) {
                    this.authors.splice(index, 1, {
                        id: updatedAuthorData.id,
                        firstName: updatedAuthorData.nombre,
                        lastName: updatedAuthorData.apellidos,
                        anno: updatedAuthorData.annoNacimiento
                    });
                }
                toast.success(`Author ${response.data.nombre} ${response.data.apellidos} updated.`);
            } catch (error) {
                console.error('Error updating author:', error);
                toast.error(`Error updating author with id ${updatedAuthor.id}.`);
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
