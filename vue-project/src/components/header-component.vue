<script setup>
import { RouterView } from 'vue-router';
import { useDarkMode } from '../composables/useDarkMode';

const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<template>
  <main>
    <header>

        <!-- Dark mode Button -->
        <button @click="toggleDarkMode"> 
            <img src="/images/day-and-night.png" alt="Dark Mode Toggle" />
        </button>
        <!-- Dark mode Button -->

        <h1>BMX/MTB</h1>

        <nav>
            <RouterLink to="/"><i class="fas fa-home"></i> Home</RouterLink>
            <RouterLink to="/about"><i class="fas fa-info-circle"></i> About Me</RouterLink>
            <RouterLink to="/contact"><i class="fas fa-envelope"></i> Contact</RouterLink>
            <div class="dropdown">
                <a href="#"><i class="fas fa-ellipsis-h"></i> More</a>
                <div class="dropdown-content">
                    <a href="#">Nothing1</a>
                    <a href="#">Nothing2</a>
                    <a href="#">Nothing3</a>
                </div>
            </div>
        </nav>
    </header>
  </main>
</template>

<style>
body {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
    background-color: white;
}

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

/* Footer--------------------------------------------- */
footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 20px 0;
    position: relative;
    width: 100%;
    height: 100px;
    background-size: cover;
    
}

footer a {
    color: #00aced;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s;
}

footer a:hover {
    color: #41d1fd;
}
/* Footer--------------------------------------------------------------------- */

/* changes the dark/light modes ---------------------------------------------- */
button {
    padding: 8px 10px;
    position: absolute; 
    right: 40px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.dark-mode button {
    color: white;
}

.dark-mode {
    background-color: rgb(66, 62, 62);
    color: white;
    /*transition: background-color 0.5s;*/
}

.dark-mode header {
    background-color: white;
    color: black;
    /*transition: background-color 0.5s;*/
}

.dark-mode nav a {
    color: black;
    /*transition: color 0.5s;*/
}

.dark-mode div h2 {
    color: rgb(187, 24, 24);
    /*transition: color 0.5s;*/
}

.dark-mode .card1 img, .dark-mode .card2 img, .dark-mode .card3 img {
    opacity: 1;
}

.dark-mode .card1 img:hover, .dark-mode .card2 img:hover, .dark-mode .card3 img:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 60px red;
}

.dark-mode footer {
    opacity: 0.8;
}

.dark-mode .dropdown-content {
    background-color: white;
}
/* changes the dark/light modes ---------------------------------------------- */



/* Dropdown Menu ------------------------------------------------------------- */
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: rgb(66, 62, 62);
    min-width: 160px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1000; /* Increased from 1 to 1000 to appear above the map */
    border-radius: 25px;
}

.dropdown-content a {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown:hover .dropdown-content {
    display: block;
}
/* Dropdown Menu ------------------------------------------------------------- */

</style>