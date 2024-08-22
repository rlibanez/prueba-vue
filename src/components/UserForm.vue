<template>
    <div v-if="user">
        <h2>Editar Usuario</h2>
        <form>
            <div>
                <label>ID:</label>
                <input type="text" v-model="user.id" readonly />
            </div>
            <div>
                <label>Nombre:</label>
                <input type="text" v-model="user.firstName" />
            </div>
            <div>
                <label>Apellidos:</label>
                <input type="text" v-model="user.lastName" />
            </div>
            <div>
                <label>DNI:</label>
                <input type="text" v-model="user.dni" />
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: ['user']
};
</script>