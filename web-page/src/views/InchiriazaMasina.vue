<template>
  <div>
    <AppHeader />
    <div class="rental-contact-page">
      <div class="container">
        <div class="page-header">
          <div class="header-icon">
            <Car />
          </div>
          <h1>Închiriază-ți Mașina către Bloom</h1>
          <p class="lead">Transformă vehiculul tău într-o sursă de venit pasiv. Oferim siguranță completă și remunerație atractivă.</p>
        </div>

        <div class="content-grid">
          <div class="info-section">
            <div class="feature-highlight">
              <div class="highlight-icon">
                <Shield />
              </div>
              <div class="highlight-content">
                <h3>Siguranță Garantată</h3>
                <p>Vehiculul tău va fi folosit exclusiv pentru transport persoane prin platformele Bolt și Uber, cu asigurare completă și contract legal.</p>
              </div>
            </div>

            <div class="benefits-list">
              <h3>Avantajele Închirierii</h3>
              <div class="benefit-item">
                <div class="benefit-icon">📋</div>
                <div class="benefit-text">
                  <strong>Contract Legal Transparent</strong>
                  <span>Document oficial cu toate detaliile și condițiile clare</span>
                </div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">🛡️</div>
                <div class="benefit-text">
                  <strong>Asigurare Completă Inclusă</strong>
                  <span>Poliță de asigurare pentru orice eventualitate</span>
                </div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">💰</div>
                <div class="benefit-text">
                  <strong>Plată Garantată Lunară</strong>
                  <span>Venit sigur și la timp, indiferent de utilizare</span>
                </div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">🔧</div>
                <div class="benefit-text">
                  <strong>Mentenanță pe Cont Nostru</strong>
                  <span>Ne ocupăm complet de întreținere și reparații</span>
                </div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">⭐</div>
                <div class="benefit-text">
                  <strong>Șoferi Profesioniști</strong>
                  <span>Doar șoferi verificați și instruiți folosesc vehiculul</span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-card">
              <div class="form-header">
                <h3>Contactează-ne pentru Evaluare</h3>
                <p>Completează formularul și te contactăm în cel mai scurt timp pentru a discuta detaliile.</p>
              </div>

              <form @submit.prevent="submitForm" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="lastName">Nume *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      v-model="form.lastName" 
                      required 
                      placeholder="Popescu"
                    />
                  </div>
                  <div class="form-group">
                    <label for="firstName">Prenume *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="form.firstName" 
                      required 
                      placeholder="Ion"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="phone">Telefon *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone" 
                    required 
                    placeholder="07xx xxx xxx"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    placeholder="email@example.com"
                  />
                </div>

                <div class="form-group">
                  <label for="car-info">Informații Mașină *</label>
                  <textarea 
                    id="car-info" 
                    v-model="form.carInfo" 
                    required 
                    rows="3"
                    placeholder="Marca, model, an fabricație, km..."
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="message">Mesaj Suplimentar</label>
                  <textarea 
                    id="message" 
                    v-model="form.message" 
                    rows="3"
                    placeholder="Întrebări sau informații suplimentare..."
                  ></textarea>
                </div>

                <div class="form-group">
                  <label class="checkbox-label terms-label">
                    <input type="checkbox" v-model="form.acceptTerms" required>
                    <span class="checkmark"></span> 
                    <span> Am citit și sunt de acord cu 
                      <router-link to="/politica-confidentialitate" class="policy-link">Politica de confidențialitate</router-link> 
                      și 
                      <router-link to="/politica-cookies" class="policy-link">Politica de utilizare a cookie-urilor</router-link>.
                    </span>
                  </label>
                </div>

                <button type="submit" class="submit-btn" :disabled="isSubmitting || !canSubmit">
                  <Send v-if="!isSubmitting" />
                  <div v-else class="loading-spinner"></div>
                  {{ isSubmitting ? 'Se trimite...' : 'Trimite Cererea' }}
                </button>
              </form>

              <div class="contact-info">
                <div class="contact-item">
                  <Phone />
                  <span>{{ phoneNumber }}</span>
                </div>
                <div class="contact-item">
                  <Mail />
                  <span>{{ email }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
    
    <!-- Notification Popup -->
    <NotificationPopup 
      :show="showNotification" 
      :notification="notification" 
      @close="closeNotification"
    />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import NotificationPopup from '@/components/NotificationPopup.vue'
import { Car, Shield, Send, Phone, Mail } from 'lucide-vue-next'

export default {
  name: 'InchiriazaMasina',
  components: {
    AppHeader,
    AppFooter,
    NotificationPopup,
    Car,
    Shield,
    Send,
    Phone,
    Mail
  },
  data() {
    return {
      isSubmitting: false,
      phoneNumber: import.meta.env.VITE_PHONE_NUMBER || '0756123499',
      email: import.meta.env.VITE_EMAIL || 'contact@bloom.ro',
      formType: 'TYPE_EXTERNAL_CAR_RENT',
      showNotification: false,
      notification: {
        type: 'success',
        title: '',
        message: ''
      },
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        carInfo: '',
        message: '',
        acceptTerms: false
      }
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      try {
        const response = await fetch(`${apiUrl}/api/forms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: this.formType,
            formData: {
              ...this.form,
              source: window.location.pathname
            }
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Car rental form submitted successfully:', result);
        
        // Show notification popup with server response
        this.notification = {
          type: result.success ? 'success' : 'error',
          title: result.success ? 'Success' : 'Eroare',
          message: result.message || 'Cererea a fost trimisă cu succes!'
        };
        this.showNotification = true;
        
        // Reset form after showing notification
        this.resetForm();
        
      } catch (error) {
        console.error('Error submitting car rental form:', error);
        
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
      this.form = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        carInfo: '',
        message: '',
        acceptTerms: false
      }
    },
    
    closeNotification() {
      this.showNotification = false;
    }
  },
  computed: {
    canSubmit() {
      return this.form.acceptTerms;
    }
  }
}
</script>

<style scoped>
.rental-contact-page {
  padding-top: 120px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.header-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.3);
}

.header-icon svg {
  width: 50px;
  height: 50px;
  color: white;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.lead {
  font-size: 1.3rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.feature-highlight {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 2.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.2);
}

.highlight-icon {
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.highlight-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

.highlight-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.highlight-content p {
  opacity: 0.9;
  line-height: 1.6;
}

.benefits-list {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.benefits-list h3 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #1a1a1a;
  text-align: center;
}

.benefit-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.benefit-text {
  display: flex;
  flex-direction: column;
}

.benefit-text strong {
  color: #1a1a1a;
  margin-bottom: 0.3rem;
}

.benefit-text span {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.form-section {
  position: sticky;
  top: 2rem;
}

.form-card {
  background: white;
  padding: 3rem;
  border-radius: 25px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
  margin-bottom: 4rem;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-header h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.form-header p {
  color: #666;
  line-height: 1.6;
}

.contact-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff6b6b;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  border: none;
  padding: 1.2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
  margin-bottom: 2rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid #f0f0f0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  justify-content: center;
}

.contact-item svg {
  width: 18px;
  height: 18px;
  color: #ff6b6b;
}

@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .form-section {
    position: static;
  }
  
  .feature-highlight {
    flex-direction: column;
    text-align: center;
  }
  
  .highlight-icon {
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .form-card {
    padding: 2rem;
  }
  
  .benefits-list {
    padding: 2rem;
  }
  
  .feature-highlight {
    padding: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

/* Terms and Conditions Checkbox Styles */
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
  border-color: #ff6b6b;
  background: rgba(255, 107, 107, 0.05);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #ff6b6b;
  border-color: #ff6b6b;
  box-shadow: 0 2px 4px rgba(255, 107, 107, 0.3);
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
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
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
  color: #ff6b6b;
  text-decoration: none;
  font-weight: 600;
}

.policy-link:hover {
  text-decoration: underline;
}
</style>