<template>
  <div class="list-songs">
    <h1> Lista de Canciones</h1>
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
    <audio ref="audio" :src="selectedSong ? selectedSong.audio_url : null" controls></audio>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListSongs",
  data() {
    return {
      songs: [],
      playlists: [],
      selectedSong: null,
      selectedPlaylist: null,
      showAddToPlaylist: false,
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
    getPlaylists() {
      axios
        .get("http://127.0.0.1:5000/melomuse/api/v1/playlists")
        .then((response) => {
          this.playlists = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    playSong(song) {
      // Lógica para reproducir la canción seleccionada
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
.list-songs {
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
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

.play-button,
.btn-add-playlist {
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 10px;
}

.play-button i,
.btn-add-playlist i {
  font-size: 24px;
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

</style>