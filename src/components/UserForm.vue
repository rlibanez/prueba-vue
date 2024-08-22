<template>
    <div v-if="user" class="user-form">
        <h2>Editar Usuario</h2>
        <form>
            <div class="form-group">
                <label>ID:</label>
                <input type="text" v-model="user.id" readonly />
            </div>
            <div class="form-group">
                <label>Nombre:</label>
                <input type="text" v-model="user.firstName" />
            </div>
            <div class="form-group">
                <label>Apellidos:</label>
                <input type="text" v-model="user.lastName" />
            </div>
            <div class="form-group">
                <label>DNI:</label>
                <input type="text" v-model="user.dni" />
            </div>
        </form>
    </div>
</template>

<style scoped>
.user-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

h2 {
    color: #3498db;
    /* Mismo color que el encabezado de la tabla */
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #3498db;
    /* Mismo color que el encabezado de la tabla */
}

.form-group input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
    color: #333;
    /* Color de texto oscuro para legibilidad */
}

.form-group input:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    /* Resaltado azul suave */
}

.form-group input[readonly] {
    background-color: #f2f2f2;
    /* Color gris claro para campos de solo lectura */
}
</style>


<script>
export default {
    props: ['user']
};
</script>