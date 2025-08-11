<template>
  <div v-if="isVisible" class="settings-overlay" @click="closeModal">
    <div class="settings-modal" @click.stop>
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <Settings class="icon" />
          </div>
          <div class="header-text">
            <h2>Setări</h2>
            <p>Configurări și testare sistem</p>
          </div>
        </div>
        <button @click="closeModal" class="close-btn">
          <X class="close-icon" />
        </button>
      </div>

      <div class="modal-content">
        <!-- Email Settings Section -->
        <div class="settings-section">
          <h3 class="section-title">
            <Mail class="section-icon" />
            Configurare Email
          </h3>
          <div class="section-description">
            Testați și verificați configurarea SMTP pentru trimiterea email-urilor.
          </div>
          
          <div class="email-test-container">
            <EmailTest />
          </div>
        </div>

        <!-- System Info Section -->
        <div class="settings-section">
          <h3 class="section-title">
            <Info class="section-icon" />
            Informații Sistem
          </h3>
          <div class="system-info">
            <div class="info-item">
              <span class="info-label">Versiune Admin Panel:</span>
              <span class="info-value">v1.0.0</span>
            </div>
            <div class="info-item">
              <span class="info-label">API Endpoint:</span>
              <span class="info-value">{{ apiBaseUrl }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Utilizator conectat:</span>
              <span class="info-value">{{ authStore.user?.email }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="closeModal" class="footer-btn close-footer-btn">
          <Check class="btn-icon" />
          Închide
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import EmailTest from './EmailTest.vue'
import {
  Settings,
  X,
  Mail,
  Info,
  Check
} from 'lucide-vue-next'

defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const authStore = useAuthStore()

const apiBaseUrl = computed(() => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
})

function closeModal() {
  emit('close')
}
</script>

<style scoped>
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.settings-modal {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(52, 209, 134, 0.3);
}

.header-icon .icon {
  width: 24px;
  height: 24px;
  color: white;
}

.header-text h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.header-text p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.close-btn {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  border-color: #dc3545;
  color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.close-icon {
  width: 20px;
  height: 20px;
}

.modal-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.section-icon {
  width: 20px;
  height: 20px;
  color: #34d186;
}

.section-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.email-test-container {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
}

.system-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.info-label {
  font-weight: 500;
  color: #666;
}

.info-value {
  font-weight: 600;
  color: #1a1a1a;
  font-family: monospace;
  font-size: 0.9rem;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
  display: flex;
  justify-content: flex-end;
}

.footer-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #666;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.close-footer-btn:hover {
  border-color: #34d186;
  color: #34d186;
  box-shadow: 0 0 0 2px rgba(52, 209, 134, 0.1);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .settings-overlay {
    padding: 0.5rem;
  }
  
  .settings-modal {
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 1rem 1.5rem;
  }
  
  .header-icon {
    width: 40px;
    height: 40px;
  }
  
  .header-icon .icon {
    width: 20px;
    height: 20px;
  }
  
  .header-text h2 {
    font-size: 1.3rem;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .modal-footer {
    padding: 1rem 1.5rem;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>