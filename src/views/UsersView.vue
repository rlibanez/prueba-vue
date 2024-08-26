<template>
    <div class="container">
        <UserTable :users="users" @user-selected="handleUserSelected" @user-deleted="handleUserDeleted" />
        <UserForm v-if="selectedUser" :user="selectedUser" @save-user="handleUserSaved" />
    </div>
</template>

<script>
import UserTable from '@/components/UserTable.vue';
import UserForm from '@/components/UserForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

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
        },
        async handleUserDeleted(user) {
            const toast = useToast();
            try {
                await axios.delete(`/api/persona/${user.id}`);
                this.users = this.users.filter(u => u.id !== user.id);
                if (this.selectedUser && this.selectedUser.id === user.id) {
                    this.selectedUser = null;
                    this.$router.push('/');
                }
                toast.success(`User with id ${user.id} deleted successfully.`);
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error(`Error deleting user with id ${user.id}.`);
            }
        },
        async handleUserSaved(updatedUser) {
            const toast = useToast();
            try {
                console.log('Updated User:', updatedUser); // Añade esta línea para depuración
                const response = await axios.put(`/api/persona`, updatedUser);
                const updatedUserData = response.data;
                const index = this.users.findIndex(user => user.id === updatedUserData.id);
                if (index !== -1) {
                    this.users.splice(index, 1, {
                        id: updatedUserData.id,
                        firstName: updatedUserData.nombre,
                        lastName: updatedUserData.apellidos,
                        anno: updatedUserData.annoNacimiento
                    });
                }
                toast.success(`User with id ${updatedUserData.id} updated successfully.`);
            } catch (error) {
                console.error('Error updating user:', error);
                toast.error(`Error updating user with id ${updatedUser.id}.`);
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
