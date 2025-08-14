<template>
  <BaseModal
    :is-visible="isVisible"
    title="Răspuns Email"
    :subtitle="`Către: ${recipientEmail}`"
    size="xlarge"
    :show-footer="true"
    :loading="isSending"
    @cancel="closeComposer"
  >
    <template #body>
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
            <button @click="toggleBold" class="toolbar-btn" :class="{ active: isBold }">
              <Bold class="icon" />
            </button>
            <button @click="toggleItalic" class="toolbar-btn" :class="{ active: isItalic }">
              <Italic class="icon" />
            </button>
            <button @click="toggleUnderline" class="toolbar-btn" :class="{ active: isUnderline }">
              <Underline class="icon" />
            </button>
            
            <div class="toolbar-divider"></div>
            
            <button @click="insertList" class="toolbar-btn">
              <List class="icon" />
            </button>
            <button @click="insertOrderedList" class="toolbar-btn">
              <ListOrdered class="icon" />
            </button>
          </div>
          
          <div
            ref="editor"
            class="rich-editor"
            contenteditable="true"
            @input="updateContent"
            @keydown="handleKeydown"
            placeholder="Scrie mesajul tău aici..."
          ></div>
        </div>

        <div class="signature-section">
          <div class="signature-header">
            <label>Semnătură</label>
            <button @click="toggleEditSignature" class="edit-signature-btn">
              <Edit3 class="icon" />
              {{ isEditingSignature ? 'Previzualizare' : 'Editează' }}
            </button>
          </div>
          
          <textarea
            v-if="isEditingSignature"
            v-model="signature"
            class="signature-input"
            placeholder="Adaugă semnătura ta aici..."
            rows="3"
          ></textarea>
          
          <div v-else class="signature-preview">
            {{ signature || 'Nicio semnătură setată' }}
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <button @click="closeComposer" class="cancel-btn" :disabled="isSending">
        Anulează
      </button>
      <button @click="sendEmail" class="send-btn" :disabled="isSending">
        <Loader v-if="isSending" class="btn-icon spinning" />
        <Send v-else class="btn-icon" />
        {{ isSending ? 'Se trimite...' : 'Trimite' }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toastHelper } from '@/helpers'
import BaseModal from './BaseModal.vue'
import '@/assets/email-composer.css'
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
import { serverService } from '@/api/serverService'

interface Props {
  isVisible: boolean
  recipientEmail: string
  originalSubject?: string
  originalMessage?: string
  originalEmailId?: string
}

const props = withDefaults(defineProps<Props>(), {
  originalSubject: '',
  originalMessage: '',
})

const emit = defineEmits<{
  cancel: []
}>()

// Reactive data
const emailSubject = ref('')
const emailContent = ref('')
const signature = ref('Cu stimă,\n[Numele tău]')
const isEditingSignature = ref(false)
const isSending = ref(false)
const editor = ref<HTMLElement>()

// Editor state
const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)

// toastStore removed - using toastHelper from emailService

// Initialize email data
onMounted(() => {
  if (props.originalSubject) {
    emailSubject.value = props.originalSubject.startsWith('Re: ') 
      ? props.originalSubject 
      : `Re: ${props.originalSubject}`
  }
  
  if (props.originalMessage && editor.value) {
    editor.value.innerHTML = `<br><br>--- Mesaj original ---<br>${props.originalMessage}`
  }
})

// Editor functions
const toggleBold = () => {
  document.execCommand('bold')
  isBold.value = !isBold.value
}

const toggleItalic = () => {
  document.execCommand('italic')
  isItalic.value = !isItalic.value
}

const toggleUnderline = () => {
  document.execCommand('underline')
  isUnderline.value = !isUnderline.value
}

const insertList = () => {
  document.execCommand('insertUnorderedList')
}

const insertOrderedList = () => {
  document.execCommand('insertOrderedList')
}

const updateContent = () => {
  if (editor.value) {
    emailContent.value = editor.value.innerHTML
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  // Handle keyboard shortcuts
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 'b':
        event.preventDefault()
        toggleBold()
        break
      case 'i':
        event.preventDefault()
        toggleItalic()
        break
      case 'u':
        event.preventDefault()
        toggleUnderline()
        break
    }
  }
}

const toggleEditSignature = () => {
  isEditingSignature.value = !isEditingSignature.value
}

const closeComposer = () => {
  if (!isSending.value) {
    emit('cancel')
  }
}

const sendEmail = async () => {
  if (!emailSubject.value.trim()) {
    toastHelper.warning('Te rog să introduci un subiect pentru email')
    return
  }

  if (!emailContent.value.trim() && !editor.value?.textContent?.trim()) {
    toastHelper.warning('Te rog să introduci conținutul email-ului')
    return
  }

  isSending.value = true

  try {
    const emailData = {
      to: props.recipientEmail,
      subject: emailSubject.value,
      content: emailContent.value + (signature.value ? `<br><br>${signature.value.replace(/\n/g, '<br>')}` : ''),
      inReplyTo: props.originalEmailId
    }

    await serverService.sendEmail(emailData);
    emit('cancel');
  } catch (error) {
    console.error('Error in email composer:', error)
  } finally {
    isSending.value = false
  }
}
</script>