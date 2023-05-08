<template>
  <div class="list-songs">

    <h1> Lista de Canciones</h1>
    <div class="buscador">
      <input type="text" v-model="searchTerm" placeholder="Buscar canciones">
      <button @click="searchSongs">Buscar</button>
    </div>
    
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

    <div v-if="showAddToPlaylist" class="add-to-playlist-modal">
      <div class="modal-overlay" @click="hideAddToPlaylistModal"></div>
      <div class="modal-container">
        <h2>Add Song to Playlist</h2>
        <select v-model="selectedPlaylist">
          <option v-for="playlist in playlists" :value="playlist.id">{{ playlist.name }}</option>
        </select>
        <button @click="addToPlaylist">Add</button>
    </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import AddSong from "./AddSong.vue"
import VueCookies from 'vue-cookies'


export default {
  name: "ListSongs",
  data() {
    return {
      songs: [],
      playlists: [],
      selectedSong: null,
      selectedPlaylist: null,
      showAddToPlaylist: false,
      searchTerm: '',
      songs: [],
      audioInstance: null, // instancia de Audio

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
    searchSongs() {
    axios.get('http://127.0.0.1:5000/melomuse/api/v1/search', {
      params: {
        search: this.searchTerm
      }
    })
    .then(response => {
      this.songs = response.data;
    })
    .catch(error => {
      console.log(error);
    });
    },
    getPlaylists() {
      const token = localStorage.getItem('jwt');
      const userId = localStorage.getItem('userId');

      console.log(userId)

      axios.get(`http://127.0.0.1:5000/melomuse/api/v1/user/${userId}/playlists`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        this.playlists = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    playSong(song) {
      if (this.audioInstance) {
        this.audioInstance.pause();
      }
      this.selectedSong = song;
      this.$refs.audio.currentTime = 0; // Reinicia el tiempo a 0
      this.audioInstance = this.$refs.audio;
      this.audioInstance.src = `http://localhost:5000/melomuse/api/v1/songs/${song._id}/file`;
      this.audioInstance.play();
    },
    showAddToPlaylistModal(song) {
      this.selectedSong = song;
      this.showAddToPlaylist = true;
    },
    hideAddToPlaylistModal() {
      this.showAddToPlaylist = false;
    },
    addToPlaylist() {
      axios
        .put(`http://127.0.0.0.1:5000/melomuse/api/v1/playlists/${this.selectedPlaylist}/songs`, {
          songId: this.selectedSong.id,
        })
        .then(() => {
          this.hideAddToPlaylistModal();
          alert("Song added to playlist!");
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred while adding the song to the playlist.");
        });
    },
  },
};
</script>

<style scoped>

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
  width: 2px;
  background-color: #F5F5F5;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #AAA;
  border-radius: 3px;
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
  color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 14px;
}

audio::-webkit-media-controls-panel {
  background-color: #282828;
}

audio::-webkit-media-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282828;
}

audio::-webkit-media-controls-start-playback-button {
  display: none;
}

audio::-webkit-media-controls-enclosure {
  display: none;
}

audio::-webkit-media-controls-time-remaining-display,
audio::-webkit-media-controls-timeline {
  flex: 1;
}

audio::-webkit-media-controls-volume-slider-container,
audio::-webkit-media-controls-mute-button {
  display: none;
}

audio::-webkit-media-controls-fullscreen-button {
  margin-left: 20px;
}

</style>