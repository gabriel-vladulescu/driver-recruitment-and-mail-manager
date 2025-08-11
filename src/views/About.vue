<template>
  <div>
    <AppHeader />
    
    <!-- Hero Section with Integrated Tabs -->
    <div class="hero-section about-hero">
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
            <Building class="badge-icon" />
            <span>Povestea noastră</span>
          </div>
          <h1>Despre Bloom</h1>
          <p>Parteneriatul de încredere pentru călători și șoferi profesioniști în toată România</p>
          
          <div class="hero-stats">
            <div class="stat">
              <div class="stat-number">50k+</div>
              <div class="stat-label">Călătorii realizate</div>
            </div>
            <div class="stat">
              <div class="stat-number">500+</div>
              <div class="stat-label">Șoferi activi</div>
            </div>
            <div class="stat">
              <div class="stat-number">2025</div>
              <div class="stat-label">Anul înființării</div>
            </div>
            <div class="stat">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Suport local</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Content -->
    <div class="about-content">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Cine suntem</h2>
          <p class="section-subtitle">Echipa Bloom - parteneri de încredere pentru succesul tău</p>
        </div>

        <div class="story-section">
          <div class="story-grid">
            <div class="story-text">
              <h3>Misiunea noastră</h3>
              <p>
                Bloom a fost creată în 2025 cu o misiune clară: să revoluționăm transportul urban în România. 
                Pentru călători, oferim servicii sigure, rapide și accesibile, iar pentru șoferi, cel mai bun 
                parteneriat pentru lucrul cu platformele Bolt și Uber, maximizând veniturile și oferind suport complet.
              </p>
              <p>
                Începând din Timișoara, ne extindem acum în toată țara, conectând comunități și oferind 
                oportunități de dezvoltare atât călătorilor, cât și partenerilor noștri șoferi. Înțelegem 
                nevoile ambelor părți și am construit o echipă dedicată pentru a oferi cea mai bună experiență.
              </p>
              <p>
                Viziunea noastră este să devenim liderul pieței de ride-sharing din România, creând un ecosistem 
                sustenabil care beneficiază întreaga comunitate - de la călători la șoferi și până la orașele 
                în care activăm.
              </p>
            </div>
            <div class="story-image">
              <div class="image-placeholder">
                <Users class="placeholder-icon" />
              </div>
            </div>
          </div>
        </div>

        <div class="values-section">
          <h3 class="values-title">Valorile noastre</h3>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <Shield />
              </div>
              <h4>Transparență</h4>
              <p>Comunicare deschisă și onestă în toate parteneriatele noastre</p>
            </div>
            
            <div class="value-card">
              <div class="value-icon">
                <Heart />
              </div>
              <h4>Suport dedicat</h4>
              <p>Echipă locală gata să te ajute oricând ai nevoie</p>
            </div>
            
            <div class="value-card">
              <div class="value-icon">
                <TrendingUp />
              </div>
              <h4>Creștere</h4>
              <p>Ne concentrăm pe maximizarea veniturilor și dezvoltarea profesională</p>
            </div>
            
            <div class="value-card">
              <div class="value-icon">
                <Award />
              </div>
              <h4>Calitate</h4>
              <p>Standarde înalte în toate serviciile și parteneriatul cu șoferii</p>
            </div>
          </div>
        </div>

        <!-- Tab Switches for Benefits Section -->
        <div class="benefits-tabs">
          <div class="switch-tabs">
            <button 
              @click="activeSection = 'customers'"
              :class="{ active: activeSection === 'customers' }"
              class="switch-tab customer-tab"
            >
              <MapPin class="tab-icon" />
              <span>Pentru călători</span>
            </button>
            <button 
              @click="activeSection = 'drivers'"
              :class="{ active: activeSection === 'drivers' }"
              class="switch-tab driver-tab"
            >
              <Car class="tab-icon" />
              <span>Pentru șoferi</span>
            </button>
          </div>
        </div>

        <!-- Customer Benefits -->
        <div class="why-bloom-section" v-show="activeSection === 'customers'">
          <div class="section-header">
            <h2 class="section-title">De ce să alegi Bloom pentru călătoriile tale?</h2>
            <p class="section-subtitle">Avantajele clare pentru călători</p>
          </div>

          <div class="benefits-grid">
            <div class="benefit-card featured">
              <div class="benefit-icon">
                <Shield />
              </div>
              <h4>Siguranță maximă</h4>
              <p>Șoferi verificați, mașini asigurate și trasabilitate completă pentru fiecare cursă</p>
              <div class="benefit-highlight">100% sigur</div>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <Zap />
              </div>
              <h4>Răspuns rapid</h4>
              <p>Timp de așteptare mediu sub 5 minute în zonele centrale din Timișoara</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <DollarSign />
              </div>
              <h4>Prețuri transparente</h4>
              <p>Tarife corecte, fără surprize, cu estimare exactă înainte de comandă</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <MapPin />
              </div>
              <h4>Acoperire completă</h4>
              <p>Servicii disponibile în toată zona metropolitană Timișoara</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <Headphones />
              </div>
              <h4>Suport clienți 24/7</h4>
              <p>Echipă de suport dedicată pentru orice problemă sau întrebare</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <Star />
              </div>
              <h4>Calitate garantată</h4>
              <p>Șoferi profesioniști cu rating ridicat și mașini întotdeauna curate</p>
            </div>
          </div>
        </div>

        <!-- Driver Benefits -->
        <div class="why-bloom-section" v-show="activeSection === 'drivers'">
          <div class="section-header">
            <h2 class="section-title">De ce să alegi Bloom ca șofer?</h2>
            <p class="section-subtitle">Avantajele clare ale parteneriatului cu noi</p>
          </div>

          <div class="benefits-grid">
            <div class="benefit-card featured">
              <div class="benefit-icon">
                <DollarSign />
              </div>
              <h4>Venituri optimizate</h4>
              <p>Acces la ambele platforme Bolt și Uber pentru maximizarea câștigurilor</p>
              <div class="benefit-highlight">+35% venituri medii</div>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <FileText />
              </div>
              <h4>Suport complet legal</h4>
              <p>Ne ocupăm de autorizările ARR, taxe, asigurare de sănătate și contractul de muncă — totul conform legislației.</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <Clock />
              </div>
              <h4>Aprobare rapidă</h4>
              <p>Proces de aplicare streamlined - poți începe în cel mai scurt timp de la aplicare</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <MapPin />
              </div>
              <h4>Expertiză locală</h4>
              <p>Cunoștere aprofundată a pieței din Timișoara și zonele învecinate</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <Headphones />
              </div>
              <h4>Suport tehnic 24/7</h4>
              <p>Echipă dedicată pentru rezolvarea rapidă a oricărei probleme</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">
                <Briefcase />
              </div>
              <h4>Servicii suplimentare</h4>
              <p>Rental car, servicii corporate și oportunități de business extra</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content" v-if="activeSection === 'customers'">
            <h2>Gata pentru următoarea ta călătorie?</h2>
            <p>Alătură-te miilor de călători care au ales Bloom pentru transport sigur și confortabil</p>
            <div class="cta-actions">
              <a :href="`tel:${phoneNumber}`" class="btn-primary btn-large">
                <MapPin class="btn-icon" />
                Comandă cursă
              </a>
              <router-link to="/contact" class="btn-secondary">
                <MessageCircle class="btn-icon" />
                Contactează-ne
              </router-link>
            </div>
          </div>
          
          <div class="cta-content" v-if="activeSection === 'drivers'">
            <h2>Gata să faci partea din echipa Bloom?</h2>
            <p>Alătură-te celor peste 500 de șoferi care au ales să colaboreze cu noi și să își maximizeze veniturile</p>
            <div class="cta-actions">
              <router-link to="/recrutare" class="btn-primary btn-large">
                <Car class="btn-icon" />
                Aplică acum
              </router-link>
              <router-link to="/contact" class="btn-secondary">
                <MessageCircle class="btn-icon" />
                Contactează-ne
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { 
  Building,
  Users,
  Shield,
  Heart,
  TrendingUp,
  Award,
  DollarSign,
  FileText,
  Clock,
  MapPin,
  Headphones,
  Briefcase,
  Car,
  MessageCircle,
  Zap,
  Star
} from 'lucide-vue-next'
import '@/assets/styles/shared.css'

export default {
  name: 'About',
  components: {
    AppHeader,
    AppFooter,
    Building,
    Users,
    Shield,
    Heart,
    TrendingUp,
    Award,
    DollarSign,
    FileText,
    Clock,
    MapPin,
    Headphones,
    Briefcase,
    Car,
    MessageCircle,
    Zap,
    Star
  },
  data() {
    return {
      activeSection: 'drivers', // Default to drivers section
      phoneNumber: import.meta.env.VITE_PHONE_NUMBER || '0756123456',
      email: import.meta.env.VITE_EMAIL || 'contact@bloom.ro'
    }
  },
  metaInfo: {
    title: 'Despre Bloom - Parteneriatul tău de încredere'
  }
}
</script>

<style scoped>
/* About page specific styles */
.about-hero {
  min-height: 600px;
  display: flex;
  align-items: center;
}

/* Benefits Section Tabs */
.benefits-tabs {
  text-align: center;
  margin: 4rem 0;
}

.switch-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.switch-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 25px;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  background: white;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 1rem;
  color: #666;
}

.switch-tab.active {
  background: linear-gradient(45deg, #34d186 0%, #28a745 100%);
  border-color: #34d186;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(52, 209, 134, 0.4);
}

.switch-tab:hover:not(.active) {
  border-color: #34d186;
  background: #f8f9fa;
  transform: translateY(-2px);
}

.tab-icon {
  width: 20px;
  height: 20px;
}

/* Hero Content */
.hero-content {
  padding: 4rem 0;
  position: relative;
  z-index: 10;
  text-align: center;
}

.about-content {
  padding: 80px 0;
  background: #f8f9fa;
}

.story-section {
  margin-bottom: 5rem;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-text h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.story-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #666;
  margin-bottom: 1.5rem;
}

.story-image {
  text-align: center;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(52, 209, 134, 0.3);
}

.placeholder-icon {
  width: 80px;
  height: 80px;
  color: white;
}

.values-section {
  margin-bottom: 5rem;
}

.values-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 3rem;
  position: relative;
}

.values-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
  border-radius: 2px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 4px solid #34d186;
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(52, 209, 134, 0.2);
}

.value-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 5px 15px rgba(52, 209, 134, 0.3);
}

.value-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.value-card h4 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.value-card p {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
}

.why-bloom-section {
  margin-bottom: 5rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.benefit-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.benefit-card.featured {
  border: 2px solid #34d186;
  box-shadow: 0 8px 25px rgba(52, 209, 134, 0.2);
}

.benefit-card.featured::before {
  height: 6px;
}

.benefit-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 12px rgba(52, 209, 134, 0.3);
}

.benefit-icon svg {
  width: 28px;
  height: 28px;
  color: white;
}

.benefit-card h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.benefit-card p {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.benefit-highlight {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 1rem;
}

.cta-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 80px 0;
  color: white;
  position: relative;
}

.cta-card {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
}

.cta-content p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-actions .btn-primary {
  background: linear-gradient(45deg, #34d186 0%, #28a745 100%);
  color: white;
}

.cta-actions .btn-secondary {
  background: transparent;
  border: 2px solid #34d186;
  color: #34d186;
}

.cta-actions .btn-secondary:hover {
  background: #34d186;
  color: white;
}

@media (max-width: 768px) {
  .switch-tabs {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .switch-tab {
    width: 200px;
  }
  
  .story-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }
  
  .image-placeholder {
    width: 250px;
    height: 250px;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-actions a {
    width: 100%;
    max-width: 280px;
  }
}

@media (max-width: 480px) {
  .about-content {
    padding: 60px 0;
  }
  
  .value-card,
  .benefit-card {
    padding: 2rem;
  }
  
  .story-text h3 {
    font-size: 1.5rem;
  }
  
  .values-title {
    font-size: 1.8rem;
  }
  
  .image-placeholder {
    width: 200px;
    height: 200px;
  }
  
  .placeholder-icon {
    width: 60px;
    height: 60px;
  }
}
</style>