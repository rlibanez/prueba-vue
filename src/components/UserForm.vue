<template>
    <div v-if="user" class="user-form">
        <h2>Editar Usuario</h2>
        <form @submit.prevent="submitForm">
            <!-- <div class="form-group">
                <label>ID:</label>
                <input type="text" v-model="user.id" readonly />
            </div> -->
            <div class="form-group">
                <label>Nombre:</label>
                <input type="text" v-model="user.firstName" />
            </div>
            <div class="form-group">
                <label>Apellidos:</label>
                <input type="text" v-model="user.lastName" />
            </div>
            <div class="form-group">
                <label>Año:</label>
                <input type="text" v-model="user.anno" />
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        submitForm() {
            this.$emit('save-user', { ...this.user });
        }
    }
};
</script>

<style scoped>
.user-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    font-size: 16px;
    /* Ajuste del tamaño de fuente */
}

h2 {
    color: #3498db;
    /* Color azul */
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #3498db;
    /* Color azul */
}

.form-group input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    /* Ajuste del tamaño de fuente */
    color: #333;
    /* Texto oscuro */
}

.form-group input:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    /* Resaltado azul suave */
}

.form-group input[readonly] {
    background-color: #f2f2f2;
    /* Fondo gris claro para campos de solo lectura */
}

button {
    background-color: #00ca22;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #2f8000;
}
</style>
