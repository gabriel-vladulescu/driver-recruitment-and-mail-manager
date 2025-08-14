<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToastContainer from './components/alerts/ToastContainer.vue'
</script>

<template>
  <RouterView />
  <ToastContainer />
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f5f5f5;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

@media (max-width: 768px) {
  #app {
    position: static;
    height: auto;
    min-height: 100vh;
    overflow: auto;
  }
}
</style>
