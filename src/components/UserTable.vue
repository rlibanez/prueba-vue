<template>
    <div>
        <table class="user-table">
            <thead>
                <tr>
                    <!-- <th>ID</th> -->
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Año</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" @click="selectUser(user)">
                    <!-- <td>{{ user.id }}</td> -->
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.anno }}</td>
                    <td>
                        <button @click.stop="deleteUser(user)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    props: ['users'],
    methods: {
        selectUser(user) {
            this.$emit('user-selected', user);
        },
        deleteUser(user) {
            this.$emit('user-deleted', user);
        }
    }
};
</script>

<style scoped>
.user-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    /* Ajuste del tamaño de fuente */
}

.user-table th,
.user-table td {
    padding: 12px 15px;
    text-align: left;
    color: #333;
    /* Texto oscuro */
}

.user-table th {
    background-color: #3498db;
    color: #fff;
    font-weight: bold;
}

.user-table tr {
    transition: background-color 0.3s ease;
    cursor: pointer;
}

.user-table tr:nth-child(even) {
    background-color: #f2f2f2;
}

.user-table tr:hover {
    background-color: #d1ecf1;
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
