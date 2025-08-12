<template>
  <div class="inbox-email-detail">
    <div v-if="!email" class="no-email-selected">
      <Mail class="no-email-icon" />
      <h3>Selectează un email</h3>
      <p>Alege un email din lista pentru a vedea detaliile.</p>
    </div>

    <div v-else class="email-detail-container">
      <!-- Back Button -->
      <div class="back-header">
        <button @click="$emit('backToList')" class="back-btn">
          <ArrowLeft class="back-icon" />
          Înapoi la lista de email-uri
        </button>
      </div>
      
      <!-- Email Header -->
      <div class="email-header">
        <div class="header-main">
          <div class="sender-info">
            <div class="sender-avatar">
              {{ getInitials(email.email_from_name || email.email_from) }}
            </div>
            <div class="sender-details">
              <h2 class="sender-name">{{ email.email_from_name || email.email_from }}</h2>
              <p class="sender-email">{{ email.email_from }}</p>
              <p class="email-date">{{ formatDate(email.createdAt) }}</p>
            </div>
          </div>
          
          <div class="header-actions">
            <template v-if="view?.type === 'trash'">
              <!-- Trash-specific actions -->
              <button 
                @click="restoreEmail" 
                class="action-btn restore-btn"
                title="Restaurează email-ul"
              >
                <RotateCcw class="action-icon" />
                Restaurează
              </button>
              
              <button 
                @click="permanentlyDeleteEmail" 
                class="action-btn danger permanent-delete-btn"
                title="Șterge definitiv"
              >
                <Trash2 class="action-icon" />
                Șterge definitiv
              </button>
            </template>
            <template v-else>
              <!-- Normal email actions -->
              <button 
                @click="showReplyModal = true" 
                class="action-btn primary"
                title="Răspunde la email"
              >
                <Reply class="action-icon" />
                Răspunde
              </button>
              
              <button 
                @click="toggleReadStatus" 
                class="action-btn"
                :title="email.is_read ? 'Marchează ca necitit' : 'Marchează ca citit'"
              >
                <MailOpen v-if="email.is_read" class="action-icon" />
                <Mail v-else class="action-icon" />
              </button>
              
              <button 
                @click="showLabelModal = true" 
                class="action-btn"
                title="Setează etichetă"
              >
                <Tag class="action-icon" />
              </button>
              
              <button 
                @click="deleteEmail" 
                class="action-btn danger"
                title="Șterge email"
              >
                <Trash2 class="action-icon" />
              </button>
            </template>
          </div>
        </div>
        
        <div class="email-subject">
          <h1>{{ email.subject || 'Fără subiect' }}</h1>
        </div>
        
        <div class="email-meta">
          <div class="recipient-info">
            <span class="meta-label">Către:</span>
            <span class="meta-value">{{ email.email_to || email.email_mail_to || 'Necunoscut' }}</span>
          </div>
          
          <div v-if="email.inboxLabel" class="email-label">
            <div 
              class="label-indicator" 
              :style="{ backgroundColor: email.inboxLabel.color }"
            ></div>
            <component :is="email.inboxLabel.icon" class="label-icon" />
            <span>{{ email.inboxLabel.label }}</span>
          </div>
        </div>
      </div>

      <!-- Email Content -->
      <div class="email-content">
        <!-- Regular email message -->
        <div v-if="!isExternalForm" class="email-body" v-html="sanitizeHtml(email.message)"></div>
        
        <!-- External form data (for inbox_type_id = 2) -->
        <div v-else class="external-form-content">
          <div class="form-header">
            <h3>{{ getFormTypeLabel() }}</h3>
            <div class="form-badge">{{ getFormTypeBadge() }}</div>
          </div>
          
          <div class="form-fields">
            <div v-for="(value, key) in getFormFields()" :key="key" class="form-field">
              <div class="field-label">{{ formatFieldLabel(key) }}</div>
              <div class="field-value">{{ formatFieldValue(value) }}</div>
            </div>
          </div>
          
          <div v-if="email.message && email.message !== 'Mesaj de contact'" class="original-message">
            <div class="message-header">
              <h4>Mesaj Original</h4>
            </div>
            <div class="message-content" v-html="sanitizeHtml(email.message)"></div>
          </div>
        </div>
        
        <!-- Attachments (if any) -->
        <div v-if="hasAttachments" class="attachments-section">
          <h3>Atașamente</h3>
          <div class="attachments-list">
            <div 
              v-for="(attachment, index) in getAttachments()" 
              :key="index"
              class="attachment-item"
            >
              <Paperclip class="attachment-icon" />
              <div class="attachment-info">
                <span class="attachment-name">{{ attachment.filename }}</span>
                <span class="attachment-size">{{ formatFileSize(attachment.size) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Label Assignment Modal -->
    <div v-if="showLabelModal && email" class="modal-overlay" @click="closeLabelModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Setează Eticheta</h3>
          <button @click="closeLabelModal" class="close-btn">
            <X class="close-icon" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="label-options">
            <div 
              class="label-option"
              :class="{ selected: !selectedLabelId }"
              @click="selectedLabelId = null"
            >
              <div class="option-content">
                <X class="remove-icon" />
                <span>Fără etichetă</span>
              </div>
            </div>
            
            <div 
              v-for="label in availableLabels" 
              :key="label.id"
              class="label-option"
              :class="{ selected: selectedLabelId === label.id }"
              @click="selectedLabelId = label.id"
            >
              <div class="option-content">
                <div class="label-indicator" :style="{ backgroundColor: label.color }"></div>
                <component :is="label.icon" class="label-icon" />
                <span>{{ label.label }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeLabelModal" class="btn-cancel">Anulează</button>
          <button @click="assignLabel" class="btn-save">Aplică</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import DOMPurify from 'dompurify'
import {
  Mail, MailOpen, Tag, Trash2, X, Paperclip, Calendar, User,
  Briefcase, Bookmark, Star, Heart, Flag, Archive, RotateCcw, ArrowLeft,
  MessageSquare, Phone, MapPin, Clock, Car, FileText
} from 'lucide-vue-next'

// Props
interface Props {
  email?: any | null
  view?: {
    type: 'category' | 'label' | 'all' | 'trash'
    id?: number
    data?: any
  } | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  emailUpdated: []
  emailDeleted: [emailId: number]
  backToList: []
}>()

// State
const showLabelModal = ref(false)
const selectedLabelId = ref<number | null>(null)
const availableLabels = ref<any[]>([])

// Computed
const hasAttachments = computed(() => {
  return props.email?.custom_data?.attachments?.length > 0
})

const isExternalForm = computed(() => {
  return props.email?.inboxType?.id === 2 || (props.email?.inbox_type_id === 2)
})

// Methods
const getInitials = (name: string) => {
  if (!name) return '?'
  const names = name.split(' ')
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase()
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    return `Astăzi la ${date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}`
  } else if (days === 1) {
    return `Ieri la ${date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}`
  } else if (days < 7) {
    return `${days} zile în urmă`
  } else {
    return date.toLocaleDateString('ro-RO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'b', 'i', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'div', 'span', 'table', 'tr', 'td', 'th', 'thead', 'tbody'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'style', 'class'],
    ALLOW_DATA_ATTR: false
  })
}

const getAttachments = () => {
  return props.email?.custom_data?.attachments || []
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Form submission methods
const getFormTypeLabel = () => {
  const type = props.email?.custom_data?.type || props.email?.custom_data?.formData?.type
  const labels = {
    'TYPE_CONTACT': 'Formular de Contact',
    'TYPE_RECRUITMENT': 'Aplicație pentru Șofer',
    'TYPE_EXTERNAL_CAR_RENT': 'Cerere Închiriere Auto'
  }
  return labels[type as keyof typeof labels] || 'Formular'
}

const getFormTypeBadge = () => {
  const type = props.email?.custom_data?.type || props.email?.custom_data?.formData?.type
  const badges = {
    'TYPE_CONTACT': 'Contact',
    'TYPE_RECRUITMENT': 'Recrutare',
    'TYPE_EXTERNAL_CAR_RENT': 'Închiriere'
  }
  return badges[type as keyof typeof badges] || 'Formular'
}

const getFormFields = () => {
  const formData = props.email?.custom_data?.formData || {}
  const fieldsToExclude = ['type', 'source', 'acceptTerms']
  
  const cleanedData: Record<string, any> = {}
  
  Object.keys(formData).forEach(key => {
    if (!fieldsToExclude.includes(key) && formData[key] && formData[key] !== '') {
      cleanedData[key] = formData[key]
    }
  })
  
  return cleanedData
}

const formatFieldLabel = (key: string) => {
  const labels: Record<string, string> = {
    name: 'Nume Complet',
    firstName: 'Prenume',
    lastName: 'Nume',
    email: 'Email',
    phone: 'Telefon',
    subject: 'Subiect',
    message: 'Mesaj',
    experience: 'Experiență',
    hasVehicle: 'Are Vehicul',
    vehicleBrand: 'Marca Vehicul',
    vehicleYear: 'Anul Vehiculului',
    vehicleFuel: 'Combustibil',
    vehicleColor: 'Culoare Vehicul',
    availability: 'Disponibilitate',
    preferredSchedule: 'Program Preferat',
    age: 'Vârsta',
    rentalPeriod: 'Perioada Închiriere',
    additionalMessage: 'Mesaj Adițional'
  }
  
  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
}

const formatFieldValue = (value: any) => {
  if (typeof value === 'boolean') {
    return value ? 'Da' : 'Nu'
  }
  
  if (value === 'yes') return 'Da'
  if (value === 'no') return 'Nu'
  if (value === 'rental') return 'Doresc închiriere prin Bloom'
  
  // Handle specific form values
  const translations: Record<string, string> = {
    'imediat': 'Imediat',
    '1-saptamana': 'În 1 săptămână',
    '2-saptamani': 'În 2 săptămâni',
    '1-luna': 'În 1 lună',
    'mai-mult-de-1-luna': 'Mai mult de 1 lună',
    'full-time': 'Full-time (8+ ore/zi)',
    'part-time': 'Part-time (4-6 ore/zi)',
    'weekend': 'Doar weekend',
    '2-3-ani': '2-3 ani',
    '3-5-ani': '3-5 ani',
    'peste-5-ani': 'Peste 5 ani',
    'benzina': 'Benzină',
    'motorina': 'Motorină',
    'hibrid': 'Hibrid',
    'electric': 'Electric',
    'gpl': 'GPL'
  }
  
  return translations[value as string] || value
}

const toggleReadStatus = async () => {
  if (!props.email) return
  
  try {
    await axios.patch(
      `http://localhost:4000/api/inbox/emails/${props.email.id}/read`,
      { is_read: !props.email.is_read }
    )
    
    props.email.is_read = !props.email.is_read
    emit('emailUpdated')
  } catch (err) {
    console.error('Error updating read status:', err)
  }
}

const deleteEmail = async () => {
  if (!props.email) return
  
  if (!confirm('Sigur vrei să ștergi acest email?')) return
  
  try {
    await axios.delete(`http://localhost:4000/api/inbox/emails/${props.email.id}`)
    emit('emailDeleted', props.email.id)
    emit('emailUpdated') // Also update sidebar counts
  } catch (err) {
    console.error('Error deleting email:', err)
  }
}

const closeLabelModal = () => {
  showLabelModal.value = false
  selectedLabelId.value = null
}

const assignLabel = async () => {
  if (!props.email) return
  
  try {
    await axios.patch(
      `http://localhost:4000/api/inbox/emails/${props.email.id}/label`,
      { inbox_label_id: selectedLabelId.value }
    )
    
    // Update the email object
    props.email.inbox_label_id = selectedLabelId.value
    props.email.inboxLabel = selectedLabelId.value 
      ? availableLabels.value.find(l => l.id === selectedLabelId.value)
      : null
    
    emit('emailUpdated')
    closeLabelModal()
  } catch (err) {
    console.error('Error assigning label:', err)
  }
}

const fetchLabels = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/inbox/labels')
    availableLabels.value = response.data.data
  } catch (err) {
    console.error('Error fetching labels:', err)
  }
}

// Trash-specific functions
const restoreEmail = async () => {
  if (!props.email) return
  
  try {
    await axios.post(`http://localhost:4000/api/inbox/emails/${props.email.id}/restore`)
    emit('emailUpdated')
    emit('backToList') // Return to list after restore
  } catch (error: any) {
    console.error('Error restoring email:', error)
    alert(error.response?.data?.message || 'Eroare la restaurarea email-ului')
  }
}

const permanentlyDeleteEmail = async () => {
  if (!props.email) return
  
  if (!confirm('Sigur vrei să ștergi definitiv acest email? Această acțiune nu poate fi anulată.')) {
    return
  }
  
  try {
    await axios.delete(`http://localhost:4000/api/inbox/emails/${props.email.id}/permanent`)
    emit('emailDeleted', props.email.id)
    emit('backToList') // Return to list after delete
  } catch (error: any) {
    console.error('Error permanently deleting email:', error)
    alert(error.response?.data?.message || 'Eroare la ștergerea definitivă')
  }
}

// Watch for email changes to set initial label
watch(() => props.email, (newEmail) => {
  if (newEmail) {
    selectedLabelId.value = newEmail.inbox_label_id || null
    
    // Fetch available labels when email is selected
    fetchLabels()
  }
}, { immediate: true })
</script>

<style scoped>
.inbox-email-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  height: 100vh;
  overflow: hidden;
}

.no-email-selected {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: #666;
}

.no-email-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
  color: #ccc;
}

.no-email-selected h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.no-email-selected p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.email-detail-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.email-header {
  padding: 2rem;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1.5rem;
}

.sender-info {
  display: flex;
  gap: 1rem;
}

.sender-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
}

.sender-details h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.sender-details p {
  margin: 0 0 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

.email-date {
  font-size: 0.85rem !important;
  color: #999 !important;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  padding: 0.75rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: #f8f9fa;
  border-color: #34d186;
  color: #34d186;
}

.action-btn.danger:hover {
  border-color: #dc3545;
  color: #dc3545;
}

.action-icon {
  width: 20px;
  height: 20px;
}

.email-subject {
  margin-bottom: 1rem;
}

.email-subject h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}

.email-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.recipient-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-label {
  font-weight: 600;
  color: #666;
}

.meta-value {
  color: #1a1a1a;
}

.email-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(52, 209, 134, 0.1);
  border-radius: 20px;
  font-size: 0.85rem;
  color: #34d186;
}

.label-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.label-icon {
  width: 14px;
  height: 14px;
}

.email-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.email-body {
  line-height: 1.6;
  color: #1a1a1a;
  font-size: 1rem;
}

.email-body :deep(p) {
  margin-bottom: 1rem;
}

.email-body :deep(a) {
  color: #34d186;
  text-decoration: none;
}

.email-body :deep(a:hover) {
  text-decoration: underline;
}

.email-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.email-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.email-body :deep(table td),
.email-body :deep(table th) {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  text-align: left;
}

.email-body :deep(table th) {
  background: #f8f9fa;
  font-weight: 600;
}

.attachments-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.attachments-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.attachment-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.attachment-info {
  display: flex;
  flex-direction: column;
}

.attachment-name {
  font-weight: 600;
  color: #1a1a1a;
}

.attachment-size {
  font-size: 0.85rem;
  color: #666;
}

/* Form submission styles */
.external-form-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.1) 0%, rgba(40, 167, 69, 0.05) 100%);
  border: 1px solid rgba(52, 209, 134, 0.2);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.form-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
}

.form-badge {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.form-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-field {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s;
}

.form-field:hover {
  border-color: rgba(52, 209, 134, 0.3);
  background: rgba(52, 209, 134, 0.02);
}

.field-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field-value {
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 500;
  word-break: break-word;
}

.original-message {
  border-top: 2px solid #e9ecef;
  padding-top: 2rem;
}

.message-header {
  margin-bottom: 1rem;
}

.message-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.message-header h4::before {
  content: '';
  width: 4px;
  height: 20px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 2px;
}

.message-content {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #1a1a1a;
}

@media (max-width: 768px) {
  .form-fields {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .form-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1.25rem;
  }
  
  .form-badge {
    align-self: center;
  }
}

/* Modal styles */
.modal-overlay {
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
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: #f8f9fa;
}

.close-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.modal-body {
  padding: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.label-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-option {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.label-option:hover {
  background: #f8f9fa;
  border-color: #34d186;
}

.label-option.selected {
  background: #e3f2fd;
  border-color: #34d186;
  color: #34d186;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.remove-icon {
  width: 16px;
  height: 16px;
  color: #dc3545;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-save {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  color: #666;
}

.btn-cancel:hover {
  background: #e9ecef;
}

.btn-save {
  background: #34d186;
  border: 1px solid #34d186;
  color: white;
}

.btn-save:hover {
  background: #28a745;
  border-color: #28a745;
}

@media (max-width: 768px) {
  .email-header {
    padding: 1.5rem;
  }
  
  .header-main {
    flex-direction: column;
    gap: 1rem;
    align-items: start;
  }
  
  .email-meta {
    flex-direction: column;
    align-items: start;
  }
  
  .email-content {
    padding: 1.5rem;
  }
  
  .sender-info {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
}
/* Back button styles */
.back-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6c757d;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0.5rem;
  border-radius: 6px;
}

.back-btn:hover {
  color: #34d186;
  background: rgba(52, 209, 134, 0.1);
}

.back-icon {
  width: 18px;
  height: 18px;
}

/* Trash-specific button styles */
.restore-btn {
  background: linear-gradient(135deg, #28a745 0%, #34d186 100%);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.restore-btn:hover {
  background: linear-gradient(135deg, #218838 0%, #2e9c71 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.permanent-delete-btn {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.permanent-delete-btn:hover {
  background: linear-gradient(135deg, #c82333 0%, #a71e2a 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.header-actions {
  gap: 1rem;
}

@media (max-width: 768px) {
  .restore-btn, .permanent-delete-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    gap: 0.3rem;
  }
  
  .header-actions {
    gap: 0.5rem;
  }
  
  .external-form-content {
    gap: 1.5rem;
  }
}
</style>