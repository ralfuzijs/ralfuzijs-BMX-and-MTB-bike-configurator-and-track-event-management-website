<script setup>
import { ref } from 'vue';

const trackData = ref({
  name: '',
  type: 'skatepark', // Default value
  description: '',
  location: {
    coordinates: [0, 0] // [longitude, latitude]
  },
  imageUrl: ''
});

const message = ref('');
const loading = ref(false);

async function submitTrack() {
  loading.value = true;
  message.value = '';
  
  try {
    const response = await fetch('http://localhost:5000/api/tracks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trackData.value)
    });
    
    const data = await response.json();
    
    if (data.success) {
      message.value = 'Track added successfully!';
      // Reset the form
      trackData.value = {
        name: '',
        type: 'skatepark',
        description: '',
        location: {
          coordinates: [0, 0]
        },
        imageUrl: ''
      };
    } else {
      message.value = `Error: ${data.error}`;
    }
  } catch (error) {
    message.value = `Error: ${error.message}`;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="admin-container">
    <h1>Add New Track</h1>
    
    <div v-if="message" class="message" :class="{ error: message.includes('Error') }">
      {{ message }}
    </div>
    
    <form @submit.prevent="submitTrack">
      <div class="form-group">
        <label for="name">Track Name:</label>
        <input type="text" id="name" v-model="trackData.name" required>
      </div>
      
      <div class="form-group">
        <label for="type">Track Type:</label>
        <select id="type" v-model="trackData.type" required>
          <option value="skatepark">Skatepark</option>
          <option value="pumptrack">Pumptrack</option>
          <option value="bmx_track">BMX Track</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="trackData.description"></textarea>
      </div>
      
      <div class="form-group">
        <label>Location Coordinates:</label>
        <div class="coordinates-info">
          <p class="coordinate-help">Enter coordinates in the correct order: Longitude first, then Latitude.</p>
          <p class="coordinate-example">Example: For Riga city center: Longitude = 24.1052, Latitude = 56.9496</p>
        </div>
        <div class="coordinates-inputs">
          <div class="input-with-label">
            <label for="longitude">Longitude (first number):</label>
            <input 
              id="longitude"
              placeholder="Longitude (e.g., 24.1052)" 
              v-model="trackData.location.coordinates[0]" 
              required
            >
            <small>Longitude runs east-west (horizontal)</small>
          </div>
          <div class="input-with-label">
            <label for="latitude">Latitude (second number):</label>
            <input 
              id="latitude"
              placeholder="Latitude (e.g., 56.9496)" 
              v-model="trackData.location.coordinates[1]" 
              required
            >
            <small>Latitude runs north-south (vertical)</small>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="imageUrl">Image URL:</label>
        <input type="text" id="imageUrl" v-model="trackData.imageUrl">
      </div>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Adding...' : 'Add Track' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 100px;
}

.coordinates-inputs {
  display: flex;
  gap: 10px;
}

.coordinates-inputs input {
  flex: 1;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #cccccc;
}

.message {
  padding: 10px;
  margin-bottom: 20px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.message.error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.coordinates-inputs {
  display: flex;
  gap: 10px;
}
</style>