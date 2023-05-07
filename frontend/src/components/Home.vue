<template>
    <div class="home">
        <div class="headers">
            <Headers />
        </div>
        <div class="listaCanciones">
            <ListSongs />
        </div>
        <div class="addSong">
            <!-- <AddSong /> -->
        </div>
    
    </div>
    
  </template>
  
  <script>
  import AddSong from "./AddSong.vue";
  import Headers from "./Header.vue";
  import ListSongs from "./ListSongs.vue"

  export default {
    name: "Home",
    components: {
      AddSong,
      Headers,
      ListSongs
    },
  };
  </script>
  
  <style>
  

  </style>
  