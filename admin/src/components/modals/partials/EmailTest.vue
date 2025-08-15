<template>
  <div class="email-test">
    <div class="test-section">
      <h3>Test Configurare Email</h3>
      <p>Verificați dacă configurarea SMTP și IMAP funcționează corect.</p>
      
      <div class="test-buttons">
        <button @click="testConnectionImap" :disabled="testing.imap || testing.all" class="test-btn">
          <Wifi v-if="!testing.imap" class="btn-icon" />
          <Loader v-else class="btn-icon spinning" />
          {{ testing.imap ? 'Se testează...' : 'Test IMAP' }}
        </button>
        
        <button @click="testConnectionSmtp" :disabled="testing.smtp || testing.all" class="test-btn">
          <Wifi v-if="!testing.smtp" class="btn-icon" />
          <Loader v-else class="btn-icon spinning" />
          {{ testing.smtp ? 'Se testează...' : 'Test SMTP' }}
        </button>
        
        <button @click="testAllConnections" :disabled="testing.all || testing.imap || testing.smtp" class="test-btn primary">
          <Wifi v-if="!testing.all" class="btn-icon" />
          <Loader v-else class="btn-icon spinning" />
          {{ testing.all ? 'Se testează...' : 'Test Toate Conexiunile' }}
        </button>
      </div>
      
      <div v-if="testResults.imap || testResults.smtp" class="test-results">
        <div v-if="testResults.imap" class="test-result" :class="{ success: testResults.imap.success, error: !testResults.imap.success }">
          <div class="result-item">
            <Check v-if="testResults.imap.success" class="status-icon success" />
            <X v-else class="status-icon error" />
            <span>IMAP: {{ testResults.imap.message }}</span>
          </div>
          <div v-if="testResults.imap.success && testResults.imap.emailCount !== undefined" class="email-count">
            <Mail class="count-icon" />
            <span>{{ testResults.imap.emailCount }} email{{ testResults.imap.emailCount !== 1 ? '-uri' : '' }} găsit{{ testResults.imap.emailCount !== 1 ? 'e' : '' }} pe server</span>
          </div>
        </div>
        
        <div v-if="testResults.smtp" class="test-result" :class="{ success: testResults.smtp.success, error: !testResults.smtp.success }">
          <div class="result-item">
            <Check v-if="testResults.smtp.success" class="status-icon success" />
            <X v-else class="status-icon error" />
            <span>SMTP: {{ testResults.smtp.message }}</span>
          </div>
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
import { Wifi, Loader, Check, X, Mail } from 'lucide-vue-next'
import { serverService } from '@/api/serverService'
import '@/assets/email-test.css'
import { StatusTypes } from '@/types/api'

const testing = ref({
  imap: false,
  smtp: false,
  all: false
})

const testResults = ref<{
  imap: { success: boolean; message: string; emailCount?: number } | null;
  smtp: { success: boolean; message: string } | null;
}>({
  imap: null,
  smtp: null
})

const error = ref('')

async function testConnectionImap() {
  testing.value.imap = true
  testResults.value.imap = null
  error.value = ''
  
  try {
    const result = await serverService.testConnectionImap()
    testResults.value.imap = {
      ...result,
      success: result.status === StatusTypes.Success
    }
  } catch (err: any) {
    error.value = err.message
    testResults.value.imap = {
      success: false,
      message: err.message
    }
  } finally {
    testing.value.imap = false
  }
}

async function testConnectionSmtp() {
  testing.value.smtp = true
  testResults.value.smtp = null
  error.value = ''
  
  try {
    const result = await serverService.testConnectionSmtp()
    testResults.value.smtp = {
      ...result,
      success: result.status === StatusTypes.Success
    }
  } catch (err: any) {
    error.value = err.message
    testResults.value.smtp = {
      success: false,
      message: err.message
    }
  } finally {
    testing.value.smtp = false
  }
}

async function testAllConnections() {
  testing.value.all = true
  testResults.value.imap = null
  testResults.value.smtp = null
  error.value = ''
  
  try {
    const results = await serverService.testAllConnections()
    testResults.value.imap = {
      ...results.imap,
      success: results.imap.status === StatusTypes.Success
    }
    testResults.value.smtp = {
      ...results.smtp,
      success: results.smtp.status === StatusTypes.Success
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    testing.value.all = false
  }
}
</script>

