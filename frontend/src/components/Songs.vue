<template>
    <header>
        <div class="logo">Melo Muse</div>
    </header>
    <br/>
    <br/>
    <br/>
    <h1> Lista Canciones </h1>
    <div class="list-songs">
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
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div class="text">
          <p> <b> Como usuario no registrado solo ves las primeras 5 canciones. <br/> Si quieres escuchar mas Canciones <button class="btn-submit"> <router-link class="router-text" to="/register"> REGISTRATE </router-link> </button></b></p>
        </div>
        <audio ref="audio" controls> </audio>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListSongs",
  data() {
    return {
      selectedSong: null,
      songs: [],
      audioInstance: null // instancia de Audio
    };
  },
  mounted() {
    this.getSongs();
  },
  methods: {
    getSongs() {
      axios
        .get("http://127.0.0.1:5000/melomuse/api/v1/songs")
        .then((response) => {
          this.songs = response.data.slice(0,2);
          console.log(response.data)
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
    }
  },
};
</script>

<style scoped>

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

.btn-submit{
  width: 150px;
}

.text{
  box-shadow: 0 0 10px 5px #1db954;
  text-align: center;
  padding: 10px;
  border-radius: 2%;
  text-decoration: none;
}

.router-text{
  text-decoration: none;
}
.scroll::-webkit-scrollbar {
  width: 10px;
  background-color: black;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #1db954;
  border-radius: 10px
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
  border: 2px solid white;
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
  color: blue ;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 14px;
}

audio::-webkit-media-controls-panel {
  background-color: #1db954;
}

</style>