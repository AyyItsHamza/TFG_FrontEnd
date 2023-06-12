<template>
    <div class="container">
      <form class="form" @submit.prevent="register">
        <img class="logo-img" src="../assets/LogoMeloMuse.png"/>
        <h1 >Register</h1>
        <div class="form-control">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-control">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-control">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-control">
          <button type="submit" class="btn-submit">Register</button>
        </div>
      </form>
      <p>¿Ya tienes cuenta? <router-link to="/login">Login</router-link></p>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        name: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://127.0.0.1:5000/melomuse/api/v1/register', {
            username: this.username,
            name: this.name,
            password: this.password,
          });
          console.log(response.data);
          alert("Se ha registrado correctamente el usuario")
        } catch (error) {
          alert("El nombre de Usuario ya existe")
          console.error(error);
        }
      },
    },
  };
  </script>
  
<style scoped>
  
body {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f1f1f1;
}

.form {
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
  
.form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}

.logo-img{
  width: 100px;
  height: 100px;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}
  
button:hover {
  background-position: 400px 0;
}

.btn-submit {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid;
  width: 400px;
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
  