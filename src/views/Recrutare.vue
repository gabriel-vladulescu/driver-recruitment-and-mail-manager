<template>
  <div>
    <AppHeader />
    <div class="hero-section recruitment-hero">
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
            <Car class="badge-icon" />
            <span>Parteneriatul #1 din Timișoara</span>
          </div>
          <h1>Alătură-te Echipei Bloom</h1>
          <p class="lead">Devino șofer profesionist și lucrează pentru <strong>Bolt și Uber</strong> prin parteneriatul nostru din Timișoara</p>
          <div class="hero-stats">
            <div class="stat">
              <div class="stat-number">6,000+ RON</div>
              <div class="stat-label">Venit mediu lunar</div>
            </div>
            <div class="stat">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Suport dedicat</div>
            </div>
            <div class="stat">
              <div class="stat-number">48h</div>
              <div class="stat-label">Aprobare rapidă</div>
            </div>
          </div>
          <div class="hero-cta">
            <a :href="ctaHref" class="btn-cta btn-large">
              <Zap class="btn-icon" />
              Aplică acum!
            </a>
            <p class="cta-note">✓ Fără taxe ascunse ✓ Aprobare rapidă ✓ Suport complet</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <BenefitsSection />

    <!-- Earnings Calculator Section -->
    <EarningsCalculator />

    <!-- Requirements Section -->
    <RequirementsSection />

    <!-- Process Section -->
    <ProcessSection />

    <!-- Statistics Section -->
    <StatisticsSection />

    <!-- Testimonials Section -->
    <!-- <TestimonialsSection /> -->

    <!-- Application Form and FAQ Section -->
    <div id="application-section" class="application-section">
      <div class="container">
        <div class="form-faq-layout">
          <div class="form-column">
            <ApplicationForm />
          </div>
          <div class="faq-column">
            <div class="faq-content">
              <h2>Întrebări frecvente</h2>
              <div class="faq-list">
                <div class="faq-item">
                  <h3>Pentru ce platforme voi lucra?</h3>
                  <p>Prin parteneriatul Bloom, vei lucra simultan pentru Bolt și Uber, maximizând astfel veniturile tale.</p>
                </div>
                <div class="faq-item">
                  <h3>Ce sprijin ofer Bloom?</h3>
                  <p>Oferim suport complet: documentație, training, asistență tehnică și suport local în Timișoara.</p>
                </div>
                <div class="faq-item">
                  <h3>Cum funcționează plățile?</h3>
                  <p>Primești plăți regulate de la ambele platforme, plus beneficii suplimentare oferite de Bloom.</p>
                </div>
                <div class="faq-item">
                  <h3>Pot lucra part-time?</h3>
                  <p>Da, programul este complet flexibil. Poți lucra full-time sau part-time, după propriul orar.</p>
                </div>
                <div class="faq-item">
                  <h3>Cât de repede pot începe?</h3>
                  <p>După completarea formularului și verificarea documentelor, poți începe în cel mai scurt timp.</p>
                </div>
                <div class="faq-item">
                  <h3>Există costuri ascunse?</h3>
                  <p>Nu! Înscrierea și toate serviciile de suport Bloom sunt 100% gratuite pentru șoferi. Toate celelalte informații și eventualele costuri sunt prezentate clar și transparent, fără surprize.</p>
                  <router-link to="/ghidul-soferului" class="contact-link">
                    <span>Consultă ghid complet</span>
                    <ExternalLink class="link-icon" />
                  </router-link>
                </div>
              </div>
              
              <div class="contact-info">
                <h3>Încă ai întrebări?</h3>
                <p>Suntem aici să te ajutăm!</p>
                <router-link to="/contact" class="btn-contact">
                  <MessageCircle class="btn-icon" />
                  Contactează-ne
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { Car, Zap, MessageCircle, ExternalLink } from 'lucide-vue-next'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BenefitsSection from '@/components/BenefitsSection.vue'
import EarningsCalculator from '@/components/EarningsCalculator.vue'
import RequirementsSection from '@/components/RequirementsSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import StatisticsSection from '@/components/StatisticsSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import ApplicationForm from '@/components/ApplicationForm.vue'
import '@/assets/styles/shared.css'

export default {
  name: 'Recrutare',
  components: {
    Car,
    Zap,
    MessageCircle,
    ExternalLink,
    AppHeader,
    AppFooter,
    BenefitsSection,
    EarningsCalculator,
    RequirementsSection,
    ProcessSection,
    StatisticsSection,
    TestimonialsSection,
    ApplicationForm
  },
  data() {
    return {
      isMobile: false
    }
  },
  computed: {
    ctaHref() {
      return this.isMobile ? '#contact-form' : '#application-section'
    }
  },
  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768
    }
  }
}
</script>

<style scoped>
.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #34d186;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}

.contact-link:hover {
  color: #28a745;
  text-decoration: underline;
}

.link-icon {
  width: 18px;
  height: 18px;
}

/* Recruitment-specific styles */
.recruitment-hero {
  padding-bottom: 0;
}

.lead {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.95);
  max-width: 700px;
  margin: 0 auto 3rem auto;
  line-height: 1.6;
}

.lead strong {
  color: #fff;
  font-weight: 700;
}

.hero-cta {
  margin-top: 2rem;
}

.btn-cta {
  background: linear-gradient(45deg, #fff 0%, #f8f9fa 100%);
  color: #34d186;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  background: linear-gradient(45deg, #f8f9fa 0%, #fff 100%);
  color: #28a745;
  text-decoration: none;
}

.cta-note {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.application-section {
  background: #f8f9fa;
  padding: 4rem 0;
}

.form-faq-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  align-items: start;
}

.form-column {
  min-height: 600px;
}

.faq-column {
  position: sticky;
  top: 2rem;
}

.faq-content {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  height: fit-content;
}

.faq-content h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #34d186;
  text-align: center;
}

.faq-list {
  margin-bottom: 2.5rem;
}

.faq-item {
  padding: 1.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.faq-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.faq-item:first-child {
  padding-top: 0;
}

.faq-item h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
  line-height: 1.4;
}

.faq-item p {
  color: #666;
  line-height: 1.5;
  font-size: 0.9rem;
  margin: 0;
}

.contact-info {
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
  text-align: center;
}

.contact-info h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.contact-info p {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.btn-contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #34d186 0%, #28a745 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(52, 209, 134, 0.3);
  border: none;
  cursor: pointer;
}

.btn-contact:hover {
  background: linear-gradient(45deg, #28a745 0%, #34d186 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 209, 134, 0.4);
  color: white;
  text-decoration: none;
}

.btn-contact .btn-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .recruitment-hero {
    padding-top: 120px;
  }
  
  .lead {
    font-size: 1.2rem;
  }
  
  .btn-large {
    padding: 16px 32px;
    font-size: 1.1rem;
  }
  
  .form-faq-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .faq-column {
    position: static;
    order: -1;
  }
  
  .faq-content {
    padding: 2rem;
  }
  
  .faq-content h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .recruitment-hero {
    padding-top: 100px;
  }
  
  .lead {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .btn-large {
    padding: 14px 24px;
    font-size: 1rem;
  }
  
  .cta-note {
    font-size: 0.8rem;
    margin-top: 0.75rem;
  }
  
  .application-section {
    padding: 3rem 0;
  }
  
  .form-faq-layout {
    gap: 1.5rem;
  }
  
  .faq-content {
    padding: 1.5rem;
  }
  
  .faq-content h2 {
    font-size: 1.3rem;
  }
  
  .faq-item {
    padding: 1rem 0;
  }
  
  .contact-info {
    padding-top: 1.5rem;
  }
}
</style>