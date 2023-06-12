<template>
  <div class="list-songs">

    <h1> Canciones</h1>
    <div class="buscador">
      <input type="text" v-model="searchTerm" placeholder="Buscar canciones">
      <button @click="searchSongs(searchTerm)">Buscar</button>
    </div>

    <div class="playlists">
      <h2>Playlists</h2>
      <ul>
        <li v-for="playlist in playlists" :key="playlist.id">
          <span @click="showSongs(playlist.id)" style="cursor: pointer" >{{ playlist.name }}</span>
          <button @click="deletePlaylist(playlist.id)">Borrar</button>
        </li>
      </ul>
      <div>
        <ul>
          <br>
          <li>
            <input v-model="newPlaylistName" placeholder="Nombre Playlist Nuevo" style="width: 140px;">
            <button @click="addPlaylist">Crear</button>
          </li>
          <br>
          <br>
          <li> 
              <button @click="getSongs()"> Mostrar Todas las canciones</button>
              <br/>
          </li>
        </ul>
      </div>
    </div>
    <div class="addButton">
      <button @click="toggleAddSongPopup">Subir Canciones</button>
    </div>

    <div class="modal" v-if="showAddSongPopup">
      <div class="modal-content">
        <span class="close" @click="closeAddSongPopup">&times;</span>
        <AddSong @close="closeAddSongPopup" />
      </div>
    </div>
    <br/>
    <div class="scroll">
      <div class="song-item" v-for="song in songs" :key="song.id">
        <div class="song-info">
          <div class="song-title"> {{ song.title }}</div> 
          <div class="song-artist"> {{ song.artist }}</div>
      </div>    

      <div class="song-actions">
        <button class="play-button" @click="playSong(song)">
          <i class="fas fa-play"></i>
        </button>
        <button class="btn-add-playlist" @click="showAddToPlaylistModal(song)">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      </div>
    </div>

    <audio ref="audio" controls> </audio>

    <div v-if="showAddToPlaylist" class="add-to-playlist-modal" @click.self="hideAddToPlaylistModal">
      <div class="modal-container">
        <h2>Add Song to Playlist</h2>
        <select v-model="selectedPlaylistId">
            <option v-for="playlist in playlists" :value="playlist.id">{{ playlist.name }}</option>
        </select>
          <button type="submit" @click="addToPlaylist(selectedPlaylistId)" @click.self="hideAddToPlaylistModal">Add</button>
      </div> 
    </div>
  </div>

</template>

<script>
import axios from "axios";
import AddSong from "./AddSong.vue";
import VueCookies from 'vue-cookies'


export default {
  name: "ListSongs",
  components: {
    AddSong
  },
  data() {
    return {
      selectedSong: null,
      selectedPlaylistId: null,
      showAddToPlaylist: false,
      showAddSongPopup: false,
      newPlaylistName: '',
      searchTerm: '',
      songs: [],
      playlists: [],
      songs: [],  
      audioInstance: null // instancia de Audio
    };
  },
  mounted() {
    this.getSongs();
    this.getPlaylists();
  },
  methods: {
    getSongs() {
      axios
        .get("http://127.0.0.1:5000/melomuse/api/v1/songs")
        .then((response) => {
          this.songs = response.data;
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleAddSongPopup() {
      this.showAddSongPopup = !this.showAddSongPopup;
    },
    closeAddSongPopup() {
      this.showAddSongPopup = false;
      window.location.reload();
    },
    searchSongs(search) {

    if (search === ''){
      this.getSongs();
    }else{
      axios.get(`http://127.0.0.1:5000/api/v1/search/${search}`, {
    
      })
      .then(response => {
        this.songs = response.data;
      })
      .catch(error => {
        console.log(error);
      });
      }
    },
    getPlaylists() {
      const token = localStorage.getItem('jwt');
      const userId = localStorage.getItem('userId');

      axios.get(`http://127.0.0.1:5000/melomuse/api/v1/user/${userId}/playlists`, {
        
      })
      .then((response) => {
        this.playlists = response.data.map((playlist) => {
          return { id: playlist._id, name: playlist.name };
        });
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
    showAddToPlaylistModal(song) {
      this.selectedSong = song._id;
      this.showAddToPlaylist = true;
    },
    hideAddToPlaylistModal() {
      this.showAddToPlaylist = false;
    },
    addToPlaylist(playlistId) {
     
      axios
        .put(`http://localhost:5000/melomuse/api/v1/playlists/${playlistId}/songs/${this.selectedSong}`,{

        })
        .then((response) => {
          console.log(response);
          alert("Song added to playlist!");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    async showSongs(playlistId) {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/showSongsPlaylist/${playlistId}`);
        this.songs = response.data.songs;
      } catch (error) {
        console.error(error);
        // Manejo de errores
      }
    },
    async deletePlaylist(playlistId) {
      try {
        const response = await axios.delete(`http://127.0.0.1:5000/melomuse/api/v1/playlists/${playlistId}`);
        if (response.status === 200) {
          // Actualiza la lista de playlists
          const userId = localStorage.getItem('userId');
          const playlistsResponse = await axios.get(`http://127.0.0.1:5000/melomuse/api/v1/user/${userId}/playlists`);
          this.playlists = playlistsResponse.data;  
          alert('Playlist eliminada exitosamente');
          location.reload();

        } else {
          alert('Error al eliminar la playlist');
        }
      } catch (error) {
        console.log(error);
        alert('Error al eliminar la playlist');
      }
    },
    async addPlaylist() {
      if (this.newPlaylistName === "" || this.newPlaylistName === " "){
          alert("El nombre de la Playlist Esta vacio")
          return
      }
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.post(`http://127.0.0.1:5000/melomuse/api/v1/user/${userId}/addPlaylist`, {
          name: this.newPlaylistName
        });
        // Actualiza la lista de playlists
        this.playlists = response.data;
        // Limpia el input
        this.newPlaylistName = '';
        location.reload();
      } catch (error) {
        alert('Playlist ya existe!');
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>

.playlists {
  position: fixed;
  top: 200px;
  right: 40px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.addButton {
  display: flex;
  justify-content: center;
}

.addButton button {
  padding: 10px 20px;
  font-size: 16px;
  width: 550px;
  background-color: #4287f5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 4px;
  max-width: fit-content;
  max-height: fit-content;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 30px;
  font-weight: bold;
  color: black;
}

.playlists h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.playlists ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.playlists li {
  position: relative;
  padding-right: 80px; /* Espacio para los botones */
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.playlists button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.playlists button:hover {
  background-color: #d32f2f;
}


.buscador {
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

input[type="text"] {
  padding: 8px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
}
.buscador input {
  width: 500px;
}

button {
  padding: 8px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #1db954;
  color: white;
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #1ed760;
}

.list-songs {
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
  background-color: #1db954;
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
  box-shadow: 0 0 10px 5px #1db954;
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
  background-color: #1db954;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
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

.btn-add-playlist {
  border: none;
  background-color: white;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.btn-add-playlist i::before {
  content: "\f067";
  color: #1db954;
}

.add-to-playlist-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.modal-container h2 {
  font-size: 24px;
  color: #1db954;
  margin-bottom: 20px;
}

.modal-container select {
  font-size: 16px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  background-color: #282828;
  color: #fff;
  border-radius: 5px;
}

.modal-container button {
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  background-color: #1db954;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.modal-container button:hover {
  background-color: #1ed760;
}

audio {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #282828;
  color: blue ;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 14px;
}

audio::-webkit-media-controls-panel {
  background-color: #1db954;
}

</style>