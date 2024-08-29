<template>
    <div v-if="book" class="Book-form">
        <h2>{{ title }}</h2>
        <form @submit.prevent="submitForm">
            <!-- <div class="form-group">
                <label>ID:</label>
                <input type="text" v-model="Book.id" readonly />
            </div> -->
            <div class="form-group">
                <label>Titulo:</label>
                <input id="nombre" type="text" v-model="book.titulo" />
            </div>
            <div class="form-group">
                <label>ISBN:</label>
                <input id="apellidos" type="text" v-model="book.isbn" />
            </div>
            <div class="form-group">
                <label>Año:</label>
                <input id="anno" type="text" v-model="book.annoPublicacion" />
            </div>
            <button type="submit">{{ buttonText }}</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        book: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            default: 'Editar Libro'
        },
        buttonText: {
            type: String,
            default: 'Actualizar'
        }
    },
    methods: {
        submitForm() {
            console.log('Datos del formulario:', this.book);
            this.$emit('save-Book', { ...this.book });
        }
    }
};
</script>

<style scoped>
.Book-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    font-size: 16px;
}

h2 {
    color: #3498db;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #3498db;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    color: #333;
}

.form-group input:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.form-group input[readonly] {
    background-color: #f2f2f2;
}

button {
    background-color: #00ca22;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #2f8000;
}
</style>
