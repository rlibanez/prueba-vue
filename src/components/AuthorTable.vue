<template>
    <div>
        <table class="author-table">
            <thead>
                <tr>
                    <!-- <th>ID</th> -->
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Año</th>
                    <th class="rightal">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="author in authors" :key="author.id" @click="selectAuthor(author)">
                    <!-- <td>{{ author.id }}</td> -->
                    <td>{{ author.firstName }}</td>
                    <td>{{ author.lastName }}</td>
                    <td>{{ author.anno }}</td>
                    <td class="rightal">
                        <button class="editbutton">Editar</button>
                        <button @click.stop="confirmDelete(author)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ['authors'],
    methods: {
        selectAuthor(author) {
            this.$emit('author-selected', author);
        },
        deleteAuthor(author) {
            this.$emit('author-deleted', author);
        },
        confirmDelete(author) {
            if (confirm('Seguro que quieres eliminar este usuario?')) {
                this.deleteAuthor(author);
            }
        }
    }
};
</script>

<style scoped>
.author-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    /* Ajuste del tamaño de fuente */
}

.author-table th,
.author-table td {
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

.author-table th {
    background-color: #3498db;
    color: #fff;
    font-weight: bold;
}

.author-table tr {
    transition: background-color 0.3s ease;
    cursor: pointer;
}

.author-table tr:nth-child(even) {
    background-color: #f2f2f2;
}

.author-table tr:hover {
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
