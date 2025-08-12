<template>
  <div class="email-composer" v-if="isVisible">
    <div class="composer-overlay" @click="closeComposer"></div>
    <div class="composer-modal">
      <div class="composer-header">
        <div class="header-info">
          <h3>Răspuns Email</h3>
          <span class="recipient">Către: {{ recipientEmail }}</span>
        </div>
        <button @click="closeComposer" class="close-btn">
          <X class="icon" />
        </button>
      </div>

      <div class="composer-body">
        <div class="email-form">
          <div class="form-group">
            <label for="subject">Subiect</label>
            <input
              type="text"
              id="subject"
              v-model="emailSubject"
              class="subject-input"
              placeholder="Subiectul email-ului..."
            />
          </div>

          <div class="form-group">
            <label>Mesaj</label>
            <div class="editor-toolbar">
              <button 
                type="button" 
                @click="formatText('bold')" 
                class="toolbar-btn"
                :class="{ active: isFormatActive('bold') }"
                title="Bold"
              >
                <Bold class="icon" />
              </button>
              <button 
                type="button" 
                @click="formatText('italic')" 
                class="toolbar-btn"
                :class="{ active: isFormatActive('italic') }"
                title="Italic"
              >
                <Italic class="icon" />
              </button>
              <button 
                type="button" 
                @click="formatText('underline')" 
                class="toolbar-btn"
                :class="{ active: isFormatActive('underline') }"
                title="Underline"
              >
                <Underline class="icon" />
              </button>
              <div class="toolbar-divider"></div>
              <button 
                type="button" 
                @click="formatText('insertUnorderedList')" 
                class="toolbar-btn"
                title="Lista punctată"
              >
                <List class="icon" />
              </button>
              <button 
                type="button" 
                @click="formatText('insertOrderedList')" 
                class="toolbar-btn"
                title="Lista numerotată"
              >
                <ListOrdered class="icon" />
              </button>
            </div>
            
            <div 
              ref="editor"
              class="rich-editor"
              contenteditable="true"
              @input="updateContent"
              @keydown="handleKeydown"
            ></div>
          </div>

          <div class="signature-section">
            <div class="signature-header">
              <label>Semnătură</label>
              <button 
                type="button" 
                @click="toggleSignatureEdit" 
                class="edit-signature-btn"
              >
                <Edit3 class="icon" />
                {{ isEditingSignature ? 'Salvează' : 'Editează' }}
              </button>
            </div>
            
            <div 
              v-if="isEditingSignature"
              class="signature-editor"
            >
              <textarea
                v-model="signature"
                class="signature-input"
                placeholder="Adaugă semnătura ta aici..."
                rows="4"
              ></textarea>
            </div>
            <div v-else class="signature-preview" v-html="formattedSignature"></div>
          </div>
        </div>
      </div>

      <div class="composer-footer">
        <div class="footer-actions">
          <button @click="sendEmail" class="send-btn" :disabled="isSending">
            <Send v-if="!isSending" class="btn-icon" />
            <Loader v-else class="btn-icon spinning" />
            {{ isSending ? 'Se trimite...' : 'Trimite Email' }}
          </button>
          <button @click="closeComposer" class="cancel-btn">
            Anulează
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { useToastStore } from '@/stores/toast'
import axios from 'axios'
import {
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Edit3,
  Send,
  Loader
} from 'lucide-vue-next'

interface Props {
  isVisible: boolean
  recipientEmail: string
  originalSubject?: string
  originalMessage?: string
  originalEmailId?: number
}

const props = withDefaults(defineProps<Props>(), {
  originalSubject: '',
  originalMessage: ''
})

const emit = defineEmits<{
  close: []
  send: [emailData: {
    to: string
    subject: string
    content: string
    signature: string
  }]
}>()

const toastStore = useToastStore()

const editor = ref<HTMLElement>()
const emailSubject = ref('')
const signature = ref('Cu stimă,\nEchipa Bloom Timișoara\n\n📧 admin@bloomtimisoara.ro\n📞 +40 256 XXX XXX\n🌐 www.bloomtimisoara.ro')
const isEditingSignature = ref(false)
const isSending = ref(false)

const formattedSignature = computed(() => {
  return signature.value.replace(/\n/g, '<br>')
})

onMounted(() => {
  if (props.originalSubject) {
    emailSubject.value = `Re: ${props.originalSubject}`
  }
  
  if (editor.value && props.originalMessage) {
    nextTick(() => {
      if (editor.value) {
        editor.value.innerHTML = `<p><br></p><p><br></p><div style="border-left: 3px solid #ccc; padding-left: 10px; margin-top: 20px; color: #666;"><strong>--- Mesaj original ---</strong><br>${props.originalMessage.replace(/\n/g, '<br>')}</div>`
      }
    })
  }
})

function formatText(command: string) {
  document.execCommand(command, false)
  if (editor.value) {
    editor.value.focus()
  }
}

function isFormatActive(format: string): boolean {
  return document.queryCommandState(format)
}

function updateContent() {
  // Content is automatically updated in the contenteditable div
}

function handleKeydown(event: KeyboardEvent) {
  // Handle common shortcuts
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 'b':
        event.preventDefault()
        formatText('bold')
        break
      case 'i':
        event.preventDefault()
        formatText('italic')
        break
      case 'u':
        event.preventDefault()
        formatText('underline')
        break
    }
  }
}

function toggleSignatureEdit() {
  isEditingSignature.value = !isEditingSignature.value
}

async function sendEmail() {
  if (!emailSubject.value.trim()) {
    toastStore.warning('Te rog completează subiectul email-ului')
    return
  }

  if (!editor.value?.innerHTML?.trim()) {
    toastStore.warning('Te rog scrie conținutul email-ului')
    return
  }

  isSending.value = true

  try {
    const emailData = {
      to: props.recipientEmail,
      subject: emailSubject.value,
      content: editor.value.innerHTML,
      signature: signature.value,
      replyTo: props.originalEmailId
    }

    // Make actual API call to send email using axios (which has auth configured)
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'}/api/email/reply`, emailData)

    if (response.data.success) {
      toastStore.success('Email trimis cu succes!')
      emit('send', emailData)
      closeComposer()
    } else {
      throw new Error(response.data.message || 'Eroare la trimiterea email-ului')
    }
  } catch (error: any) {
    console.error('Error sending email:', error)
    const message = error.response?.data?.message || error.message || 'Eroare la trimiterea email-ului'
    toastStore.error(message)
  } finally {
    isSending.value = false
  }
}

function closeComposer() {
  emit('close')
}
</script>

<style scoped>
.email-composer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.composer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.composer-modal {
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.composer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.header-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.recipient {
  font-size: 0.9rem;
  color: #666;
}

.close-btn {
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  border-color: #dc3545;
  color: #dc3545;
}

.close-btn .icon {
  width: 18px;
  height: 18px;
}

.composer-body {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.subject-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.subject-input:focus {
  outline: none;
  border-color: #34d186;
  box-shadow: 0 0 0 2px rgba(52, 209, 134, 0.1);
}

.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  border-color: #34d186;
  color: #34d186;
}

.toolbar-btn.active {
  background: #34d186;
  border-color: #34d186;
  color: white;
}

.toolbar-btn .icon {
  width: 16px;
  height: 16px;
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background: #e0e0e0;
  margin: 0 0.5rem;
}

.rich-editor {
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0 0 8px 8px;
  background: white;
  font-size: 1rem;
  line-height: 1.6;
  overflow-y: auto;
}

.rich-editor:focus {
  outline: none;
  border-color: #34d186;
}

.signature-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.signature-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.signature-header label {
  margin: 0;
}

.edit-signature-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-signature-btn:hover {
  border-color: #34d186;
  color: #34d186;
}

.edit-signature-btn .icon {
  width: 14px;
  height: 14px;
}

.signature-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
}

.signature-input:focus {
  outline: none;
  border-color: #34d186;
}

.signature-preview {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #666;
  white-space: pre-line;
}

.composer-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 209, 134, 0.3);
}

.send-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.cancel-btn {
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  border-color: #dc3545;
  color: #dc3545;
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

@media (max-width: 768px) {
  .email-composer {
    padding: 1rem;
  }
  
  .composer-modal {
    max-width: none;
  }
  
  .composer-header,
  .composer-body,
  .composer-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .editor-toolbar {
    flex-wrap: wrap;
  }
  
  .footer-actions {
    flex-direction: column;
  }
  
  .send-btn,
  .cancel-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>