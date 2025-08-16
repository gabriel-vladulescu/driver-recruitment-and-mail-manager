import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { StatusTypes } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_MAIL_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_MAIL_API_BASE_URL is not defined. Please set it in your environment variables.');
}

export interface User {
  id: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('admin_token'));
  const isAuthenticated = computed(() => !!token.value && !!user.value);

  // Configure axios defaults
  const configureAxios = () => {
    axios.defaults.baseURL = API_BASE_URL;
    if (token.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }
  
  configureAxios()

  async function login(email: string, password: string) {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      })

      if (response.data.status === StatusTypes.Success) {
        token.value = response.data.data.token
        user.value = response.data.data.user
        
        if (token.value) {
          localStorage.setItem('admin_token', token.value)
          configureAxios()
        }
        
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Eroare de conexiune' 
      }
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('admin_token')
    configureAxios()
  }

  // Check if token is still valid on app load
  async function validateToken() {
    if (!token.value) return false

    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/me`)
      if (response.data.status === StatusTypes.Success) {
        user.value = response.data.data
        return true
      } else {
        logout()
        return false
      }
    } catch (error) {
      logout()
      return false
    }
  }

  // Initialize auth state on app load
  async function initializeAuth() {
    if (token.value) {
      configureAxios()
      await validateToken()
    }
  }

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    login,
    logout,
    validateToken,
    initializeAuth
  }
})