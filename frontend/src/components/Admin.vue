<template>
  <div >
    <div class="login-container" v-if="!isLoggedIn">
    <div class="login-form">
      <img class="logo-img" src="../assets/LogoMeloMuse.png" alt="Logo">
      <h2 class="login-header">Login Administrador</h2>
      <form>
        <div class="form-group">
          <label for="username" class="form-label"><b>Username:</b></label>
          <input type="text" id="username" v-model="username" class="form-input">
        </div>
        <div class="form-group">
          <label for="password" class="form-label"><b>Password:</b></label>
          <input type="password" id="password" v-model="password" class="form-input">
        </div>
        <button @click="login" class="btn-submit">Iniciar sesión</button>
      </form>
    </div>
  </div>
    <div v-else>
      <header>
        <div class="logo">Melo Muse</div>
        <b><p> Admin </p></b>
      </header>
      <br />
      <br />
      <br />
      <h1>Lista Canciones</h1>
      <div class="list-songs">
        <div class="scroll">
          <div class="song-item" v-for="song in songs" :key="song.id">
            <div class="song-info">
              <div class="song-title">{{ song.title }}</div>
              <div class="song-artist">{{ song.artist }}</div>
            </div>
    
            <div class="song-actions">
              <button class="play-button" @click="playSong(song)">
                <i class="fas fa-play"></i>
              </button>
              <button class="delete-button" @click="deleteSong(song._id)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <audio ref="audio" controls></audio>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListSongs",
  data() {
    return {
      isLoggedIn: false,
      username: '',
      password: '',
      selectedSong: null,
      songs: [],
      audioInstance: null // instancia de Audio
    };
  },
  mounted() {
    // this.getSongs();
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'admin') {
        this.isLoggedIn = true;
        this.getSongs();
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    },
    getSongs() {
      axios
        .get("http://127.0.0.1:5000/melomuse/api/v1/songs")
        .then((response) => {
          this.songs = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    playSong(song) {
      if (this.audioInstance) {
        this.audioInstance.pause();
      }
      this.selectedSong = song._id;
      this.$refs.audio.currentTime = 0; // Reinicia el tiempo a 0
      this.audioInstance = this.$refs.audio;
      this.audioInstance.src = `http://localhost:5000/melomuse/api/v1/songs/${song._id}/file`;
      this.audioInstance.play();
    },
    deleteSong(songId) {
      const userId = "Hamza"; // Cambia esto según tu lógica de autenticación
      axios
        .post("http://127.0.0.1:5000/melomuse/api/v1/delete_song", {
          userId,
          songId
        })
        .then((response) => {
          console.log(response.data);
          this.getSongs(); // Vuelve a obtener las canciones después de eliminar una
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
/* Estilos CSS existentes */
:root {
  --mainColor: hsl(240, 100%, 50%);
  --altColor: hsl(240, 100%, 70%);

  --deleteMainColor: hsl(0,  100%, 50%);
  --deleteAltColor: hsl(0,  100%, 65%);
}
.fa, .fab, .fad, .fal, .far, .fas {
  color: white;
}

.delete-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--deleteAltColor);
  background-color: var(--deleteMainColor);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);
  transition: all 0.3s;
}

.delete-button:hover{
  transform: scale(1.25);
}

.delete-button i::before {
  content: "\f1f8";
}

.list-songs {
  --deleteMainColor: hsl(0,  100%, 50%);
  --deleteAltColor: hsl(0,  100%, 90%);

  --shadow: rgb(88, 88, 243);

  --mainColor: hsl(240, 100%, 50%);
  --altColor: hsl(240, 100%, 90%);
  
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  max-height: auto;
}
.scroll {
  overflow-y: scroll;
  padding: 30px;
  max-height: auto;

  max-height: calc(80vh - 200px); /* ajusta la altura máxima según tus necesidades */
}

.scroll::-webkit-scrollbar {
  width: 10px;
  background-color: black;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: var(--mainColor);
  border-radius: 10px;
}

.scroll::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

.scroll::-webkit-scrollbar-track {
  background-color: #F5F5F5;
}

h1 {
  font-size: 36px;
  color: #1db954;
  text-align: center;
  margin-bottom: 40px;
}

.song-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #282828;
  transform: scale(1);
  transition: all 0.3s;
}

.song-item:hover{
  box-shadow: 0 0 10px 5px var(--shadow);
  transform: scale(1.02);
}

.song-title {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.song-artist {
  font-size: 16px;
  color: #b3b3b3;
}

.play-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--mainColor);
  cursor: pointer;
  display: flex;
  border: 2px solid var(--altColor);
  justify-content: center;
  align-items: center;
  transform: scale(1);
  transition: all 0.3s;
}

.play-button:hover{
  transform: scale(1.25);
}
.song-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* Espacio entre los botones */
}

.play-button i::before {
  content: "\f04b";
}

audio {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #282828;
  color: var(--mainColor) ;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 14px;
}

audio::-webkit-media-controls-panel {
  background-color: lightblue;
}
/* Estilos CSS existentes */
</style>
