<template>
    <div class="container">
        <UserTable :users="users" @user-selected="handleUserSelected" />
        <UserForm v-if="selectedUser" :user="selectedUser" />
    </div>
</template>

<script>
import UserTable from '@/components/UserTable.vue';
import UserForm from '@/components/UserForm.vue';
import axios from 'axios';

export default {
    components: {
        UserTable,
        UserForm
    },
    data() {
        return {
            users: [],
            selectedUser: null
        };
    },
    async created() {
        await this.fetchUsers();
        const userId = this.$route.params.id;
        if (userId) {
            this.selectUserById(userId);
        }
    },
    watch: {
        '$route.params.id': function (newId) {
            if (newId) {
                this.selectUserById(newId);
            }
        }
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('/api/persona');
                this.users = response.data.map(persona => ({
                    id: persona.id,
                    firstName: persona.nombre,
                    lastName: persona.apellidos,
                    anno: persona.annoNacimiento
                }));
                const userId = this.$route.params.id;
                if (userId) {
                    this.selectUserById(userId);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        selectUserById(id) {
            const user = this.users.find(user => user.id === parseInt(id));
            if (user) {
                this.selectedUser = user;
            } else {
                console.error(`User with id ${id} not found`);
            }
        },
        handleUserSelected(user) {
            this.selectedUser = user;
            this.$router.push(`/users/${user.id}`);
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
