<template>
    <div class="container">
        <UserTable :users="users" />
        <UserForm :user="selectedUser" />
    </div>
</template>

<script>
import UserTable from '@/components/UserTable.vue';
import UserForm from '@/components/UserForm.vue';

export default {
    components: {
        UserTable,
        UserForm
    },
    data() {
        return {
            users: [
                { id: 1, firstName: 'Juan', lastName: 'Pérez', anno: '12345678A' },
                { id: 2, firstName: 'María', lastName: 'García', anno: '23456789Z' },
                { id: 3, firstName: 'Pepito', lastName: 'López', anno: '32345678N' },
                { id: 4, firstName: 'Ana', lastName: 'González', anno: '43456789S' },
                { id: 5, firstName: 'Cinco', lastName: 'Pérez', anno: '52345678A' },
                { id: 6, firstName: 'Seis', lastName: 'García', anno: '63456789Z' },
                { id: 7, firstName: 'Siete', lastName: 'López', anno: '72345678N' },
                { id: 8, firstName: 'Ocho', lastName: 'González', anno: '88456789S' },
                { id: 9, firstName: 'Nueve', lastName: 'García', anno: '93456789Z' },
                { id: 10, firstName: 'Diez', lastName: 'López', anno: '10345678N' },
                { id: 11, firstName: 'Once', lastName: 'González', anno: '11456789S' },
            ],
            selectedUser: null, // Inicializamos selectedUser cuando usemos watch, no con computed
        };
    },
    // computed: { // se podría hacer el watch de abajo
    //     selectedUser() {
    //         const userId = this.$route.params.id;
    //         return this.users.find(user => user.id === parseInt(userId));
    //     }
    // },
    watch: { // se podría hacer el computed de arriba
        '$route.params.id': {
            immediate: true, // Ejecutar inmediatamente al montar el componente
            handler(newId) {
                this.selectedUser = this.users.find(user => user.id === parseInt(newId));
            }
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    /* Centra horizontalmente el contenido */
    align-items: flex-start;
    /* Alinea el contenido en la parte superior */
    height: 100vh;
    /* Ocupa toda la altura de la ventana */
    gap: 30px;
    /* Espacio entre la tabla y el formulario */
    padding: 20px;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        justify-content: flex-start;
        /* Alinea al inicio en pantallas pequeñas */
        align-items: center;
        /* Centra horizontalmente en pantallas pequeñas */
        height: auto;
        /* Permite que el contenido crezca en altura */
    }
}
</style>
