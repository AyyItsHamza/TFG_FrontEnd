<template>
  <div class="home">
    <div class="headers">
      <Headers />
    </div>

    <div class="addPlaylist">
      
      <!-- AddSong /> -->
    </div>

    <div class="listaCanciones">
      <ListSongs />
    </div>

    <div class="addSong">
      <!-- AddSong /> -->
    </div>
  </div>
</template>

<script>
import AddSong from "./AddSong.vue";
import Headers from "./Header.vue";
import ListSongs from "./ListSongs.vue";

export default {
  name: "Home",
  components: {
    AddSong,
    Headers,
    ListSongs
  },
  data() {
    return {
      showAddSongPopup: false,
    };
  },
  methods: {
    toggleAddSongPopup() {
      this.showAddSongPopup = !this.showAddSongPopup;
    },
  },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: row;
  height: 100vh;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.listaCanciones {
  margin-top: 20px;
  flex-grow: 2;
  flex-basis: 60%;
  width: 100%;
}

.add_song {
  flex-grow: 1;
  flex-basis: 20%;
}

.addPlaylist {
  flex-grow: 1;
  flex-basis: 20%;
}

</style>
