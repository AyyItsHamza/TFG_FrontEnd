<template>
  <div class="add-song-container">
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
        <input type="file" name="audio" id="file_path" v-on:change="setFile" class="form-input">
      </div>
      <button type="submit" class="btn-submit" :disabled="uploading">Subir</button>
      <div v-if="uploading" class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
      <div v-if="success" class="upload-success">Canción subida exitosamente.</div>
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
      uploading: false,
      progress: 0,
      success: false,
    }
  },
  methods: {
    async addSong() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('artist', this.artist);
      formData.append('file_path', this.file);

      try {
        this.uploading = true;

        const response = await axios.post('http://127.0.0.1:5000/melomuse/api/v1/add_song', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            this.progress = progress;
          }
        });

        console.log(response);
        this.uploading = false;
        this.success = true;
      } catch (error) {
        console.log(error);
        this.uploading = false;
        // Mostrar un mensaje de error al usuario
      }
    },
    setFile(event) {
      this.file = event.target.files[0];
    },
  }
}
</script>

<style scoped>

.progress-bar {
  margin-top: 10px;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #4287f5;
  transition: width 0.3s;
}

.upload-success {
  margin-top: 10px;
  color: #4287f5;
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
  border: 2px bold;
  background-color: #1db954;
  color: black;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>
