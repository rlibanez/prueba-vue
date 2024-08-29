<template>
    <div>
        <table class="Book-table">
            <thead>
                <tr>
                    <!-- <th>ID</th> -->
                    <th>Titulo</th>
                    <th>ISBN</th>
                    <th>Año</th>
                    <th class="rightal">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="Book in Books" :key="Book.id" @click="selectBook(Book)">
                    <!-- <td>{{ Book.id }}</td> -->
                    <td>{{ Book.titulo }}</td>
                    <td>{{ Book.isbn }}</td>
                    <td>{{ Book.annoPublicacion }}</td>
                    <td class="rightal">
                        <button class="editbutton">Editar</button>
                        <button @click.stop="confirmDelete(Book)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ['Books'],
    methods: {
        selectBook(Book) {
            this.$emit('Book-selected', Book);
        },
        deleteBook(Book) {
            this.$emit('Book-deleted', Book);
        },
        confirmDelete(Book) {
            if (confirm('Seguro que quieres eliminar este libro?')) {
                this.deleteBook(Book);
            }
        }
    }
};
</script>

<style scoped>
.Book-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    /* Ajuste del tamaño de fuente */
}

.Book-table th,
.Book-table td {
    padding: 12px 15px;
    text-align: justify;
    color: #333;
    /* Texto oscuro */
}

.editbutton{
    margin-right: 1em;
    color: black;
    background-color: #a3e179;
}

.editbutton:hover{
    background-color: #7cd660;
}

.Book-table th {
    background-color: #3498db;
    color: #fff;
    font-weight: bold;
}

.Book-table tr {
    transition: background-color 0.3s ease;
    cursor: pointer;
}

.Book-table tr:nth-child(even) {
    background-color: #f2f2f2;
}

.Book-table tr:hover {
    background-color: #d1ecf1;
}

.rightal {
    text-align: right;
    display: flex;
    justify-content: flex-end;
}

button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #c0392b;
}
</style>
