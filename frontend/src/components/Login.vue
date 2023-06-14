<template>
    <div class="login-container">
      <form @submit.prevent="login" class="login-form">
        <img class="logo-img" src="../assets/LogoMeloMuse.png"/>
        <h1 class="login-header">Iniciar Sesión</h1>
        <div class="form-group">
          <label for="username" class="form-label"><b>Usuario:</b></label>
          <input type="text" id="username" v-model="username" class="form-input">        
          <label for="password" class="form-label"><b>Contraseña:</b></label>
          <input type="password" id="password" v-model="password" class="form-input">
        </div>
        <button type="submit" class="btn-submit">Login</button>
        <p>¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link></p>
        <p>Esuchar Canciones sin Registrarse | <router-link to="/songs">Escuchar</router-link></p>
      </form>
    </div>
  </template>

<style >
body {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f1f1f1;
}

.logo-img{
  width: 100px;
  height: 100px;
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

button:hover {
  background-position: 400px 0;
}

.btn-submit {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid;
  width: 250px;
  color: black;
  background: linear-gradient(to right, white, white 50%, lime 50%);
  background-size: 800px;
  background-position: 0 0;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all .5s;
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
        
        // Si la respuesta es exitosa, podemos guardar los datos en localStorage y redirigir al usuario a otra página
        localStorage.setItem('access_token', response.data.jtw);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('userId', response.data.userId);

        console.log(localStorage.getItem('access_token'));
        console.log(localStorage.getItem('username'));
        console.log(localStorage.getItem('userId'));

        this.$router.push('/home');
      } catch (error) {
        console.log(error);
        // Mostrar un mensaje de error al usuario
      }
    }
  }
}
</script>

  