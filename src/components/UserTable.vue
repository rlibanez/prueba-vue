<template>
    <div>
        <table class="user-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>DNI</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" @click="selectUser(user)">
                    <td>{{ user.id }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.dni }}</td>
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
            this.$router.push(`/users/${user.id}`);
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
    /* Texto blanco */
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
</style>
