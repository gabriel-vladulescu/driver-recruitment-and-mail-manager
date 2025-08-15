<template>
  <div>
    <AppHeader />
    
    <!-- Hero Section -->
    <div class="hero-section services-hero">
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
            <Star class="badge-icon" />
            <span>Servicii premium</span>
          </div>
          <h1>Serviciile Bloom</h1>
          <p>Soluții complete de transport și șoferi profesioniști în Timișoara</p>
          
          <div class="hero-stats">
            <div class="stat">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Disponibilitate</div>
            </div>
            <div class="stat">
              <div class="stat-number">5★</div>
              <div class="stat-label">Rating mediu</div>
            </div>
            <div class="stat">
              <div class="stat-number">200+</div>
              <div class="stat-label">Clienți mulțumiți</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="services-page">
      <div class="container">

        <div class="section-header">
          <h2 class="section-title">Serviciile noastre</h2>
          <p class="section-subtitle">Alege serviciul potrivit pentru nevoile tale de transport</p>
        </div>
        
        <div class="services-grid">
          <div class="service-card featured">
            <div class="service-icon">
              <Car />
            </div>
            <h3>Casual Trip</h3>
            <p>Perfect pentru deplasări personale și vacanțe cu program flexibil în zona Timișoarei.</p>
            <ul class="service-features">
              <li>Limită distanță: 50km</li>
              <li>Drum dus-întors inclus</li>
              <li>Tarif fix, nu pe ore</li>
              <li>Planificare până în 3 zile</li>
              <li>Punctualitate garantată</li>
            </ul>
          </div>

          <div class="service-card featured">
            <div class="service-icon">
              <Zap />
            </div>
            <h3>Over Driver</h3>
            <p>Serviciu premium cu șofer dedicat pentru deplasări mai lungi și complexe.</p>
            <ul class="service-features">
              <li>Limită distanță: 200km</li>
              <li>8 ore - program standard</li>
              <li>12 ore - program extins</li>
              <li>Timpul de așteptare inclus</li>
              <li>Șoferi cu experiență verificată</li>
            </ul>
          </div>

          <div class="service-card exclusive">
            <div class="service-icon">
              <Briefcase />
            </div>
            <h3>Business Trip</h3>
            <p>Serviciu exclusiv pentru corporații și deplasări de afaceri fără limite de distanță.</p>
            <ul class="service-features">
              <li>Nicio limită de distanță</li>
              <li>Prețuri și condiții negociabile</li>
              <li>Tarif flexibil</li>
              <li>Serviciu personalizat</li>
              <li>Contract pe măsură</li>
            </ul>
          </div>


          <div class="service-card">
            <div class="service-icon">
              <Shield />
            </div>
            <h3>Siguranță și Calitate</h3>
            <p>Toți șoferii noștri sunt verificați și instruiți pentru servicii de calitate superioară.</p>
            <ul class="service-features">
              <li>Verificare background complet</li>
              <li>Training profesional</li>
              <li>Asigurare completă</li>
              <li>Monitorizare GPS</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <Headphones />
            </div>
            <h3>Suport Local</h3>
            <p>Echipa noastră din Timișoara oferă suport rapid și personalizat.</p>
            <ul class="service-features">
              <li>Suport telefonic local</li>
              <li>Asistență în română</li>
              <li>Răspuns în maxim 30 min</li>
              <li>Cunoașterea zonei</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <CreditCard />
            </div>
            <h3>Plăți Flexibile</h3>
            <p>Multiple opțiuni de plată pentru confortul clienților noștri.</p>
            <ul class="service-features">
              <li>Card bancar</li>
              <li>Transfer bancar</li>
              <li>Plată în numerar</li>
              <li>Facturare pentru firme</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div class="partnership-section">
      <div class="container">
        <div class="partnership-card">
            <div class="partnership-content">
              <div class="partnership-icon">
                <Star />
              </div>
              <div class="partnership-text">
                <h3>Parteneriat Bolt & Uber</h3>
                <p>Deținem parteneriate cu firme recunoscute în domeniul transportului. Angajăm periodic șoferi calificați și cu experiență pentru a activa pe platformele de top din piață.</p>
              </div>
            </div>
            <div class="partnership-features">
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <span>Acces la ambele platforme</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <span>Suport complet documentație</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <span>Training și asistență</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <span>Venituri optimizate</span>
              </div>
            </div>
          </div>
        </div>
    </div>
    
    <div class="rental-section">
      <div class="container">
        <div class="rental-card">
            <div class="rental-header">
              <div class="rental-icon">
                <Car />
              </div>
              <div class="rental-header-text">
                <h3>Rental Car</h3>
                <span class="rental-badge">Nou</span>
              </div>
            </div>
            <p class="rental-description">
              Închiriază-ți mașina către Bloom! Vehiculul va fi folosit pentru transport persoane prin platformele Bolt și Uber. Oferim contracte sigure și poliță de asigurare completă pentru vehiculul tău, contra unei remunerații atractive și fără grija întreținerii.
            </p>
            <div class="rental-features-grid">
              <div class="rental-feature">
                <div class="rental-feature-icon">📋</div>
                <div class="rental-feature-text">
                  <strong>Contract Legal</strong>
                  <span>Document oficial cu toate detaliile</span>
                </div>
              </div>
              <div class="rental-feature">
                <div class="rental-feature-icon">🛡️</div>
                <div class="rental-feature-text">
                  <strong>Asigurare Completă</strong>
                  <span>Poliță de asigurare inclusă</span>
                </div>
              </div>
              <div class="rental-feature">
                <div class="rental-feature-icon">💰</div>
                <div class="rental-feature-text">
                  <strong>Plată Garantată</strong>
                  <span>Venit sigur și la timp</span>
                </div>
              </div>
              <div class="rental-feature">
                <div class="rental-feature-icon">🔧</div>
                <div class="rental-feature-text">
                  <strong>Mentenanță Inclusă</strong>
                  <span>Ne ocupăm de întreținere</span>
                </div>
              </div>
            </div>
            <div class="rental-cta">
              <router-link to="/inchiriaza-masina" class="rental-btn">
                Închiriază-ți Mașina
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </router-link>
              <span class="rental-note">Contactează-ne pentru mai multe detalii</span>
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
import { Car, Clock, Users, Zap, Briefcase, CreditCard, Shield, HeadphonesIcon as Headphones, UserPlus, Star } from 'lucide-vue-next'
import '@/assets/styles/shared.css'

export default {
  name: 'Servicii',
  components: {
    AppHeader,
    AppFooter,
    Car,
    Clock,
    Users,
    Zap,
    Briefcase,
    CreditCard,
    Shield,
    Headphones,
    UserPlus,
    Star
  }
}
</script>

<style scoped>
/* Services-specific styles */

.services-page {
  background: white;
  padding: 80px 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.service-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}

.service-card::before {
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

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  border-color: rgba(52, 209, 134, 0.2);
}

.service-card.featured {
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.05) 0%, rgba(40, 167, 69, 0.05) 100%);
  border: 2px solid #34d186;
  transform: scale(1.02);
  position: relative;
  overflow: hidden;
}

.service-card.featured::before {
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
  transform: scaleX(1);
}

.service-card.featured::after {
  content: "POPULAR";
  position: absolute;
  top: 15px;
  right: -25px;
  background: #34d186;
  color: white;
  padding: 5px 30px;
  font-size: 0.8rem;
  font-weight: 600;
  transform: rotate(45deg);
  z-index: 2;
}


.service-card.exclusive {
  border: 2px solid #ffd700;
  position: relative;
  overflow: hidden;
  background: linear-gradient(145deg, #fff9e6, #ffffff);
  transform: scale(1.02);
}

.service-card.exclusive::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ffd700 0%, #ffed4e 100%);
  transform: scaleX(1);
}

.service-card.exclusive::after {
  content: "EXCLUSIVE";
  position: absolute;
  top: 15px;
  right: -25px;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #8b6914;
  padding: 5px 30px;
  font-size: 0.8rem;
  font-weight: 700;
  transform: rotate(45deg);
  box-shadow: 0 2px 4px rgba(255, 215, 0, 0.3);
  z-index: 2;
}

.service-card.exclusive .service-icon {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #8b6914;
}

.service-card.exclusive h3 {
  color: #8b6914;
}

.partnership-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.partnership-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem;
  color: white;
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.partnership-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.partnership-content {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.partnership-icon {
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.partnership-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

.partnership-text h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.partnership-text p {
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
}

.partnership-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.feature-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-icon {
  width: 24px;
  height: 24px;
  background: #34d186;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0;
}

.feature-item span {
  font-size: 1rem;
  font-weight: 500;
}

.rental-section {
  padding: 80px 0;
  background: white;
}

.rental-card {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  border-radius: 20px;
  padding: 3rem;
  color: white;
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.3);
  position: relative;
  overflow: hidden;
}

.rental-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  pointer-events: none;
}

.rental-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.rental-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  backdrop-filter: blur(10px);
}

.rental-icon svg {
  width: 30px;
  height: 30px;
  color: white;
}

.rental-header-text {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rental-header-text h3 {
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
}

.rental-badge {
  background: #34d186;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.rental-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  position: relative;
  z-index: 1;
}

.rental-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}

.rental-feature {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.rental-feature-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.rental-feature-text {
  display: flex;
  flex-direction: column;
}

.rental-feature-text strong {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.rental-feature-text span {
  font-size: 0.9rem;
  opacity: 0.8;
}

.rental-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.rental-btn {
  background: white;
  color: #ff6b6b;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  text-decoration: none;
}

.rental-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.rental-note {
  font-size: 0.9rem;
  opacity: 0.8;
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #34d186, #28a745);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  box-shadow: 0 5px 15px rgba(52, 209, 134, 0.3);
}

.service-icon svg {
  width: 32px;
  height: 32px;
}

.service-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.service-card > p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  list-style: none;
  padding: 0;
  text-align: left;
}

.service-features li {
  padding: 0.5rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
}

.service-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #34d186;
  font-weight: bold;
}

.cta-section {
  margin: 4rem 0;
}

.cta-card {
  background: linear-gradient(135deg, #34d186, #28a745);
  color: white;
  padding: 3rem;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(52, 209, 134, 0.3);
}

.cta-card h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-card p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.btn-primary {
  background: white;
  color: #34d186;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .service-card {
    padding: 2rem;
  }
  
  .service-card.featured {
    transform: none;
  }
  
  .partnership-card {
    padding: 2rem;
  }
  
  .partnership-content {
    flex-direction: column;
    text-align: center;
  }
  
  .partnership-icon {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
  
  .partnership-text h3 {
    font-size: 1.5rem;
  }
  
  .partnership-features {
    grid-template-columns: 1fr;
  }
  
  .rental-card {
    padding: 2rem;
  }
  
  .rental-header {
    flex-direction: column;
    text-align: center;
  }
  
  .rental-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .rental-header-text h3 {
    font-size: 1.5rem;
  }
  
  .rental-features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .service-card {
    padding: 2rem;
  }
  
  .service-card.featured {
    transform: none;
  }
  
  .service-icon {
    width: 70px;
    height: 70px;
  }
  
  .service-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .service-card h3 {
    font-size: 1.3rem;
  }
  
  .partnership-section {
    padding: 60px 0;
  }
  
  .rental-section {
    padding: 60px 0;
  }
  
  .partnership-card {
    padding: 1.5rem;
  }
  
  .rental-card {
    padding: 1.5rem;
  }
  
  .partnership-text h3 {
    font-size: 1.3rem;
  }
  
  .rental-header-text h3 {
    font-size: 1.3rem;
  }
  
  .rental-description {
    font-size: 1.1rem;
  }
}
</style>