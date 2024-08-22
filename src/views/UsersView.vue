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
                { id: 1, firstName: 'Juan', lastName: 'Pérez', dni: '12345678' },
                { id: 2, firstName: 'María', lastName: 'García', dni: '23456789' },
                // Otros usuarios...
            ]
        };
    },
    computed: {
        selectedUser() {
            const userId = this.$route.params.id;
            return this.users.find(user => user.id === parseInt(userId));
        }
    }
};
</script>

<style>
.container {
    display: flex;
}
</style>