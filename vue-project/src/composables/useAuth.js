import { ref } from 'vue';

export function useAuth() {
  const isAuthenticated = ref(false);
  
  // Check if user is already authenticated (from previous session)
  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    isAuthenticated.value = !!token;
    return isAuthenticated.value;
  };

  // Login function - in a real app, this would validate credentials against a server
  const login = (username, password) => {
    // For demo purposes, hardcoded credentials
    // In production, this should validate against a secure backend
    if (username === 'admin' && password === 'password') {
      // Store a simple token
      const token = `auth_${Date.now()}`;
      localStorage.setItem('admin_token', token);
      isAuthenticated.value = true;
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('admin_token');
    isAuthenticated.value = false;
  };

  // Initialize auth state
  checkAuth();

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  };
}
