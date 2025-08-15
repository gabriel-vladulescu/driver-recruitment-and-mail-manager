<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo">
            <div class="logo-icon">
              <Shield class="icon" />
            </div>
            <div class="logo-text">
              <h1>Bloom Admin</h1>
              <p>Panoul de administrare</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <Mail class="input-icon" />
              <input
                type="email"
                id="email"
                v-model="form.email"
                placeholder="admin@bloom.ro"
                required
                :disabled="isLoading"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Parolă</label>
            <div class="input-wrapper">
              <Lock class="input-icon" />
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="form.password"
                placeholder="••••••••"
                required
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="password-toggle"
                :disabled="isLoading"
              >
                <Eye v-if="showPassword" class="icon" />
                <EyeOff v-else class="icon" />
              </button>
            </div>
          </div>

          <div v-if="errorMessage" class="error-message">
            <AlertCircle class="error-icon" />
            <span>{{ errorMessage }}</span>
          </div>

          <button type="submit" class="login-btn" :disabled="isLoading">
            <Loader v-if="isLoading" class="btn-icon spinning" />
            <LogIn v-else class="btn-icon" />
            {{ isLoading ? 'Se conectează...' : 'Conectare' }}
          </button>
        </form>

        <div class="login-footer">
          <p class="demo-credentials">
            <Info class="info-icon" />
            Demo: admin@bloom.ro / admin123
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import '@/assets/login.css';
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader,
  LogIn,
  Info
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  if (!form.value.email || !form.value.password) {
    errorMessage.value = 'Vă rugăm completați toate câmpurile'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.login(form.value.email, form.value.password)
    
    if (result.success) {
      router.push('/dashboard')
    } else {
      errorMessage.value = result.message || 'Eroare la conectare'
    }
  } catch (error) {
    errorMessage.value = 'Eroare de conexiune'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>