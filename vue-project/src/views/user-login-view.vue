<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const showRegisterForm = ref(false);

// Registration form fields
const registerEmail = ref('');
const registerPassword = ref('');
const confirmPassword = ref('');
const username = ref('');

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    // In a real application, this would be an API call to authenticate
    // For now, let's simulate a successful login
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    
    // Store user info in localStorage (in a real app, you'd use more secure token storage)
    localStorage.setItem('user_token', `user_${Date.now()}`);
    localStorage.setItem('user_email', email.value);
    
    // Redirect to user profile page
    router.push('/user-profile');
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = 'An error occurred during login';
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  // Validate inputs
  if (!registerEmail.value || !registerPassword.value || !confirmPassword.value || !username.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }
  
  if (registerPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }
  
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // In a real application, this would be an API call to register
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    
    // After successful registration, you would typically:
    // 1. Show a success message
    // 2. Either log the user in automatically or redirect to login
    errorMessage.value = 'Registration successful! You can now login.';
    showRegisterForm.value = false;
    
    // Pre-fill the login email field with the registered email
    email.value = registerEmail.value;
  } catch (error) {
    console.error('Registration error:', error);
    errorMessage.value = 'An error occurred during registration';
  } finally {
    isLoading.value = false;
  }
};

const toggleForm = () => {
  showRegisterForm.value = !showRegisterForm.value;
  errorMessage.value = '';
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>{{ showRegisterForm ? 'Create an Account' : 'User Login' }}</h1>
      </div>
      
      <!-- Login Form -->
      <form v-if="!showRegisterForm" @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            placeholder="Enter your email" 
            autofocus 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="Enter your password" 
            required
          />
        </div>
        
        <div class="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>
        
        <div v-if="errorMessage" class="message" :class="{ error: !errorMessage.includes('successful') }">
          {{ errorMessage }}
        </div>
        
        <button 
          type="submit" 
          class="primary-button" 
          :disabled="isLoading"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
        
        <div class="form-footer">
          <p>Don't have an account? <a href="#" @click.prevent="toggleForm">Register</a></p>
        </div>
      </form>
      
      <!-- Registration Form -->
      <form v-else @submit.prevent="handleRegister" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            id="username" 
            v-model="username" 
            type="text" 
            placeholder="Choose a username" 
            autofocus 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="register-email">Email</label>
          <input 
            id="register-email" 
            v-model="registerEmail" 
            type="email" 
            placeholder="Enter your email" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="register-password">Password</label>
          <input 
            id="register-password" 
            v-model="registerPassword" 
            type="password" 
            placeholder="Create a password" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input 
            id="confirm-password" 
            v-model="confirmPassword" 
            type="password" 
            placeholder="Confirm your password" 
            required
          />
        </div>
        
        <div v-if="errorMessage" class="message" :class="{ error: !errorMessage.includes('successful') }">
          {{ errorMessage }}
        </div>
        
        <button 
          type="submit" 
          class="primary-button" 
          :disabled="isLoading"
        >
          {{ isLoading ? 'Registering...' : 'Register' }}
        </button>
        
        <div class="form-footer">
          <p>Already have an account? <a href="#" @click.prevent="toggleForm">Login</a></p>
        </div>
      </form>
      
      <div class="back-link">
        <router-link to="/">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-header {
  background-color: #2c3e50;
  color: white;
  padding: 25px;
  text-align: center;
}

.login-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.login-form {
  padding: 30px;
}

.form-group {
  margin-bottom: 20px;
  width: 94%;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.forgot-password {
  text-align: right;
  margin-bottom: 20px;
}

.forgot-password a {
  color: #3498db;
  text-decoration: none;
  font-size: 14px;
}

.message {
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.primary-button {
  width: 100px;
  padding: 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: 647px;
  margin-top: 750px;
}

.primary-button:hover {
  background-color: #2980b9;
}

.primary-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.form-footer {
  text-align: center;
  margin-top: 100px;
  font-size: 15px;
}

.form-footer a {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
}

.form-footer a:hover {
  text-decoration: underline;
}

.back-link {
  text-align: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-top: 1px solid #eee;
  margin-top: -15px;
}

.back-link a {
  color: #3498db;
  text-decoration: none;
  font-size: 15px;
}

.back-link a:hover {
  text-decoration: underline;
}
</style>