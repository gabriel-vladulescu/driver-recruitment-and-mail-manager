import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEmailStore = defineStore('email', () => {
  // Reactive trigger for email updates
  const updateTrigger = ref(0)
  
  // Navigation trigger for going back to list
  const backToListTrigger = ref(0)
  
  // Force refresh of email lists/details
  const triggerUpdate = () => {
    updateTrigger.value++
  }
  
  // Trigger navigation back to list
  const triggerBackToList = () => {
    backToListTrigger.value++
  }
  
  // Watch this to react to email changes
  const getUpdateTrigger = () => updateTrigger.value
  const getBackToListTrigger = () => backToListTrigger.value
  
  return {
    updateTrigger,
    triggerUpdate,
    getUpdateTrigger,
    backToListTrigger,
    triggerBackToList,
    getBackToListTrigger
  }
})