import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export interface Message {
  id: string
  type: string
  icon: string
  subject: string
  preview_message: string
  isRead: boolean
  timestamp: string
}

export interface MessageDetails {
  subject: string
  from: string
  contact: {
    phone: string
    email: string
  }
  data: Array<{
    title: string
    info: string
  }>
}

export interface SentMessage {
  id: string
  originalFormId: string | null
  subject: string
  sentTo: string
  message: string
  signature: string | null
  sentByUserId: string
  timestamp: string
}

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Message[]>([])
  const selectedMessage = ref<Message | null>(null)
  const selectedMessageDetails = ref<MessageDetails | null>(null)
  const sentMessages = ref<SentMessage[]>([])
  const selectedSentMessage = ref<SentMessage | null>(null)
  const loading = ref(false)
  const sentMessagesLoading = ref(false)
  const error = ref<string | null>(null)

  const unreadMessages = computed(() => 
    messages.value.filter(m => !m.isRead)
  )


  const activeMessages = computed(() => 
    messages.value
  )

  const sentMessagesCount = computed(() => 
    sentMessages.value.length
  )

  async function fetchMessages() {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(`${API_BASE_URL}/api/forms`)
      messages.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Eroare la încărcarea mesajelor'
      console.error('Error fetching messages:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchSentMessages() {
    sentMessagesLoading.value = true
    error.value = null

    try {
      const response = await axios.get(`${API_BASE_URL}/api/email/sent-replies`)
      sentMessages.value = response.data.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Eroare la încărcarea mesajelor trimise'
      console.error('Error fetching sent messages:', err)
    } finally {
      sentMessagesLoading.value = false
    }
  }

  async function fetchMessageDetails(id: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/forms/${id}`)
      selectedMessageDetails.value = response.data
      
      // Mark as read if it wasn't read
      const message = messages.value.find(m => m.id === id)
      if (message && !message.isRead) {
        await markAsRead(id, true)
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Eroare la încărcarea detaliilor'
      console.error('Error fetching message details:', err)
    }
  }

  async function markAsRead(id: string, isRead: boolean) {
    try {
      await axios.patch(`${API_BASE_URL}/api/forms/${id}/read`, { isRead })
      
      // Update local state
      const message = messages.value.find(m => m.id === id)
      if (message) {
        message.isRead = isRead
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Eroare la actualizarea statusului'
      console.error('Error updating read status:', err)
    }
  }

  async function deleteMessage(id: string) {
    try {
      await axios.delete(`${API_BASE_URL}/api/forms/${id}`)
      
      // Remove from local state
      const index = messages.value.findIndex(m => m.id === id)
      if (index !== -1) {
        messages.value.splice(index, 1)
      }

      // Clear selected message if it was deleted
      if (selectedMessage.value?.id === id) {
        selectedMessage.value = null
        selectedMessageDetails.value = null
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Eroare la ștergerea mesajului'
      console.error('Error deleting message:', err)
    }
  }

  function selectMessage(message: Message | null) {
    selectedMessage.value = message
    selectedSentMessage.value = null // Clear sent message selection
    if (message) {
      fetchMessageDetails(message.id)
    } else {
      selectedMessageDetails.value = null
    }
  }

  function selectSentMessage(sentMessage: SentMessage | null) {
    selectedSentMessage.value = sentMessage
    selectedMessage.value = null // Clear regular message selection
    selectedMessageDetails.value = null
  }

  function clearSelection() {
    selectedMessage.value = null
    selectedMessageDetails.value = null
    selectedSentMessage.value = null
  }

  return {
    messages: computed(() => messages.value),
    selectedMessage: computed(() => selectedMessage.value),
    selectedMessageDetails: computed(() => selectedMessageDetails.value),
    sentMessages: computed(() => sentMessages.value),
    selectedSentMessage: computed(() => selectedSentMessage.value),
    unreadMessages,
    activeMessages,
    sentMessagesCount,
    loading: computed(() => loading.value),
    sentMessagesLoading: computed(() => sentMessagesLoading.value),
    error: computed(() => error.value),
    fetchMessages,
    fetchSentMessages,
    fetchMessageDetails,
    markAsRead,
    deleteMessage,
    selectMessage,
    selectSentMessage,
    clearSelection
  }
})