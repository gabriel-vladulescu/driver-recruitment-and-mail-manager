import { useToastStore } from '@/stores/toast'
import { StatusTypes } from '@/types/api'
import type { ToastType } from '@/types/api'

export const toastHelper = {
  success: (message: string, duration?: number) => {
    const toastStore = useToastStore()
    return toastStore.success(message, duration)
  },

  error: (message: string, duration?: number) => {
    const toastStore = useToastStore()
    return toastStore.error(message, duration)
  },

  info: (message: string, duration?: number) => {
    const toastStore = useToastStore()
    return toastStore.info(message, duration)
  },

  warning: (message: string, duration?: number) => {
    const toastStore = useToastStore()
    return toastStore.warning(message, duration)
  },

  add: (message: string, type: StatusTypes, duration?: number) => {
    const toastStore = useToastStore();
    let toastType: ToastType = 'info';

    if (type === StatusTypes.Success) {
      toastType = 'success';
    } else if (type === StatusTypes.Error) {
      toastType = 'error';
    } else if (type === StatusTypes.Warning) {
      toastType = 'warning';
    } else if (type === StatusTypes.Info) {
      toastType = 'info';
    }
    return toastStore.addToast(message, toastType, duration)
  }
}