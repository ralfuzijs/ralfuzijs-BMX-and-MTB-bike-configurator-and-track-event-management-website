<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <div class="container">
        <div class="card1">
            <RouterLink to="/bike-size-calculator"> 
                <img src="/images/calculator.png" alt="Bike Size Calculator Image" />
            </RouterLink>
            <div class="bike-size-cal">
                <h2 class="card-title1">Bike Size Calculator</h2>
            </div>
        </div>

        <div class="card2">
            <RouterLink to="/bike-configurator"> 
                <img src="/images/Bikeparts.jpeg" alt="Bike Configurator Image" />
            </RouterLink>
            <div class="bike-con">
                <h2 class="card-title2">Bike Configurator</h2>
            </div>
        </div>

        <div class="card3">
            <RouterLink to="/MapOfTracks"> 
                <img src="/images/map.jpg" alt="Bike Track Map Image" />
            </RouterLink>
            <div class="bike-map">
                <h2 class="card-title3">Bike Track Map</h2>
            </div>
        </div>
    </div>
  </main>
</template>

<style scoped>
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

.container {
    padding: 5em;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 60px;
    position: relative;
}

.card1, .card2, .card3 {
    position: relative; /* Ensure the card container is the reference point */
}

.card1 img, .card2 img, .card3 img {
    width: 450px;
    height: 550px;
    object-fit: cover;
    border-radius: 25px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card1 img:hover, .card2 img:hover, .card3 img:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 60px green;
}

.card-title1, .card-title2, .card-title3 {
    position: absolute;  
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
    font-size: 30px;
    font-style: italic;
    line-height: 14px;
    color: green;
    padding: 10px;
    border-radius: 25px;
    cursor: pointer;
    bottom: 250px; /* Position titles near the bottom of the card */
    left: 100px; /* Align the titles with a bit of padding */
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

/* This is for when you open website half open. -------------------------------*/
@media (max-width: 1200px) {
    .container {
        padding: 5em;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 60px;
        position: relative;
    }

    .card1, .card2, .card3 {
        position: relative; /* Ensure the card container is the reference point */
    }

    .card1 img, .card2 img, .card3 img {
        width: 650px;
        height: 150px;
        object-fit:cover;
        border-radius: 25px;
        opacity: 0.8;
    }
    
    .card1 img:hover, .card2 img:hover, .card3 img:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 60px green;
    }
    
    .card-title1, .card-title2, .card-title3 {
        position: absolute;  
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
        font-size: 30px;
        font-style: italic;
        line-height: 14px;
        color: green;
        padding: 10px;
        border-radius: 25px;
        cursor: pointer;
        bottom: 38px; /* Position titles near the bottom of the card */
        left: 205px; /* Align the titles with a bit of padding */
    }
}
/* This is for when you open website half open. ------------------------------ */

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
    z-index: 1;
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

