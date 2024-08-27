<template>
    <div class="create">
        <UserForm :user="newUser" @save-user="handleUserSaved" title="Crear Usuario" buttonText="Crear" />
    </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    components: {
        UserForm
    },
    data() {
        return {
            newUser: {
                nombre: '',
                apellidos: '',
                annoNacimiento: null
            }
        };
    },
    methods: {
        async handleUserSaved(user) {
            const toast = useToast();
            try {
                // Transformar los nombres de los parámetros
                const transformedUser = {
                    id: null,
                    nombre: user.firstName,
                    apellidos: user.lastName,
                    annoNacimiento: user.anno
                };

                console.log('New User:', transformedUser);

                const response = await axios.post('/api/persona', transformedUser);
                toast.success(`User ${response.data.nombre} created successfully.`);
                // Redirigir a otra vista si es necesario
                this.$router.push('/users');
            } catch (error) {
                console.error('Error creating user:', error);
                toast.error('Error creating user.');
            }
        }


        // async handleUserSaved(updatedUser) {
        //     const toast = useToast();
        //     try {
        //         console.log('Updated User:', updatedUser);

        //         // Transformar los nombres de los parámetros
        //         const transformedUser = {
        //             id: updatedUser.id,
        //             nombre: updatedUser.firstName,
        //             apellidos: updatedUser.lastName,
        //             annoNacimiento: updatedUser.anno
        //         };

        //         const response = await axios.put(`/api/persona`, transformedUser);
        //         const updatedUserData = response.data;
        //         const index = this.users.findIndex(user => user.id === updatedUserData.id);
        //         if (index !== -1) {
        //             this.users.splice(index, 1, {
        //                 id: updatedUserData.id,
        //                 firstName: updatedUserData.nombre,
        //                 lastName: updatedUserData.apellidos,
        //                 anno: updatedUserData.annoNacimiento
        //             });
        //         }
        //         toast.success(`User with id ${updatedUserData.id} updated successfully.`);
        //     } catch (error) {
        //         console.error('Error updating user:', error);
        //         toast.error(`Error updating user with id ${updatedUser.id}.`);
        //     }
        // }
    }
};
</script>

<style scoped>
.create {
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
    .create {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: auto;
    }
}
</style>