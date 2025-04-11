<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userEmail = ref('');
const isLoading = ref(true);

onMounted(() => {
  // Check if user is logged in
  const token = localStorage.getItem('user_token');
  if (!token) {
    router.push('/login');
    return;
  }
  
  // Get user data (in a real app, you would fetch this from an API)
  userEmail.value = localStorage.getItem('user_email') || 'user@example.com';
  isLoading.value = false;
});

const handleLogout = () => {
  // Clear user data from localStorage
  localStorage.removeItem('user_token');
  localStorage.removeItem('user_email');
  
  // Redirect to home page
  router.push('/');
};
</script>

<template>
  <div class="user-profile">
    <div class="profile-container">
      <div v-if="isLoading" class="loading">
        Loading user profile...
      </div>
      
      <template v-else>
        <div class="profile-header">
          <h1>User Profile</h1>
          <button @click="handleLogout" class="logout-button">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
        
        <div class="profile-content">
          <div class="profile-section">
            <div class="profile-picture">
              <!-- Default profile icon -->
              <i class="fas fa-user-circle"></i>
            </div>
            
            <div class="user-info">
              <h2>Welcome Back!</h2>
              <p class="email">{{ userEmail }}</p>
              <p class="member-since">Member since: {{ new Date().toLocaleDateString() }}</p>
            </div>
          </div>
          
          <div class="profile-actions">
            <h3>My Account</h3>
            <ul>
              <li>
                <i class="fas fa-heart"></i>
                <span>Saved Configurations</span>
              </li>
              <li>
                <i class="fas fa-map-marker-alt"></i>
                <span>Favorite Tracks</span>
              </li>
              <li>
                <i class="fas fa-cog"></i>
                <span>Account Settings</span>
              </li>
              <li>
                <i class="fas fa-bell"></i>
                <span>Notifications</span>
              </li>
            </ul>
          </div>
          
          <div class="coming-soon">
            <h3>Coming Soon</h3>
            <p>More profile features are currently in development. Stay tuned!</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40px 20px;
}

.profile-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-header {
  padding: 25px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.logout-button {
  background-color: transparent;
  color: rgb(86, 35, 35);
  border: 1px solid rgba(240, 5, 5, 0.5);
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 250px;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.profile-content {
  padding: 30px;
}

.profile-section {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.profile-picture {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: #aaa;
}

.user-info h2 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.email {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.member-since {
  font-size: 14px;
  color: #888;
}

.profile-actions {
  margin-bottom: 30px;
}

.profile-actions h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1.3rem;
}

.profile-actions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-actions li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.profile-actions li:hover {
  background-color: #f9f9f9;
}

.profile-actions li i {
  font-size: 18px;
  color: #3498db;
  width: 24px;
  text-align: center;
}

.profile-actions li span {
  font-size: 16px;
  color: #444;
}

.coming-soon {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 20px;
  margin-top: 20px;
}

.coming-soon h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.coming-soon p {
  color: #666;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 50px;
  color: #666;
}
</style>