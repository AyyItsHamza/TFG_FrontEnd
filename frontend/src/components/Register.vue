<template>
    <div class="container">
      <form class="form" @submit.prevent="register">
        <h2>Register</h2>
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
          <button type="submit">Register</button>
        </div>
      </form>
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
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .form-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
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
  
  button {
    background-color: var(--primary-color);
    color: blue;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  button:hover {
    background-color: darken(var(--primary-color), 10%);
  }
  </style>
  