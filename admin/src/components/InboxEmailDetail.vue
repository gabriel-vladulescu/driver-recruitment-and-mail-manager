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
          <div class="email-subject">
            <h1>{{ email.subject || 'Fără subiect' }}</h1>
          </div>
          
          <div class="email-header-info">
            <div class="sender-info">
              <div class="sender-avatar">
                {{ emailHelper.getInitials(email.email_from_name || email.email_from) }}
              </div>
              <div class="sender-details">
                <p class="sender-email">From: {{ emailHelper.getEmailFromFormat(email) }}</p>
                <p class="sender-email">To: {{emailHelper.getEmailToFormat(email) }}</p>
                <p class="email-date">{{ dateHelper.formatDate(email.createdAt) }}</p>
                <div class="email-meta">
                  <div v-if="email.inboxLabel" class="email-label">
                    <component 
                      :is="getIconComponent(email.inboxLabel.icon)" 
                      class="label-icon" 
                      :style="{ 
                        color: email.inboxLabel.color,
                        fill: email.inboxLabel.color
                      }"
                    />
                    <span>{{ email.inboxLabel.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          
            <div class="header-actions">
              <template v-if="view?.type === 'trash'">
                <!-- Trash-specific actions -->
                <button 
                  @click="emailService.restoreFromTrash(email.id)" 
                  class="action-btn restore-btn"
                  title="Restaurează email-ul"
                >
                  <RotateCcw class="action-icon" />
                  Restaurează
                </button>
                
                <button 
                  @click="showPermanentDeleteDialog = true" 
                  class="action-btn danger permanent-delete-btn"
                  title="Șterge definitiv"
                >
                  <Trash2 class="action-icon" />
                  Șterge definitiv
                </button>
              </template>
              <template v-else-if="view?.type === 'archive'">
                <!-- Archive-specific actions -->
                <button 
                  @click="emailService.restoreFromArchive(email.id)" 
                  class="action-btn restore-btn"
                  title="Restaurează din arhivă"
                >
                  <RotateCcw class="action-icon" />
                  Restaurează
                </button>
                
                <button 
                  @click="showDeleteFromArchiveDialog = true" 
                  class="action-btn danger"
                  title="Mută în trash"
                >
                  <Trash2 class="action-icon" />
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
                  @click="emailService.markAsRead(email.id, !email.is_read); email.is_read = !email.is_read" 
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
                  @click="showDeleteDialog = true" 
                  class="action-btn danger"
                  title="Șterge email"
                >
                  <Trash2 class="action-icon" />
                </button>
              </template>
            </div>
          </div>

        </div>
      </div>

      <!-- Email Content -->
      <div class="email-content">
        <!-- Regular email message -->
        <div v-if="!isExternalForm" class="email-body" v-html="emailHelper.sanitizeHtml(email.message)"></div>
        
        <!-- External form data (for inbox_type_id = 2) -->
        <div v-else class="external-form-content">
          <div class="form-fields">
            <div v-for="(value, key) in email?.custom_data?.formData || {}" :key="key" class="form-field">
              <div class="field-label">{{ key }}</div>
              <div class="field-value">{{ value }}</div>
            </div>
          </div>
          
          <div v-if="email.message && email.message !== 'Mesaj de contact'" class="original-message">
            <div class="message-header">
              <h4>Mesaj Original</h4>
            </div>
            <div class="message-content" v-html="emailHelper.sanitizeHtml(email.message)"></div>
          </div>
        </div>
        
        <!-- Attachments (if any) -->
        <div v-if="hasAttachments" class="attachments-section">
          <h3>Atașamente</h3>
          <div class="attachments-list">
            <div 
              v-for="(attachment, index) in props.email?.custom_data?.attachments || []" 
              :key="index"
              class="attachment-item"
            >
              <Paperclip class="attachment-icon" />
              <div class="attachment-info">
                <span class="attachment-name">{{ attachment.filename }}</span>
                <span class="attachment-size">{{ emailHelper.formatFileSize(attachment.size) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Label Assignment Modal -->
    <LabelSelectorModal
      :is-visible="showLabelModal"
      :emailIds="[email.id]"
      @cancel="showLabelModal = false"
    />

    <!-- Email Composer Modal -->
    <EmailComposer
      :is-visible="showReplyModal"
      :recipient-email="email?.email_from || ''"
      :original-subject="email?.subject || ''"
      :original-message="''"
      :original-email-id="email?.id"
      @cancel="showReplyModal = false"
    />

    <!-- Delete Confirmation Dialogs -->
    <ConfirmDialog
      :is-visible="showDeleteDialog"
      type="warning"
      title="Mută în Trash"
      :message="`Sigur dorești să muți acest email în trash?`"
      :details="email?.subject"
      confirm-text="Mută în Trash"
      cancel-text="Anulează"
      :on-confirm="() => emailService.moveToTrash(email.id)"
      @cancel="showDeleteDialog = false"
    />

    <ConfirmDialog
      :is-visible="showPermanentDeleteDialog"
      type="danger"
      title="Șterge Definitiv"
      message="Sigur dorești să ștergi definitiv acest email? Această acțiune nu poate fi anulată."
      :details="email?.subject"
      confirm-text="Șterge Definitiv"
      cancel-text="Anulează"
      :on-confirm="() => emailService.cleanTrash(email.id)"
      @cancel="showPermanentDeleteDialog = false"
    />

    <ConfirmDialog
      :is-visible="showDeleteFromArchiveDialog"
      type="warning"
      title="Mută din Arhivă în Trash"
      :message="`Sigur dorești să muți acest email din arhivă în trash?`"
      :details="email?.subject"
      confirm-text="Mută în Trash"
      cancel-text="Anulează"
      :on-confirm="() => emailService.moveToTrash(email.id, true)"
      @cancel="showDeleteFromArchiveDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import '@/assets/modal.css'
import '@/assets/inbox-email-detail.css'
import {
  Mail, MailOpen, Tag, Trash2, Paperclip, RotateCcw, ArrowLeft, Reply,
  Star, Bookmark, Heart, Flag, AlertCircle, CheckCircle, Info, Zap,
  Shield, Award, Target, Users, Calendar, File, Folder, Settings, Bell
} from 'lucide-vue-next'
import EmailComposer from './modals/EmailComposer.vue'
import ConfirmDialog from './modals/ConfirmDialog.vue'
import LabelSelectorModal from './modals/LabelSelectorModal.vue'
import { dateHelper, emailHelper } from '@helpers';
import { emailService } from '@/api';
import { useEmailStore } from '@/stores/emailStore';

// Props
interface Props {
  email?: any | null
  view?: {
    type: 'category' | 'label' | 'all' | 'trash' | 'archive'
    id?: string | number
    data?: any
  } | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  backToList: []
}>()

// Email store for global state management
const emailStore = useEmailStore()

// Icon mapping for labels
const iconComponents = {
  Tag,
  Star,
  Bookmark,
  Heart,
  Flag,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Shield,
  Award,
  Target,
  Users,
  Calendar,
  Mail,
  File,
  Folder,
  Settings,
  Bell
}

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  return iconComponents[iconName as keyof typeof iconComponents] || Tag
}

// State
const showLabelModal = ref(false)
const showReplyModal = ref(false)
const showDeleteDialog = ref(false)
const showPermanentDeleteDialog = ref(false)
const showDeleteFromArchiveDialog = ref(false)

// Computed
const hasAttachments = computed(() => {
  return props.email?.custom_data?.attachments?.length > 0
})

const isExternalForm = computed(() => {
  return props.email?.inboxType?.id === 2 || (props.email?.inbox_type_id === 2)
})

// handleEmailSend removed - emailService handles update trigger automatically

watch(() => emailStore.backToListTrigger, () => {
  emit('backToList');
})
</script>