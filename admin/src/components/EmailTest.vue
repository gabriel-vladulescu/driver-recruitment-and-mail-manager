<template>
  <div class="email-test">
    <div class="test-section">
      <h3>Test Configurare Email</h3>
      <p>Verificați dacă configurarea SMTP funcționează corect.</p>
      
      <button @click="testConnection" :disabled="testing" class="test-btn">
        <Wifi v-if="!testing" class="btn-icon" />
        <Loader v-else class="btn-icon spinning" />
        {{ testing ? 'Se testează...' : 'Test Conexiune SMTP' }}
      </button>
      
      <div v-if="testResult" class="test-result" :class="{ success: testResult.smtp, error: !testResult.smtp }">
        <div class="result-item">
          <Check v-if="testResult.smtp" class="status-icon success" />
          <X v-else class="status-icon error" />
          <span>SMTP: {{ testResult.smtp ? 'Conexiune reușită' : 'Conexiune eșuată' }}</span>
        </div>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Wifi, Loader, Check, X } from 'lucide-vue-next'

const testing = ref(false)
const testResult = ref<{ smtp: boolean } | null>(null)
const error = ref('')

async function testConnection() {
  testing.value = true
  testResult.value = null
  error.value = ''
  
  try {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      throw new Error('Nu sunteți autentificat')
    }

    const response = await fetch('/api/email/test-connection', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json()

    if (response.ok && result.success) {
      testResult.value = result.data
    } else {
      throw new Error(result.message || 'Eroare la testarea conexiunii')
    }
  } catch (err: any) {
    console.error('Test connection error:', err)
    error.value = err.message
  } finally {
    testing.value = false
  }
}
</script>

<style scoped>
.email-test {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.test-section h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.test-section p {
  margin: 0 0 1rem 0;
  color: #666;
  line-height: 1.4;
  font-size: 0.9rem;
}

.test-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.test-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 209, 134, 0.3);
}

.test-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.test-result {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.test-result.success {
  background: rgba(52, 209, 134, 0.1);
  border: 1px solid rgba(52, 209, 134, 0.3);
}

.test-result.error {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.status-icon {
  width: 16px;
  height: 16px;
}

.status-icon.success {
  color: #28a745;
}

.status-icon.error {
  color: #dc3545;
}

.error-message {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 8px;
  padding: 1rem;
  color: #dc3545;
  font-weight: 500;
}
</style>