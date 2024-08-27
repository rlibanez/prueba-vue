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
                toast.success(`User ${response.data.nombre} ${response.data.apellidos} created.`);
                // Redirigir a otra vista si es necesario
                this.$router.push('/users');
            } catch (error) {
                console.error('Error creating user:', error);
                toast.error('Error creating user.');
            }
        }
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