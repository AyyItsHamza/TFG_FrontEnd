<template>
    <div class="login-container">
      <h1 class="login-header">Login</h1>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">Username:</label>
          <input type="text" id="username" v-model="username" class="form-input">        
          <label for="password" class="form-label">Password:</label>
          <input type="password" id="password" v-model="password" class="form-input">
        </div>
        <button type="submit" class="btn-submit">Login</button>
        <p>¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link></p>
      </form>
      
    </div>
  </template>
  
<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f1f1f1;
}

.login-header {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.form-input {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem; /* Agregar margen inferior */
}

.btn-submit {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #0077ff;
  color: darkblue;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://127.0.0.1:5000/melomuse/api/v1/login', {
            username: this.username,
            password: this.password,
          });
          
          // Si la respuesta es exitosa, podemos redirigir al usuario a otra página
            this.$router.push('/home');
        } catch (error) {
          console.log(error);
          // Mostrar un mensaje de error al usuario
        }
      }
    }
  }
  </script>
  