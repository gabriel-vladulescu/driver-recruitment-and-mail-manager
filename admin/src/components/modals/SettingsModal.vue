<template>
  <BaseModal
    :is-visible="isVisible"
    title="Setări"
    subtitle="Configurări și testare sistem"
    size="large"
    :header-icon="Settings"
    header-icon-style="rounded"
    header-icon-color="info"
    body-class="settings-body"
    @cancel="closeModal"
  >

    <template #body>
      <!-- Email Settings Section -->
      <div class="settings-section">
        <h3 class="section-title">
          <Mail class="section-icon" />
          Testare Configurare Email
        </h3>
        <p class="section-description">
          Testează configurațiile IMAP și SMTP pentru a te asigura că sistemul poate primi și trimite mesaje.
        </p>
        
        <div class="email-test-container">
          <EmailTest />
        </div>
      </div>

      <!-- Connection Status Section -->
      <div class="settings-section">
        <h3 class="section-title">
          <Wifi class="section-icon" />
          Status Conexiuni
        </h3>
        <p class="section-description">
          Informații despre statusul conexiunilor active cu serverele de email.
        </p>
        
        <div class="connection-status">
          <div class="status-item">
            <div class="status-indicator" :class="connectionStatus.imap"></div>
            <span class="status-label">IMAP Server</span>
            <span class="status-text">{{ getConnectionStatusText('imap') }}</span>
          </div>
          <div class="status-item">
            <div class="status-indicator" :class="connectionStatus.smtp"></div>
            <span class="status-label">SMTP Server</span>
            <span class="status-text">{{ getConnectionStatusText('smtp') }}</span>
          </div>
        </div>
      </div>

      <!-- System Information Section -->
      <div class="settings-section">
        <h3 class="section-title">
          <Info class="section-icon" />
          Informații Sistem
        </h3>
        <p class="section-description">
          Detalii despre versiunea și configurația sistemului.
        </p>
        
        <div class="system-info">
          <div class="info-item">
            <span class="info-label">Aplicație:</span>
            <span class="info-value">{{ applicationName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Versiune:</span>
            <span class="info-value">{{ systemVersion }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">API URL:</span>
            <span class="info-value">{{ apiUrl }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Utilizator:</span>
            <span class="info-value">{{ currentUser?.email || 'N/A' }}</span>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import EmailTest from './partials/EmailTest.vue'
import BaseModal from './BaseModal.vue'
import { serverService } from '@/api/serverService'
import packageJson from '@/../package.json'
import '@/assets/settingsmodal.css'
import {
  Settings,
  X,
  Mail,
  Info,
  Check,
  Wifi
} from 'lucide-vue-next'

defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  cancel: []
}>()

const authStore = useAuthStore()

const currentUser = computed(() => authStore.user)

const connectionStatus = ref({
  imap: 'unknown',
  smtp: 'unknown'
})

const emailCounts = ref({
  imap: 0
})

const systemVersion = computed(() => {
  return packageJson.version
})

const apiUrl = computed(() => {
  return import.meta.env.VITE_API_BASE_URL
})

const applicationName = computed(() => {
  return packageJson.name
})

const getConnectionStatusText = (type: 'imap' | 'smtp') => {
  const status = connectionStatus.value[type]
  switch (status) {
    case 'connected':
      if (type === 'imap' && emailCounts.value.imap > 0) {
        return `Conectat (${emailCounts.value.imap} email${emailCounts.value.imap !== 1 ? '-uri' : ''} pe server)`
      }
      return 'Conectat'
    case 'error':
      return 'Eroare de conexiune'
    default:
      return 'Status necunoscut'
  }
}

const checkConnectionStatus = async () => {
  try {
    const results = await serverService.testAllConnections()
    connectionStatus.value.imap = results.imap.success ? 'connected' : 'error'
    connectionStatus.value.smtp = results.smtp.success ? 'connected' : 'error'
    
    // Store email count for IMAP if available
    if (results.imap.success && results.imap.emailCount !== undefined) {
      emailCounts.value.imap = results.imap.emailCount
    }
  } catch (error) {
    connectionStatus.value.imap = 'error'
    connectionStatus.value.smtp = 'error'
  }
}

const closeModal = () => {
  emit('cancel')
}

onMounted(() => {
  checkConnectionStatus()
})
</script>

<style scoped>
/* Settings-specific styles that aren't in the shared modal.css */
</style>