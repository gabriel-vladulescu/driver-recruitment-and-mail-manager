<template>
  <div class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-icon">
          <Shield class="icon" />
        </div>
        <div class="logo-text">
          <h2>Bloom Admin</h2>
        </div>
      </div>
      <div class="user-menu">
        <button @click="showUserMenu = !showUserMenu" class="user-btn">
          <User class="user-icon" />
          <ChevronDown class="dropdown-icon" />
        </button>
        <div v-if="showUserMenu" class="user-dropdown">
          <div class="user-info">
            <span class="user-email">{{ authStore.user?.email }}</span>
          </div>
          <button @click="openSettings" class="dropdown-menu-btn">
            <Settings class="menu-icon" />
            Setări
          </button>
          <button @click="handleLogout" class="logout-btn">
            <LogOut class="logout-icon" />
            Deconectare
          </button>
        </div>
      </div>
    </div>


    <!-- Inbox Categories -->
    <div class="messages-container">
      <!-- Direct Categories -->
      <div v-for="category in inboxCategories" :key="category.id" class="messages-section">
        <!-- Debug: {{ category.name }} -->
        <div 
          class="category-item" 
          :class="{ 'active': selectedView.type === 'category' && selectedView.id === category.id }"
          @click="selectCategoryView(category)"
        >
          <div class="category-content-main">
            <div class="category-info">
              <Mail v-if="category.category === 'EMAILS_RECEIVED'" class="category-icon" />
              <Send v-else-if="category.category === 'EMAILS_SENT'" class="category-icon" />
              <Inbox v-else class="category-icon" />
              <span class="category-title">{{ category.name }}</span>
            </div>
            <div class="category-badges">
              <span v-if="getCategoryUnreadCount(category.id) > 0" class="unread-badge">
                {{ getCategoryUnreadCount(category.id) }}
              </span>
              <span v-if="getCategoryCount(category.id) > 0" class="count-badge">
                {{ getCategoryCount(category.id) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Toate Mesajele Category -->
      <div class="messages-section">
        <div 
          class="category-item" 
          :class="{ 'active': selectedView.type === 'all' }"
          @click="selectAllView()"
        >
          <div class="category-content-main">
            <div class="category-info">
              <Inbox class="category-icon" />
              <span class="category-title">Toate Mesajele</span>
            </div>
            <div class="category-badges">
              <span v-if="getTotalUnreadCount() > 0" class="unread-badge">
                {{ getTotalUnreadCount() }}
              </span>
              <span v-if="getTotalEmailsCount() > 0" class="count-badge">
                {{ getTotalEmailsCount() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Labels Section -->
      <div class="messages-section">
        <div class="section-header" @click="toggleSection('labels')">
          <div class="section-title">
            <Tag class="section-icon" />
            Etichete
            <button @click.stop="showLabelModal = true" class="add-label-btn">
              <Plus class="plus-icon" />
            </button>
          </div>
          <ChevronDown 
            class="toggle-icon" 
            :class="{ 'rotated': !sectionsCollapsed.labels }"
          />
        </div>
        
        <div v-if="!sectionsCollapsed.labels" class="category-content">
          <div v-if="inboxLabels.length === 0" class="empty-labels">
            <Tag class="empty-icon" />
            <span>Nu există etichete</span>
          </div>

          <div 
            v-else
            v-for="label in inboxLabels" 
            :key="label.id"
            class="label-item"
            :class="{ 'active': selectedView.type === 'label' && selectedView.id === label.id }"
            @click="selectLabelView(label)"
          >
            <div class="label-indicator" :style="{ backgroundColor: label.color }"></div>
            <component :is="label.icon" class="label-icon" />
            <span>{{ label.label }}</span>
            <span v-if="getLabelCount(label.id) > 0" class="count-badge">
              {{ getLabelCount(label.id) }}
            </span>
            <div class="label-actions">
              <button @click.stop="editLabel(label)" class="label-action-btn edit-btn">
                <Edit class="action-icon" />
              </button>
              <button @click.stop="confirmDeleteLabel(label)" class="label-action-btn delete-btn">
                <Trash class="action-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Removed Legacy Forms Section - now using unified Inbox system -->

      <!-- Trash Section -->
      <div class="messages-section trash-section">
        <div 
          class="section-header trash-header" 
          @click="selectTrashView()"
          :class="{ 'active': selectedView.type === 'trash' }"
        >
          <div class="section-title">
            <Trash2 class="section-icon trash-icon" />
            <span>Coș de gunoi</span>
            <span v-if="deletedEmailsCount > 0" class="trash-badge">{{ deletedEmailsCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Label Management Modal -->
    <div v-if="showLabelModal" class="modal-overlay" @click="closeLabelModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingLabel ? 'Editează Eticheta' : 'Adaugă Eticheta Nouă' }}</h3>
          <button @click="closeLabelModal" class="close-btn">
            <X class="close-icon" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>Nume etichetă</label>
            <input 
              v-model="labelForm.label" 
              type="text" 
              placeholder="Introdu numele etichetei"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>Culoare</label>
            <div class="color-picker">
              <input 
                v-model="labelForm.color" 
                type="color" 
                class="color-input"
              />
              <input 
                v-model="labelForm.color" 
                type="text" 
                placeholder="#000000"
                class="color-text"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label>Iconiță</label>
            <select v-model="labelForm.icon" class="form-select">
              <option value="Tag">Tag</option>
              <option value="Briefcase">Briefcase</option>
              <option value="Bookmark">Bookmark</option>
              <option value="Star">Star</option>
              <option value="Heart">Heart</option>
              <option value="Archive">Archive</option>
              <option value="Flag">Flag</option>
            </select>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeLabelModal" class="btn-cancel">Anulează</button>
          <button @click="saveLabel" class="btn-save" :disabled="!labelForm.label">
            {{ editingLabel ? 'Actualizează' : 'Creează' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Settings Modal -->
    <SettingsModal
      :is-visible="showSettings"
      @close="closeSettings"
    />

    <!-- Delete Label Confirmation Modal -->
    <ConfirmDialog
      :is-visible="showDeleteConfirm"
      type="danger"
      title="Ștergere Etichetă"
      :message="`Sigur dorești să ștergi eticheta '${labelToDelete?.label}'? Această acțiune va elimina eticheta de pe toate email-urile care o folosesc.`"
      :details="getLabelDeleteDetails"
      confirm-text="Șterge"
      cancel-text="Anulează"
      @confirm="deleteLabel"
      @cancel="closeDeleteConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import '@/assets/sidebar.css';
import axios from 'axios'
import {
  Shield,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Mail,
  Inbox,
  Send,
  Trash2,
  Tag,
  Plus,
  X,
  Edit,
  Trash
} from 'lucide-vue-next'
import SettingsModal from './SettingsModal.vue'
import ConfirmDialog from './ConfirmDialog.vue'

// Types
interface InboxCategory {
  id: number
  category: string
  name: string
}

interface InboxLabel {
  id: number
  label: string
  color: string
  icon: string
}

interface SelectedView {
  type: 'category' | 'label' | 'all' | 'trash'
  id?: number
  data?: InboxCategory | InboxLabel
}

const emit = defineEmits<{
  selectInboxView: [view: SelectedView]
  refreshNeeded: []
}>()

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

// State
const showUserMenu = ref(false)
const showSettings = ref(false)
const showLabelModal = ref(false)
const editingLabel = ref<InboxLabel | null>(null)
const showDeleteConfirm = ref(false)
const labelToDelete = ref<InboxLabel | null>(null)
const sectionsCollapsed = ref<Record<string, boolean>>({
  labels: false
})

// Inbox data
const inboxCategories = ref<InboxCategory[]>([])
const inboxLabels = ref<InboxLabel[]>([])
const deletedEmailsCount = ref(0)
const selectedView = ref<SelectedView>({ type: 'all' })

// Label form
const labelForm = ref({
  label: '',
  color: '#34d186',
  icon: 'Tag'
})

// Computed for inbox counts using counts endpoint data
const getCategoryCount = (categoryId: number) => {
  if (!countsData.value?.categories) return 0
  const category = countsData.value.categories.find((cat: any) => cat.id === categoryId)
  return category?.total || 0
}

const getCategoryUnreadCount = computed(() => {
  return (categoryId: number) => {
    if (!countsData.value?.categories) return 0
    const category = countsData.value.categories.find((cat: any) => cat.id === categoryId)
    return category?.unread || 0
  }
})

const getLabelCount = (labelId: number) => {
  if (!countsData.value?.labels) return 0
  const label = countsData.value.labels.find((lbl: any) => lbl.id === labelId)
  return label?.total || 0
}

const getTotalEmailsCount = () => {
  return countsData.value?.total || 0
}

const getTotalUnreadCount = () => {
  return countsData.value?.totalUnread || 0
}

// Functions
function toggleSection(section: string) {
  sectionsCollapsed.value[section] = !sectionsCollapsed.value[section]
}

function selectCategoryView(category: InboxCategory) {
  const view: SelectedView = { type: 'category', id: category.id, data: category }
  selectedView.value = view
  emit('selectInboxView', view)
}

function selectAllView() {
  const view: SelectedView = { type: 'all' }
  selectedView.value = view
  emit('selectInboxView', view)
}

function selectLabelView(label: InboxLabel) {
  const view: SelectedView = { type: 'label', id: label.id, data: label }
  selectedView.value = view
  emit('selectInboxView', view)
}

function selectTrashView() {
  const view: SelectedView = { type: 'trash' }
  selectedView.value = view
  emit('selectInboxView', view)
}

// Legacy message selection methods removed

function openSettings() {
  showUserMenu.value = false
  showSettings.value = true
}

function closeSettings() {
  showSettings.value = false
}

function closeLabelModal() {
  showLabelModal.value = false
  editingLabel.value = null
  labelForm.value = {
    label: '',
    color: '#34d186',
    icon: 'Tag'
  }
}

function editLabel(label: InboxLabel) {
  editingLabel.value = label
  labelForm.value = {
    label: label.label,
    color: label.color,
    icon: label.icon
  }
  showLabelModal.value = true
}

function confirmDeleteLabel(label: InboxLabel) {
  labelToDelete.value = label
  showDeleteConfirm.value = true
}

  const getLabelDeleteDetails = computed(() => {
    if (!labelToDelete.value) return ''
    let message = '';
    
    const count = getLabelCount(labelToDelete.value.id)
    if (labelToDelete.value.id > 1) {
      return message += `${count} email-uri vor fi afectate.`;
    } else {
      return message += `${count} email va fi afectat.`;
    }
  });

function closeDeleteConfirm() {
  showDeleteConfirm.value = false
  labelToDelete.value = null
}

async function deleteLabel() {
  if (!labelToDelete.value) return
  
  // Store the label ID before clearing the reference
  const deletedLabelId = labelToDelete.value.id
  const labelName = labelToDelete.value.label
  
  try {
    await axios.delete(`/api/inbox/labels/${deletedLabelId}`)
    await fetchInboxLabels()
    await fetchEmailCounts()
    
    // If the deleted label was currently selected, switch to All view
    if (selectedView.value.type === 'label' && selectedView.value.id === deletedLabelId) {
      selectAllView()
    }
    
    toastStore.success(`Eticheta "${labelName}" a fost ștearsă cu succes!`)
    closeDeleteConfirm()
  } catch (error) {
    console.error('Error deleting label:', error)
    toastStore.error('Eroare la ștergerea etichetei')
    closeDeleteConfirm()
  }
}

async function saveLabel() {
  try {
    const url = editingLabel.value 
      ? `/api/inbox/labels/${editingLabel.value.id}` 
      : '/api/inbox/labels'
    
    const method = editingLabel.value ? 'patch' : 'post'
    const action = editingLabel.value ? 'editată' : 'creată'
    
    await axios[method](`http://localhost:4099${url}`, labelForm.value)
    
    await fetchInboxLabels()
    toastStore.success(`Eticheta "${labelForm.value.label}" a fost ${action} cu succes!`)
    closeLabelModal()
  } catch (error) {
    console.error('Error saving label:', error)
    toastStore.error(`Eroare la ${editingLabel.value ? 'editarea' : 'crearea'} etichetei`)
  }
}

async function fetchInboxCategories() {
  try {
    const response = await axios.get('/api/inbox/categories')
    inboxCategories.value = response.data.data
    
    // Set default collapsed state for categories
    response.data.data.forEach((category: InboxCategory) => {
      if (sectionsCollapsed.value[`category-${category.id}`] === undefined) {
        sectionsCollapsed.value[`category-${category.id}`] = true
      }
    })
  } catch (error) {
    console.error('Error fetching inbox categories:', error)
  }
}

async function fetchInboxLabels() {
  try {
    const response = await axios.get('/api/inbox/labels')
    inboxLabels.value = response.data.data
  } catch (error) {
    console.error('Error fetching inbox labels:', error)
  }
}

// Count data from the counts endpoint
const countsData = ref<any>(null)

async function fetchEmailCounts() {
  try {
    const response = await axios.get('/api/inbox/counts')
    countsData.value = response.data.data
    deletedEmailsCount.value = countsData.value.trash || 0
  } catch (error) {
    console.error('Error fetching email counts:', error)
    countsData.value = null
    deletedEmailsCount.value = 0
  }
}

async function handleLogout() {
  authStore.logout()
  router.push('/login')
}

// Function to update specific view counts from pagination data
const updateViewCounts = (view: any, pagination: any) => {
  if (!countsData.value) return
  
  if (view.type === 'all') {
    // Update total unread for "Toate Mesajele"
    countsData.value.totalUnread = pagination.unread
    countsData.value.total = pagination.total
  } else if (view.type === 'category' && view.id) {
    // Update specific category counts
    const category = countsData.value.categories?.find((cat: any) => cat.id === view.id)
    if (category) {
      category.total = pagination.total
      category.unread = pagination.unread
    }
  } else if (view.type === 'label' && view.id) {
    // Update specific label counts (labels don't have unread, only total)
    const label = countsData.value.labels?.find((lbl: any) => lbl.id === view.id)
    if (label) {
      label.total = pagination.total
    }
  }
}

// Expose methods for parent components
defineExpose({
  refreshInboxData: async () => {
    await fetchEmailCounts()
  },
  updateViewCounts
})

onMounted(async () => {
  // Load inbox data
  await Promise.all([
    fetchInboxCategories(),
    fetchInboxLabels(),
    fetchEmailCounts()
  ])
  
  // Legacy message store functionality removed
  
  // Close user menu when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target?.closest('.user-menu')) {
      showUserMenu.value = false
    }
  })
})
</script>