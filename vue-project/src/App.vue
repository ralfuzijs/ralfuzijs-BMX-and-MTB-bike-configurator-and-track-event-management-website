<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HeaderComponent from '@/components/header-component.vue';
</script>

<template>
  <HeaderComponent />

  <RouterView />
</template>


<style scoped>
header {
    text-align: center;
    background-color: rgb(66, 62, 62);
    padding: 1em;
    color: white;
    border-radius: 25px; 
}

h1 {
    margin: 0;
    padding: 10px; 
    text-align: center;
    font-size: 3em;
  }

nav {
    display: flex;
    justify-content: center;
    align-items: center; 
    padding: 0;
    margin-top: 3px;
}

nav a {
    color: white;
    margin: 30px; /* space between home, about us, contact */
    text-decoration: none;
    font-size: 1.2em;
}

nav a:hover {
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    border-radius: 5px;
}
</style>
