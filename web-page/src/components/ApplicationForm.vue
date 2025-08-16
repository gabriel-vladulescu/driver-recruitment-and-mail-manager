<template>
  <div id="contact-form" class="form-wrapper">
    <h2 class="section-title">Gata să începi?</h2>
    <p class="section-subtitle">Aplică acum și alătură-te comunității șoferilor Bloom</p>
      
      <div class="form-progress">
        <div class="progress-step" :class="{ active: currentStep >= 1 }">
          <div class="step-number">1</div>
          <span>Informații personale</span>
        </div>
        <div class="progress-step" :class="{ active: currentStep >= 2 }">
          <div class="step-number">2</div>
          <span>Vehicul</span>
        </div>
        <div class="progress-step" :class="{ active: currentStep >= 3 }">
          <div class="step-number">3</div>
          <span>Confirmare</span>
        </div>
      </div>
      
      <form @submit.prevent="submitForm" class="contact-form">
        
        <!-- Step 1: Personal Information -->
        <div v-if="currentStep === 1" class="form-step">
          <div class="step-header">
            <User class="step-icon" />
            <h3>Informații personale</h3>
            <p>Spune-ne cine ești</p>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Prenume*</label>
              <input type="text" id="firstName" v-model="formData.firstName" required placeholder="Ion">
            </div>
            <div class="form-group">
              <label for="lastName">Nume*</label>
              <input type="text" id="lastName" v-model="formData.lastName" required placeholder="Popescu">
            </div>
          </div>
          
          <div class="form-group">
            <label for="phone">Număr de telefon*</label>
            <input type="tel" id="phone" v-model="formData.phone" required placeholder="+40 700 123 456">
          </div>
          
          <div class="form-group">
            <label for="email">Email (opțional)</label>
            <input type="email" id="email" v-model="formData.email" placeholder="ion.popescu@email.com">
          </div>
          
          <div class="form-group">
            <label for="experience">Experiență ca șofer*</label>
            <select id="experience" v-model="formData.experience" required>
              <option value="">Selectează...</option>
              <option value="2-3-ani">2-3 ani</option>
              <option value="3-5-ani">3-5 ani</option>
              <option value="peste-5-ani">Peste 5 ani</option>
            </select>
          </div>
          
          <div class="step-actions">
            <button type="button" @click="nextStep" class="btn-primary btn-next" :disabled="!canProceedStep1">
              Continuă
              <ChevronRight class="btn-icon" />
            </button>
          </div>
        </div>
        
        <!-- Step 2: Vehicle Information -->
        <div v-if="currentStep === 2" class="form-step">
          <div class="step-header">
            <CarIcon class="step-icon" />
            <h3>Informații vehicul</h3>
            <p>Spune-ne despre mașina ta</p>
          </div>
          
          <div class="form-group">
            <label>Ai acces la un vehicul?*</label>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="hasVehicle" value="yes" v-model="formData.hasVehicle" required>
                <div class="radio-content">
                  <CheckCircle class="radio-icon" />
                  <span>Da, am vehicul propriu</span>
                </div>
              </label>
              <label class="radio-option">
                <input type="radio" name="hasVehicle" value="rental" v-model="formData.hasVehicle" required>
                <div class="radio-content">
                  <Key class="radio-icon" />
                  <span>Nu, doresc să închirez prin Bloom</span>
                </div>
              </label>
            </div>
          </div>
          
          <div v-if="formData.hasVehicle === 'yes'" class="vehicle-details">
            <div class="form-row">
              <div class="form-group">
                <label for="vehicleBrand">Marcă și model*</label>
                <input type="text" id="vehicleBrand" v-model="formData.vehicleBrand" required placeholder="ex: Dacia Logan">
              </div>
              <div class="form-group">
                <label for="vehicleYear">An fabricație*</label>
                <input type="number" id="vehicleYear" v-model="formData.vehicleYear" min="2010" max="2024" required placeholder="2020">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="vehicleFuel">Combustibil*</label>
                <select id="vehicleFuel" v-model="formData.vehicleFuel" required>
                  <option value="">Selectează...</option>
                  <option value="benzina">Benzină</option>
                  <option value="motorina">Motorină</option>
                  <option value="hibrid">Hibrid</option>
                  <option value="electric">Electric</option>
                  <option value="gpl">GPL</option>
                </select>
              </div>
              <div class="form-group">
                <label for="vehicleColor">Culoare*</label>
                <input type="text" id="vehicleColor" v-model="formData.vehicleColor" required placeholder="ex: Alb">
              </div>
            </div>
          </div>
          
          <div v-if="formData.hasVehicle === 'rental'" class="rental-info">
            <div class="info-card">
              <Info class="info-icon" />
              <div>
                <h4>Serviciu de închiriere vehicule</h4>
                <p>Bloom oferă vehicule în leasing pentru șoferi calificați. Te vom contacta cu detalii despre opțiunile disponibile.</p>
              </div>
            </div>
          </div>
          
          <div class="step-actions">
            <button type="button" @click="prevStep" class="btn-secondary">
              <ChevronLeft class="btn-icon" />
              Înapoi
            </button>
            <button type="button" @click="nextStep" class="btn-primary btn-next" :disabled="!canProceedStep2">
              Continuă
              <ChevronRight class="btn-icon" />
            </button>
          </div>
        </div>
        
        <!-- Step 3: Final Details and Confirmation -->
        <div v-if="currentStep === 3" class="form-step">
          <div class="step-header">
            <FileCheck class="step-icon" />
            <h3>Finalizează aplicația</h3>
            <p>Ultimele detalii și confirmarea</p>
          </div>
          
          <div class="form-group">
            <label for="availability">Când poți să începi?*</label>
            <select id="availability" v-model="formData.availability" required>
              <option value="">Selectează...</option>
              <option value="imediat">Imediat</option>
              <option value="1-saptamana">În 1 săptămână</option>
              <option value="2-saptamani">În 2 săptămâni</option>
              <option value="1-luna">În 1 lună</option>
              <option value="mai-mult-de=1-luna">Mai mult de 1 lună (vei fi intrebat ulterior)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Program preferat*</label>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="preferredSchedule" value="full-time" v-model="formData.preferredSchedule" required>
                <div class="radio-content">
                  <Clock class="radio-icon" />
                  <span>Full-time (8+ ore/zi)</span>
                </div>
              </label>
              <label class="radio-option">
                <input type="radio" name="preferredSchedule" value="part-time" v-model="formData.preferredSchedule" required>
                <div class="radio-content">
                  <Clock class="radio-icon" />
                  <span>Part-time (4-6 ore/zi)</span>
                </div>
              </label>
              <label class="radio-option">
                <input type="radio" name="preferredSchedule" value="weekend" v-model="formData.preferredSchedule" required>
                <div class="radio-content">
                  <Clock class="radio-icon" />
                  <span>Doar weekend</span>
                </div>
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="message">Informații suplimentare (Opțional)</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              rows="3" 
              placeholder="Spune-ne orice altceva pe care ai vrea să-l știm..."
            ></textarea>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label terms-label">
              <input type="checkbox" v-model="formData.acceptTerms" required>
              <span class="checkmark"></span> 
              <span> Am citit și sunt de acord cu 
                <router-link to="/politica-confidentialitate" class="policy-link">Politica de confidențialitate</router-link> 
                și 
                <router-link to="/politica-cookies" class="policy-link">Politica de utilizare a cookie-urilor</router-link>.
              </span>
            </label>
          </div>
          
          
          <div class="step-actions">
            <button type="button" @click="prevStep" class="btn-secondary">
              <ChevronLeft class="btn-icon" />
              Înapoi
            </button>
            <button type="submit" class="btn-primary submit-btn" :disabled="isSubmitting || !canSubmit">
              <Loader v-if="isSubmitting" class="btn-icon spinning" />
              <Send v-else class="btn-icon" />
              {{ isSubmitting ? 'Se trimite...' : 'Trimite aplicația' }}
            </button>
          </div>
        </div>
      </form>
      
      <!-- Notification Popup -->
      <NotificationPopup 
        :show="showNotification" 
        :notification="notification" 
        @close="closeNotification"
      />
  </div>
</template>

<script>
import NotificationPopup from '@/components/NotificationPopup.vue'
import { 
  Send, 
  Loader, 
  User, 
  Car as CarIcon, 
  FileCheck, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Key, 
  Info, 
  Clock 
} from 'lucide-vue-next'

export default {
  name: 'ApplicationForm',
  components: {
    NotificationPopup,
    Send,
    Loader,
    User,
    CarIcon,
    FileCheck,
    ChevronRight,
    ChevronLeft,
    CheckCircle,
    Key,
    Info,
    Clock
  },
  data() {
    return {
      currentStep: 1,
      formType: 'TYPE_RECRUITMENT',
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        hasVehicle: '',
        vehicleBrand: '',
        vehicleYear: '',
        vehicleFuel: '',
        vehicleColor: '',
        availability: '',
        preferredSchedule: '',
        message: '',
        acceptTerms: false
      },
      showNotification: false,
      notification: {
        type: 'success',
        title: '',
        message: ''
      },
      isSubmitting: false
    }
  },
  computed: {
    canProceedStep1() {
      return this.formData.firstName.trim() && 
             this.formData.lastName.trim() && 
             this.formData.phone.trim() && 
             this.formData.experience
    },
    canProceedStep2() {
      if (!this.formData.hasVehicle) return false
      if (this.formData.hasVehicle === 'rental') return true
      return this.formData.vehicleBrand.trim() && 
             this.formData.vehicleYear && 
             this.formData.vehicleFuel &&
             this.formData.vehicleColor.trim()
    },
    canSubmit() {
      return this.formData.availability && 
             this.formData.preferredSchedule && 
             this.formData.acceptTerms
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
      }
    },
    
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    
    async submitForm() {
      if (!this.canSubmit) return
      
      this.isSubmitting = true;
      const apiUrl = import.meta.env.VITE_MAIL_API_BASE_URL;

      try {
        const response = await fetch(`${apiUrl}/api/forms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mapping: {
              emailFromProperty: this.formData.email ? 'email' : 'phone', // Use email if available, otherwise phone
              emailFromName: 'name',
              emailTo: 'admin'
            },
            formData: {
              type: this.formType,
              name: `${this.formData.firstName} ${this.formData.lastName}`.trim(),
              email: this.formData.email || `${this.formData.phone}@phone.placeholder`, // Create placeholder email if no email
              phone: this.formData.phone,
              experience: this.formData.experience,
              hasVehicle: this.formData.hasVehicle,
              vehicleBrand: this.formData.vehicleBrand,
              vehicleYear: this.formData.vehicleYear,
              vehicleFuel: this.formData.vehicleFuel,
              vehicleColor: this.formData.vehicleColor,
              availability: this.formData.availability,
              preferredSchedule: this.formData.preferredSchedule,
              message: this.formData.message,
              source: window.location.pathname,
              acceptTerms: this.formData.acceptTerms
            }
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Application submitted successfully:', result);
        
        // Show notification popup with server response
        this.notification = {
          type: result.success ? 'success' : 'error',
          title: result.success ? 'Success' : 'Eroare',
          message: result.message || 'Aplicația a fost trimisă cu succes!'
        };
        this.showNotification = true;
        
        // Reset form after showing notification
        this.resetForm();
        
      } catch (error) {
        console.error('Error submitting application:', error);
        
        // Show error notification
        this.notification = {
          type: 'error',
          title: 'Eroare',
          message: error.message || 'A apărut o eroare. Te rugăm să încerci din nou.'
        };
        this.showNotification = true;
      } finally {
        this.isSubmitting = false;
      }
    },
    
    resetForm() {
      this.currentStep = 1;
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        hasVehicle: '',
        vehicleBrand: '',
        vehicleYear: '',
        vehicleFuel: '',
        vehicleColor: '',
        availability: '',
        preferredSchedule: '',
        message: '',
        acceptTerms: false
      };
    },
    
    closeNotification() {
      this.showNotification = false;
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  padding: 0;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.form-progress {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 0 2rem;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #999;
  font-weight: 500;
  transition: all 0.3s;
}

.progress-step.active {
  color: #34d186;
  font-weight: 600;
}

.step-number {
  width: 32px;
  height: 32px;
  border: 2px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.progress-step.active .step-number {
  background: #34d186;
  border-color: #34d186;
  color: white;
}

.contact-form {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.form-step {
  min-height: 400px;
}

.step-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.step-icon {
  width: 48px;
  height: 48px;
  color: #34d186;
  margin: 0 auto 1rem;
}

.step-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.step-header p {
  color: #666;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  background: #fafafa;
  resize: vertical;
}

.form-group textarea {
  min-height: 80px;
  line-height: 1.5;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #34d186;
  background: white;
  box-shadow: 0 0 0 3px rgba(52, 209, 134, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #999;
  font-family: inherit;
  font-size: inherit;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
}

.radio-option {
  display: block;
  cursor: pointer;
  position: relative;
}

.radio-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  transition: all 0.3s;
}

.radio-option input[type="radio"]:checked + .radio-content {
  background: rgba(52, 209, 134, 0.1);
  border-color: #34d186;
  color: #34d186;
  font-weight: 600;
}

.radio-icon {
  width: 20px;
  height: 20px;
  color: #999;
  transition: color 0.3s;
}

.radio-option input[type="radio"]:checked + .radio-content .radio-icon {
  color: #34d186;
}

.vehicle-details {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: rgba(52, 209, 134, 0.05);
  border: 1px solid rgba(52, 209, 134, 0.2);
  border-radius: 10px;
}

.rental-info {
  margin-top: 1.5rem;
}

.info-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 10px;
}

.info-icon {
  width: 24px;
  height: 24px;
  color: #3b82f6;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.info-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.info-card p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.step-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f0f0f0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.success-message {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  color: #155724;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid #c3e6cb;
  font-weight: 600;
}

.error-message {
  background: linear-gradient(135deg, #f8d7da 0%, #f1b0b7 100%);
  color: #721c24;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid #f5c6cb;
  font-weight: 600;
}

.btn-primary {
  background: linear-gradient(45deg, #34d186 0%, #28a745 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(52, 209, 134, 0.3);
}

.btn-secondary {
  background: #f8f9fa;
  color: #666;
  padding: 12px 24px;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-next {
  padding: 14px 28px;
  font-size: 1.1rem;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(45deg, #28a745 0%, #34d186 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 209, 134, 0.4);
}

.btn-secondary:hover {
  background: #e9ecef;
  border-color: #34d186;
  color: #34d186;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.submit-btn {
  min-width: 200px;
}

.checkbox-label {
  display: flex !important;
  align-items: flex-start !important;
  cursor: pointer;
  font-weight: 400;
  margin-bottom: 0;
  gap: 0.75rem;
  line-height: 1.5;
  position: relative;
}

.checkbox-label input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  background: #fafafa;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-label:hover .checkmark {
  border-color: #34d186;
  background: rgba(52, 209, 134, 0.05);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #34d186;
  border-color: #34d186;
  box-shadow: 0 2px 4px rgba(52, 209, 134, 0.3);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '';
  position: absolute;
  top: 0px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  opacity: 1;
}

.checkbox-label input[type="checkbox"]:focus + .checkmark {
  box-shadow: 0 0 0 3px rgba(52, 209, 134, 0.2);
}

.terms-label {
  font-size: 0.9rem;
  color: #555;
}

.checkbox-label span:not(.checkmark) {
  flex: 1;
  color: #333;
  font-size: 0.95rem;
}

.policy-link {
  color: #34d186;
  text-decoration: none;
  font-weight: 600;
}

.policy-link:hover {
  text-decoration: underline;
}

.checkbox-group-inline {
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  margin-bottom: 0;
}

.checkbox-label input[type="checkbox"],
.checkbox-label input[type="radio"] {
  width: 18px;
  height: 18px;
  margin-right: 0.5rem;
  margin-bottom: 0;
  cursor: pointer;
}

.checkbox-label input[type="radio"] {
  accent-color: #34d186;
}

.checkbox-label input[type="checkbox"] {
  accent-color: #34d186;
}

.vehicle-details {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #f0f0f0;
  border-radius: 8px;
  border-left: 4px solid #34d186;
}

.terms-label {
  font-size: 0.9rem;
  line-height: 1.5;
}

.policy-link {
  color: #34d186;
  text-decoration: none;
  font-weight: 600;
}

.policy-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .form-progress {
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .progress-step {
    font-size: 0.9rem;
  }
  
  .progress-step span {
    display: none;
  }
  
  .contact-form {
    padding: 2rem;
    max-width: none;
    margin: 0 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .step-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn-secondary,
  .btn-primary {
    width: 100%;
    justify-content: center;
  }
  
  .radio-group {
    gap: 0.75rem;
  }
  
  .vehicle-details {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.95rem;
  }
  
  .contact-form {
    padding: 1.5rem;
    margin: 0 0.5rem;
  }
  
  .form-step {
    min-height: 300px;
  }
  
  .step-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
  }
  
  .step-icon {
    width: 40px;
    height: 40px;
  }
  
  .step-header h3 {
    font-size: 1.3rem;
  }
  
  .form-progress {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .step-number {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
  
  .checkbox-label {
    gap: 0.5rem;
  }
  
  .checkmark {
    width: 18px;
    height: 18px;
  }
  
  .checkbox-label span:not(.checkmark) {
    font-size: 0.9rem;
  }
}
</style>