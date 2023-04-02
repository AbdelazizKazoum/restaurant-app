<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: whitesmoke;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 4px rgb(170, 171, 170);
  border-radius: 10px;
}
</style>
