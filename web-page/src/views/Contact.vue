<template>
  <div>
    <AppHeader />
    
    <!-- Hero Section -->
    <div class="hero-section contact-hero">
      <div class="hero-background">
        <div class="hero-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <Headphones class="badge-icon" />
            <span>Suport dedicat 24/7</span>
          </div>
          <h1>Contactează-ne</h1>
          <p>Suntem aici să te ajutăm! Alege modalitatea preferată de contact și te vom răspunde rapid.</p>
          
          <div class="hero-stats">
            <div class="stat">
              <div class="stat-number">&lt; 2h</div>
              <div class="stat-label">Timp răspuns</div>
            </div>
            <div class="stat">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Suport disponibil</div>
            </div>
            <div class="stat">
              <div class="stat-number">98%</div>
              <div class="stat-label">Probleme rezolvate</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Methods Section -->
    <div class="contact-methods-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Modalități de contact</h2>
          <p class="section-subtitle">Alege metoda care ți se pare mai convenabilă</p>
        </div>
        
        <div class="contact-methods-grid">
          <div class="method-card method-primary">
            <div class="card-header">
              <div class="method-icon">
                <Phone />
              </div>
              <div class="method-badge">Rapid</div>
            </div>
            <div class="card-content">
              <h3>Suport telefonic</h3>
              <p>Sună-ne pentru suport imediat și asistență în timp real</p>
              <div class="method-details">
                <a :href="`tel:${phoneNumber}`" class="contact-link">
                  <Phone class="link-icon" />
                  {{ phoneNumber }}
                </a>
                <div class="availability">
                  <Clock class="availability-icon" />
                  <span>Luni - Duminică, 8:00 - 22:00</span>
                </div>
              </div>
            </div>
            <div class="card-accent"></div>
          </div>

          <div class="method-card">
            <div class="card-header">
              <div class="method-icon">
                <Mail />
              </div>
              <div class="method-badge">Detaliat</div>
            </div>
            <div class="card-content">
              <h3>Suport email</h3>
              <p>Scrie-ne pentru întrebări complexe și documentație</p>
              <div class="method-details">
                <a :href="`mailto:${email}`" class="contact-link">
                  <Mail class="link-icon" />
                  {{ email }}
                </a>
                <div class="availability">
                  <Timer class="availability-icon" />
                  <span>Răspundem în max 2 ore</span>
                </div>
              </div>
            </div>
            <div class="card-accent"></div>
          </div>

          <div class="method-card">
            <div class="card-header">
              <div class="method-icon">
                <MapPin />
              </div>
              <div class="method-badge">Local</div>
            </div>
            <div class="card-content">
              <h3>Sediu Timișoara</h3>
              <p>Vino să ne cunoști personal la biroul nostru din Timișoara</p>
              <div class="method-details">
                <div class="contact-link">
                  <MapPin class="link-icon" />
                  <span>Timișoara, România</span>
                </div>
                <div class="availability">
                  <Clock class="availability-icon" />
                  <span>Programează o întâlnire telefonic</span>
                </div>
              </div>
            </div>
            <div class="card-accent"></div>
          </div>
          
        </div>
      </div>
    </div>

    <!-- Contact Form Section -->
    <div class="contact-form-section">
      <div class="container">
        <div class="form-layout">
          <div class="form-column">
            <div class="form-container">
              <div class="form-header">
                <div class="form-icon">
                  <Send />
                </div>
                <h2>Trimite-ne un mesaj</h2>
                <p>Completează formularul și te vom contacta în cel mai scurt timp</p>
              </div>
              <form @submit.prevent="submitContactForm" class="contact-form">

                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">Prenume*</label>
                    <input type="text" id="firstName" v-model="contactForm.firstName" required placeholder="Nume">
                  </div>
                  <div class="form-group">
                    <label for="lastName">Nume*</label>
                    <input type="text" id="lastName" v-model="contactForm.lastName" required placeholder="Prenume">
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">Email*</label>
                  <input type="email" id="email" v-model="contactForm.email" required placeholder="exemplu@email.com">
                </div>

                <div class="form-group">
                  <label for="phone">Număr de telefon (opțional)</label>
                  <input type="tel" id="phone" v-model="contactForm.phone" placeholder="+40 733 123 456">
                </div>

                <div class="form-group">
                  <label for="subject">Subiect*</label>
                  <select id="subject" v-model="contactForm.subject" required>
                    <option value="">Selectează subiectul...</option>
                    <option value="aplicare-sofer">Aplicare ca șofer</option>
                    <option value="probleme-tehnice">Probleme tehnice</option>
                    <option value="plati-tarifare">Plăți și tarifare</option>
                    <option value="siguranta">Siguranță și securitate</option>
                    <option value="feedback">Feedback și sugestii</option>
                    <option value="altele">Altele</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Mesajul tău*</label>
                  <textarea 
                    id="message" 
                    v-model="contactForm.message" 
                    rows="5" 
                    placeholder="Descrie problema sau întrebarea ta în detaliu..."
                    required
                  ></textarea>
                </div>

                <div class="form-group">
                  <label class="checkbox-label terms-label">
                    <input type="checkbox" v-model="contactForm.acceptTerms" required>
                    <span class="checkmark"></span> 
                    <span> Am citit și sunt de acord cu 
                      <router-link to="/politica-confidentialitate" class="policy-link">Politica de confidențialitate</router-link> 
                      și 
                      <router-link to="/politica-cookies" class="policy-link">Politica de utilizare a cookie-urilor</router-link>.
                    </span>
                  </label>
                </div>

                <button type="submit" class="btn-primary submit-btn" :disabled="isSubmitting || !canSubmit">
                  <Loader v-if="isSubmitting" class="btn-icon spinning" />
                  <Send v-else class="btn-icon" />
                  {{ isSubmitting ? 'Se trimite...' : 'Trimite mesajul' }}
                </button>
              </form>
            </div>
          </div>
          
          <div class="info-column">
            <div class="contact-info-card">
              <h3>De ce să ne contactezi?</h3>
              <div class="info-features">
                <div class="info-feature">
                  <div class="feature-icon">
                    <Zap />
                  </div>
                  <div class="feature-content">
                    <h4>Răspuns rapid</h4>
                    <p>Echipa noastră răspunde în mai puțin de 2 ore</p>
                  </div>
                </div>
                <div class="info-feature">
                  <div class="feature-icon">
                    <Shield />
                  </div>
                  <div class="feature-content">
                    <h4>Suport specializat</h4>
                    <p>Experți în Bolt și Uber gata să te ajute</p>
                  </div>
                </div>
                <div class="info-feature">
                  <div class="feature-icon">
                    <Heart />
                  </div>
                  <div class="feature-content">
                    <h4>Asistență personalizată</h4>
                    <p>Soluții adaptate nevoilor tale specifice</p>
                  </div>
                </div>
              </div>
              
              <div class="contact-stats">
                <div class="contact-stat">
                  <div class="stat-number">1,500+</div>
                  <div class="stat-label">Mesaje rezolvate</div>
                </div>
                <div class="contact-stat">
                  <div class="stat-number">4.9/5</div>
                  <div class="stat-label">Rating satisfacție</div>
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
import { 
  Phone, 
  Mail, 
  Send, 
  Loader, 
  Headphones, 
  Clock, 
  Timer, 
  MessageCircle, 
  Circle, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  Shield, 
  Heart,
  MapPin
} from 'lucide-vue-next'
import '@/assets/styles/shared.css'

export default {
  name: 'Contact',
  components: {
    AppHeader,
    AppFooter,
    NotificationPopup,
    Phone,
    Mail,
    Send,
    Loader,
    Headphones,
    Clock,
    Timer,
    MessageCircle,
    Circle,
    CheckCircle,
    AlertCircle,
    Zap,
    Shield,
    Heart,
    MapPin
  },
  data() {
    return {
      phoneNumber: import.meta.env.VITE_PHONE_NUMBER || '0756123499',
      email: import.meta.env.VITE_EMAIL || 'contact@bloom.ro',
      formType: 'TYPE_CONTACT',
      contactForm: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
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
  methods: {
    async submitContactForm() {
      this.isSubmitting = true;
      
      try {
        const response = await fetch('http://localhost:4000/api/forms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mapping: {
              emailFromProperty: 'email',
              emailFromName: 'name', // We'll combine firstName + lastName
              emailTo: 'admin'
            },
            formData: {
              type: this.formType,
              name: `${this.contactForm.firstName} ${this.contactForm.lastName}`.trim(),
              email: this.contactForm.email,
              phone: this.contactForm.phone,
              subject: this.contactForm.subject,
              message: this.contactForm.message,
              source: window.location.pathname,
              acceptTerms: this.contactForm.acceptTerms
            }
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Contact form submitted successfully:', result);
        
        // Show notification popup with server response
        this.notification = {
          type: result.success ? 'success' : 'error',
          title: result.success ? 'Success' : 'Eroare',
          message: result.message || 'Formularul a fost trimis cu succes!'
        };
        this.showNotification = true;
        
        // Reset form after showing notification
        this.resetContactForm();
        
      } catch (error) {
        console.error('Error submitting contact form:', error);
        
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
    
    resetContactForm() {
      this.contactForm = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        acceptTerms: false
      };
    },
    
    closeNotification() {
      this.showNotification = false;
    }
  },
  computed: {
    canSubmit() {
      return this.contactForm.acceptTerms;
    }
  }
}
</script>

<style scoped>
/* Contact-specific styles */

/* Contact Methods Section */
.contact-methods-section {
  padding: 80px 0;
  background: white;
}

.contact-methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.method-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}

.method-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6c757d 0%, #495057 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: left;
}

.method-card:hover::before {
  transform: scaleX(1);
}

.method-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  border-color: rgba(52, 209, 134, 0.2);
}

.method-primary {
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.05) 0%, rgba(40, 167, 69, 0.05) 100%);
  border-color: rgba(52, 209, 134, 0.2);
  transform: scale(1.02);
}

.method-primary::before {
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
  transform: scaleX(1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.method-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 5px 15px rgba(52, 209, 134, 0.3);
}

.method-icon svg {
  width: 32px;
  height: 32px;
}

.method-badge {
  font-size: 0.9rem;
  font-weight: 700;
  color: #34d186;
  background: rgba(52, 209, 134, 0.1);
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  min-width: 40px;
  text-align: center;
}

.card-content h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.card-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.method-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #34d186;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  padding: 0.5rem 0;
}

.contact-link:hover {
  color: #28a745;
  text-decoration: underline;
}

.chat-trigger {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}

.link-icon {
  width: 18px;
  height: 18px;
}

.availability {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.availability.online {
  color: #28a745;
}

.availability-icon {
  width: 16px;
  height: 16px;
}

.card-accent {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.1) 0%, rgba(40, 167, 69, 0.1) 100%);
  border-radius: 50%;
  transform: translate(30px, 30px);
  transition: all 0.3s ease;
}

.method-card:hover .card-accent {
  transform: translate(25px, 25px) scale(1.1);
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.2) 0%, rgba(40, 167, 69, 0.2) 100%);
}

/* Contact Form Section */
.contact-form-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.form-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  align-items: start;
}

.form-column {
  min-height: 600px;
}

.form-container {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.form-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  box-shadow: 0 5px 15px rgba(52, 209, 134, 0.3);
}

.form-icon svg {
  width: 28px;
  height: 28px;
}

.form-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.form-header p {
  color: #666;
  font-size: 1rem;
}

.contact-form .form-group {
  margin-bottom: 1.5rem;
}

.contact-form .form-group label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1rem;
}

.contact-form .form-group input,
.contact-form .form-group select,
.contact-form .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  background: #fafafa;
}

.contact-form .form-group input:focus,
.contact-form .form-group select:focus,
.contact-form .form-group textarea:focus {
  outline: none;
  border-color: #34d186;
  background: white;
  box-shadow: 0 0 0 3px rgba(52, 209, 134, 0.1);
}

.contact-form .form-group textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
}

.contact-form .form-group input::placeholder,
.contact-form .form-group textarea::placeholder {
  color: #999;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.success-message,
.error-message {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.success-message {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error-message {
  background: linear-gradient(135deg, #f8d7da 0%, #f1b0b7 100%);
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.message-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.success-message div strong,
.error-message div strong {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}

.success-message div p,
.error-message div p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.submit-btn {
  width: 100%;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.info-column {
  position: sticky;
  top: 2rem;
}

.contact-info-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  height: fit-content;
}

.contact-info-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1a1a1a;
  text-align: center;
}

.info-features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.feature-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(52, 209, 134, 0.3);
}

.feature-icon svg {
  width: 24px;
  height: 24px;
}

.feature-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.feature-content p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.contact-stats {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
}

.contact-stat {
  text-align: center;
}

.contact-stat .stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #34d186;
  margin-bottom: 0.25rem;
}

.contact-stat .stat-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

@media (max-width: 968px) {
  .form-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .info-column {
    order: -1;
    position: static;
  }
  
  .contact-methods-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .contact-methods-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .method-card {
    padding: 2rem;
  }
  
  .method-primary {
    transform: none;
  }
  
  .form-container {
    padding: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .contact-info-card {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .method-card {
    padding: 1.5rem;
  }
  
  .method-icon {
    width: 60px;
    height: 60px;
  }
  
  .method-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .card-content h3 {
    font-size: 1.2rem;
  }
  
  .card-content p {
    font-size: 0.9rem;
  }
  
  .form-container {
    padding: 1.5rem;
  }
  
  .form-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
  }
  
  .form-icon {
    width: 50px;
    height: 50px;
  }
  
  .form-icon svg {
    width: 24px;
    height: 24px;
  }
  
  .form-header h2 {
    font-size: 1.5rem;
  }
  
  .form-header p {
    font-size: 0.95rem;
  }
  
  .contact-info-card {
    padding: 1.5rem;
  }
  
  .contact-info-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
  
  .feature-icon {
    width: 45px;
    height: 45px;
  }
  
  .feature-icon svg {
    width: 22px;
    height: 22px;
  }
  
  .feature-content h4 {
    font-size: 1rem;
  }
  
  .feature-content p {
    font-size: 0.9rem;
  }
  
  .contact-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .contact-stat .stat-number {
    font-size: 1.6rem;
  }
  
  .contact-stat .stat-label {
    font-size: 0.85rem;
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
</style>