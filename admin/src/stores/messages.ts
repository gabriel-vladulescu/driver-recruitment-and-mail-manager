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
    clearSelection
  }
})