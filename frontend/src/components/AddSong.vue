<template>
    <div class="add-song-container">
      <h1 class="add-song-header">Agregar canción</h1>
      <form @submit.prevent="addSong" class="add-song-form">
        <div class="form-group">
          <label for="title" class="form-label">Título:</label>
          <input type="text" id="title" v-model="title" class="form-input">
        </div>
        <div class="form-group">
          <label for="artist" class="form-label">Artista:</label>
          <input type="text" id="artist" v-model="artist" class="form-input">
        </div>
        <div class="form-group">
          <label for="file_path" class="form-label">Archivo:</label>
          <input type="file" id="file_path" v-on:change="setFile" class="form-input">
        </div>
        <button type="submit" class="btn-submit">Agregar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        artist: '',
        file: null,
      }
    },
    methods: {
      async addSong() {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('artist', this.artist);
        formData.append('file_path', this.file);
  
        try {
          const response = await axios.post('http://127.0.0.1:5000/melomuse/api/v1/add_song', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response);
          // Mostrar un mensaje de éxito al usuario
        } catch (error) {
          console.log(error);
          // Mostrar un mensaje de error al usuario
        }
      },
      setFile(event) {
        this.file = event.target.files[0];
      },
    }
  }
  </script>
  <style>
  .add-song-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f1f1f1;
  }

  .add-song-header {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .add-song-form {
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
  }

  .btn-submit {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #1db954;
    color: #fff;
    font-size: 1.2rem;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
