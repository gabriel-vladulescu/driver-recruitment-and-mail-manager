<template>
  <div v-if="show" class="notification-overlay" @click="closePopup">
    <div class="notification-popup" @click.stop>
      <div class="notification-header" :class="notificationClass">
        <component :is="iconComponent" class="notification-icon" />
        <h3>{{ notification.title }}</h3>
        <button @click="closePopup" class="close-btn">
          <X />
        </button>
      </div>
      <div class="notification-body">
        <p>{{ notification.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircle, AlertCircle, Info, X } from 'lucide-vue-next'

export default {
  name: 'NotificationPopup',
  components: {
    CheckCircle,
    AlertCircle,
    Info,
    X
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    notification: {
      type: Object,
      default: () => ({
        type: 'success',
        title: '',
        message: ''
      })
    }
  },
  computed: {
    notificationClass() {
      return {
        'success': this.notification.type === 'success',
        'error': this.notification.type === 'error',
        'info': this.notification.type === 'info'
      }
    },
    iconComponent() {
      switch (this.notification.type) {
        case 'success':
          return 'CheckCircle'
        case 'error':
          return 'AlertCircle'
        case 'info':
          return 'Info'
        default:
          return 'CheckCircle'
      }
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    }
  },
  mounted() {
    if (this.show) {
      // Auto-close after 5 seconds for success notifications
      if (this.notification.type === 'success') {
        setTimeout(() => {
          this.closePopup()
        }, 5000)
      }
    }
  }
}
</script>

<style scoped>
.notification-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease;
}

.notification-popup {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  min-width: 350px;
  margin: 2rem;
  animation: slideIn 0.3s ease;
  overflow: hidden;
}

.notification-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.notification-header.success {
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.1) 0%, rgba(40, 167, 69, 0.1) 100%);
  border-bottom-color: rgba(52, 209, 134, 0.2);
}

.notification-header.error {
  background: linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(174, 42, 55, 0.1) 100%);
  border-bottom-color: rgba(220, 53, 69, 0.2);
}

.notification-header.info {
  background: linear-gradient(135deg, rgba(13, 110, 253, 0.1) 0%, rgba(10, 88, 202, 0.1) 100%);
  border-bottom-color: rgba(13, 110, 253, 0.2);
}

.notification-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.notification-header.success .notification-icon {
  color: #34d186;
}

.notification-header.error .notification-icon {
  color: #dc3545;
}

.notification-header.info .notification-icon {
  color: #0d6efd;
}

.notification-header h3 {
  flex: 1;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
  transition: all 0.3s ease;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.notification-body {
  padding: 1rem 2rem 2rem;
}

.notification-body p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .notification-popup {
    margin: 1rem;
    min-width: auto;
    max-width: none;
  }
  
  .notification-header {
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .notification-header h3 {
    font-size: 1.1rem;
  }
  
  .notification-body {
    padding: 1rem 1.5rem 1.5rem;
  }
  
  .notification-body p {
    font-size: 0.95rem;
  }
}
</style>