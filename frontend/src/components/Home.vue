<template>
  <div class="home">
    <div class="headers">
      <Headers />
    </div>
    <br/>
    <br/>
    <div class="listaCanciones">
      <ListSongs />
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

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  overflow: hidden;
}

</style>
