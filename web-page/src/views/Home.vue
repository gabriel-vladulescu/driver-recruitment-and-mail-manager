<template>
  <div class="home-page">
    <AppHeader :isWhiteVersion="true"/>
    
    <!-- Dual Hero Section -->
    <div class="dual-hero">
      <!-- Customer Hero -->
      <div 
        class="hero-section customer-hero"
        :class="{ active: activeSection === 'customers', inactive: activeSection !== 'customers' }"
      >
        <div class="floating-elements">
          <div class="floating-car car-1">🚗</div>
          <div class="floating-car car-2">🚕</div>
          <div class="floating-car car-3">🚙</div>
        </div>
        <div class="hero-background">
          <div class="hero-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
          </div>
        </div>
        <div class="container">
          <!-- Integrated Tab Switches -->
          <div class="hero-tabs">
            <div class="switch-tabs">
              <button 
                @click="activeSection = 'customers'"
                :class="{ active: activeSection === 'customers' }"
                class="switch-tab customer-tab"
              >
                <MapPin class="tab-icon" />
                <span>Călătorii</span>
              </button>
              <button 
                @click="activeSection = 'drivers'"
                :class="{ active: activeSection === 'drivers' }"
                class="switch-tab driver-tab"
              >
                <Car class="tab-icon" />
                <span>Șoferi</span>
              </button>
            </div>
          </div>
          
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="animated-title">
                <span class="word word-1">Călătorii</span>
                <span class="word word-2">în</span>
                <span class="word word-3">siguranță</span>
              </h1>
              <p class="hero-description">
                Descoperă cea mai convenabilă modalitate de a te deplasa în Timișoara. 
                Șoferi profesioniști, prețuri corecte, timp de așteptare minim.
              </p>
              
              <div class="ride-cta">
                <a :href="`tel:${phoneNumber}`" class="btn-call-ride">
                  <Phone class="btn-icon" />
                  <div class="call-content">
                    <span class="call-text">Comandă cursă acum</span>
                    <span class="phone-number">{{ phoneNumber }}</span>
                  </div>
                </a>
                <p class="call-description">Sună pentru comandă rapidă - disponibili 24/7</p>
              </div>
            </div>
            
            <div class="hero-visual customer-visual">
              <div class="phone-mockup">
                <div class="phone-screen">
                  <div class="map-interface">
                    <div class="map-dots">
                      <div class="dot dot-1"></div>
                      <div class="dot dot-2"></div>
                      <div class="dot dot-3"></div>
                      <div class="dot dot-4"></div>
                      <div class="dot dot-5"></div>
                    </div>
                    <div class="route-line"></div>
                    <div class="moving-car">🚗</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Driver Hero -->
      <div 
        class="hero-section driver-hero"
        :class="{ active: activeSection === 'drivers', inactive: activeSection !== 'drivers' }"
      >
        <div class="hero-background">
          <div class="hero-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
          </div>
        </div>
        <div class="floating-money">
          <div class="money-icon money-1">💰</div>
          <div class="money-icon money-2">💵</div>
          <div class="money-icon money-3">🤑</div>
        </div>
        <div class="container">
          <!-- Integrated Tab Switches -->
          <div class="hero-tabs">
            <div class="switch-tabs">
              <button 
                @click="activeSection = 'customers'"
                :class="{ active: activeSection === 'customers' }"
                class="switch-tab customer-tab"
              >
                <MapPin class="tab-icon" />
                <span>Călătorii</span>
              </button>
              <button 
                @click="activeSection = 'drivers'"
                :class="{ active: activeSection === 'drivers' }"
                class="switch-tab driver-tab"
              >
                <Car class="tab-icon" />
                <span>Șoferi</span>
              </button>
            </div>
          </div>
          
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="animated-title driver-title">
                Câștigă ca șofer
              </h1>
              <p class="hero-description">
                Alătură-te echipei Bloom și maximizează-ți veniturile cu acces la Bolt și Uber. 
                Suport complet, flexibilitate totală, câștiguri garantate.
              </p>
              
              <div class="earnings-preview">
                <h3>Potențialul tău de câștig:</h3>
                <div class="earnings-calculator">
                  <div class="slider-container">
                    <label>Ore pe zi:</label>
                    <input 
                      type="range" 
                      min="4" 
                      max="12" 
                      v-model="hoursPerDay" 
                      class="earnings-slider"
                      @input="calculateEarnings"
                    />
                    <span class="slider-value">{{ hoursPerDay }}h</span>
                  </div>
                  
                  <div class="earnings-result">
                    <div class="earning-item">
                      <span class="earning-period">Zilnic</span>
                      <span class="earning-amount">{{ dailyEarnings }} lei</span>
                    </div>
                    <div class="earning-item">
                      <span class="earning-period">Lunar</span>
                      <span class="earning-amount highlight">{{ monthlyEarnings }} lei</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="cta-buttons">
                <router-link to="/recrutare" class="btn-primary btn-large pulse">
                  <Briefcase class="btn-icon" />
                  Aplică acum
                </router-link>
                <router-link to="/despre-noi" class="btn-secondary">
                  <Info class="btn-icon" />
                  Despre noi
                </router-link>
              </div>
            </div>
            
            <div class="hero-visual driver-visual">
              <div class="driver-dashboard">
                <div class="dashboard-header">
                  <div class="driver-avatar">👨‍💼</div>
                  <div class="driver-info">
                    <span class="driver-name">Andrei M.</span>
                    <span class="driver-status online">● Online</span>
                  </div>
                </div>
                
                <div class="dashboard-stats">
                  <div class="dash-stat">
                    <span class="dash-number" :class="{ counting: isCountingTrips }">{{ completedTrips }}</span>
                    <span class="dash-label">Curse finalizate</span>
                  </div>
                  <div class="dash-stat">
                    <span class="dash-number" :class="{ counting: isCountingEarnings }">{{ todayEarnings }}</span>
                    <span class="dash-label">Lei azi</span>
                  </div>
                  <div class="dash-stat">
                    <span class="dash-number">4.9</span>
                    <span class="dash-label">Rating ⭐</span>
                  </div>
                </div>
                
                <div class="trip-notification" :class="{ show: showTripNotification }">
                  <div class="notification-content">
                    <MapPin class="notification-icon" />
                    <div class="notification-text">
                      <span class="notification-title">Cursă nouă!</span>
                      <span class="notification-details">Piața Victoriei → Iulius Mall</span>
                    </div>
                    <button class="accept-btn" @click="acceptTrip">Accept</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { 
  Car, MapPin, Navigation, Clock, TrendingUp, Briefcase, Info,
  Shield, Zap, DollarSign, Users, MessageCircle, Phone
} from 'lucide-vue-next'
import '@/assets/styles/shared.css'

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppFooter,
    Car, MapPin, Navigation, Clock, TrendingUp, Briefcase, Info,
    Shield, Zap, DollarSign, Users, MessageCircle, Phone
  },
  data() {
    return {
      activeSection: 'customers',
      phoneNumber: import.meta.env.VITE_PHONE_NUMBER || '0756123456',
      email: import.meta.env.VITE_EMAIL || 'contact@bloom.ro',
      hoursPerDay: 8,
      dailyEarnings: 0,
      monthlyEarnings: 0,
      completedTrips: 0,
      todayEarnings: 0,
      isCountingTrips: false,
      isCountingEarnings: false,
      showTripNotification: false,
      
    }
  },
  mounted() {
    this.calculateEarnings()
    this.calculateDetailedEarnings()
    this.startDriverAnimation()
    this.startBackgroundAnimations()
    this.updateAvailability()
  },
  methods: {
    
    calculateEarnings() {
      this.dailyEarnings = this.hoursPerDay * 50 // 50 lei pe ora in medie
      this.monthlyEarnings = this.dailyEarnings * 22 // 22 zile lucratoare
    },
    
    startDriverAnimation() {
      setInterval(() => {
        if (this.activeSection === 'drivers') {
          this.showTripNotification = true
          setTimeout(() => {
            this.showTripNotification = false
          }, 4000)
        }
      }, 8000)
      
      // Counter animations
      this.animateNumbers()
    },
    
    animateNumbers() {
      let tripsInterval = setInterval(() => {
        if (this.completedTrips < 47) {
          this.completedTrips++
          this.isCountingTrips = true
        } else {
          clearInterval(tripsInterval)
          this.isCountingTrips = false
        }
      }, 50)
      
      let earningsInterval = setInterval(() => {
        if (this.todayEarnings < 320) {
          this.todayEarnings += 5
          this.isCountingEarnings = true
        } else {
          clearInterval(earningsInterval)
          this.isCountingEarnings = false
        }
      }, 30)
    },
    
    acceptTrip() {
      this.showTripNotification = false
      this.completedTrips++
      this.todayEarnings += Math.floor(Math.random() * 25) + 15
    },
    
    
    animateFeature(event) {
      const animation = event.currentTarget.querySelector('.feature-animation')
      animation.classList.add('active')
    },
    
    resetFeature(event) {
      const animation = event.currentTarget.querySelector('.feature-animation')
      animation.classList.remove('active')
    },
    
    animateStat(event) {
      event.currentTarget.classList.add('pulse')
      setTimeout(() => {
        event.currentTarget.classList.remove('pulse')
      }, 600)
    },
    
    startBackgroundAnimations() {
      // Add smooth periodic animations to floating elements
      setInterval(() => {
        const floatingElements = document.querySelectorAll('.floating-car, .money-icon')
        floatingElements.forEach((el, index) => {
          const translateY = Math.sin((Date.now() + index * 1000) / 2000) * 15
          const rotate = Math.sin((Date.now() + index * 1500) / 3000) * 5
          el.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`
        })
      }, 100)
    },
    
    // Customer section methods
    calculateFare() {
      if (!this.fareFrom || !this.fareTo) return
      
      // Simulate fare calculation
      const baseDistance = Math.random() * 15 + 5 // 5-20 km
      const baseFare = 8 // Starting fare
      const perKmRate = 1.8 // Lei per km
      const estimatedPrice = Math.round(baseFare + (baseDistance * perKmRate))
      const estimatedDuration = Math.round(baseDistance * 2.5) // Approx 2.5 min per km in city
      
      this.fareEstimate = {
        price: estimatedPrice,
        distance: Math.round(baseDistance * 10) / 10,
        duration: estimatedDuration
      }
    },
    
    selectPopularRoute(from, to) {
      this.fareFrom = from
      this.fareTo = to
      this.calculateFare()
    },
    
    updateAvailability() {
      // Simulate dynamic availability updates
      setInterval(() => {
        this.availableDrivers = Math.floor(Math.random() * 8) + 8 // 8-15 drivers
        this.averageWaitTime = Math.floor(Math.random() * 4) + 3 // 3-6 minutes
      }, 30000) // Update every 30 seconds
    },
    
    // Driver section methods
    calculateDetailedEarnings() {
      const hourlyRate = 50 // Lei per hour
      this.detailedDaily = this.detailedHours * hourlyRate
      this.detailedWeekly = this.detailedDaily * this.workingDays
      this.detailedMonthly = Math.round(this.detailedWeekly * 4.33) // Average weeks per month
    }
  },
  metaInfo: {
    title: 'Bloom - Transport și parteneriate în Timișoara'
  }
}
</script>

<style scoped>
/* Home Page Specific Styles with Advanced Animations */
.home-page {
  overflow-x: hidden;
}

/* Hero Integrated Tabs */
.hero-tabs {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
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
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.switch-tab.active {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(255, 255, 255, 0.8);
  color: #34d186;
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.switch-tab:hover:not(.active) {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.tab-icon {
  width: 20px;
  height: 20px;
}

/* Dual Hero Sections */
.dual-hero {
  position: relative;
}

.hero-section {
  min-height: 100vh;
  position: relative;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.hero-section.inactive {
  transform: translateY(-100vh);
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.hero-section.active {
  transform: translateY(0);
  opacity: 1;
  pointer-events: all;
  position: relative;
}

/* Customer Hero */
.customer-hero {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #34d186 100%);
  color: white;
}

/* Driver Hero */
.driver-hero {
  background: linear-gradient(135deg, #0f4c75 0%, #3282b8 50%, #34d186 100%);
  color: white;
}

/* Floating Elements */
.floating-elements, .floating-money {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.floating-car, .money-icon {
  position: absolute;
  font-size: 2rem;
  animation: floatAround 8s ease-in-out infinite;
  opacity: 0.7;
  transition: transform 0.3s ease-out;
  will-change: transform;
}

.car-1, .money-1 { top: 20%; left: 10%; animation-delay: 0s; }
.car-2, .money-2 { top: 60%; right: 15%; animation-delay: 2.5s; }
.car-3, .money-3 { bottom: 30%; left: 20%; animation-delay: 5s; }

@keyframes floatAround {
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-30px) rotate(5deg) scale(1.1); }
  50% { transform: translateY(-10px) rotate(-3deg) scale(0.9); }
  75% { transform: translateY(-20px) rotate(8deg) scale(1.05); }
}

/* Hero Content */
.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 8rem 0 3rem;
  position: relative;
  z-index: 10;
}

.hero-text {
  animation: slideInLeft 1s ease-out;
}

.hero-visual {
  animation: slideInRight 1s ease-out;
}

@keyframes slideInLeft {
  0% { transform: translateX(-100px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slideInRight {
  0% { transform: translateX(100px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

/* Animated Title */
.animated-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.2;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  white-space: nowrap;
  text-align: center;
}

.animated-title .word {
  display: inline-block;
  animation: wordPop 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(50px);
  margin-right: 0.5em;
}

.animated-title .word:last-child {
  margin-right: 0;
}

.word-1 { animation-delay: 0.2s; }
.word-2 { animation-delay: 0.4s; }
.word-3 { animation-delay: 0.6s; }

.word.highlight {
  background: linear-gradient(45deg, #ffeb3b, #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 2s ease-in-out infinite alternate;
}

@keyframes wordPop {
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes shimmer {
  0% { filter: brightness(1) hue-rotate(0deg); }
  100% { filter: brightness(1.2) hue-rotate(10deg); }
}

/* Hero Description */
.hero-description {
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.9);
}

/* Ride CTA */
.ride-cta {
  text-align: center;
  margin-bottom: 2rem;
}

.btn-call-ride {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  color: #34d186;
  padding: 1.5rem 2.5rem;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(52, 209, 134, 0.3);
  backdrop-filter: blur(15px);
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  animation: pulseGlow 3s ease-in-out infinite;
}

.btn-call-ride::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(52, 209, 134, 0.4), transparent);
  transition: left 0.6s ease-in-out;
}

.btn-call-ride:hover::before {
  left: 100%;
}

.btn-call-ride:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 249, 250, 1) 100%);
  border-color: rgba(52, 209, 134, 0.8);
  text-decoration: none;
  color: #28a745;
  animation: none;
}

.btn-call-ride:active {
  transform: translateY(-5px) scale(1.02);
  transition: all 0.1s ease;
}

.btn-call-ride .btn-icon {
  width: 24px;
  height: 24px;
  color: inherit;
  animation: phoneRing 2s ease-in-out infinite;
  transform-origin: center;
}

.btn-call-ride:hover .btn-icon {
  animation: phoneShake 0.6s ease-in-out;
}

.call-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.call-text {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.2;
}

.phone-number {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.8;
  margin-top: 2px;
}

.call-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
}

/* Call Button Animations */
@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(52, 209, 134, 0.4);
  }
  50% {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 15px rgba(52, 209, 134, 0.1);
  }
}

@keyframes phoneRing {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: rotate(-3deg) scale(1.1);
  }
  20%, 40%, 60%, 80% {
    transform: rotate(3deg) scale(1.1);
  }
}

@keyframes phoneShake {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: rotate(-5deg) scale(1.2);
  }
  20%, 40%, 60%, 80% {
    transform: rotate(5deg) scale(1.2);
  }
}

.location-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 0 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.input-group::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(52, 209, 134, 0.2), transparent);
  transition: left 0.6s;
}

.input-group.focused::before {
  left: 100%;
}

.input-icon {
  width: 20px;
  height: 20px;
  color: #34d186;
  margin-right: 10px;
  flex-shrink: 0;
}

.input-icon.destination {
  color: #ff6b6b;
}

.input-group input {
  border: none;
  background: transparent;
  padding: 15px 0;
  flex: 1;
  font-size: 1rem;
  color: #333;
  outline: none;
}

.input-group input::placeholder {
  color: #999;
}

.ride-btn {
  width: 100%;
  background: linear-gradient(45deg, #34d186 0%, #28a745 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.ride-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 209, 134, 0.4);
  text-decoration: none;
  color: white;
}


/* Ride Info */
.ride-info {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.ride-info p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.contact-info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-display {
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  animation: countUp 0.8s ease-out;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

@keyframes countUp {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Phone Mockup */
.phone-mockup {
  width: 280px;
  height: 500px;
  background: #1a1a1a;
  border-radius: 35px;
  padding: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  margin: 0 auto;
  position: relative;
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 25px;
  overflow: hidden;
  position: relative;
}

.map-interface {
  position: relative;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(52, 209, 134, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
    linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

.map-dots {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #34d186;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(52, 209, 134, 0.6);
}

.dot-1 { top: 20%; left: 15%; animation-delay: 0s; }
.dot-2 { top: 40%; right: 20%; animation-delay: 0.4s; }
.dot-3 { bottom: 30%; left: 25%; animation-delay: 0.8s; }
.dot-4 { top: 60%; left: 60%; animation-delay: 1.2s; }
.dot-5 { bottom: 20%; right: 15%; animation-delay: 1.6s; }

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.7; }
}

.route-line {
  position: absolute;
  top: 30%;
  left: 20%;
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, #34d186, #ff6b6b);
  border-radius: 2px;
  animation: drawLine 3s ease-in-out infinite;
}

@keyframes drawLine {
  0% { width: 0%; opacity: 0; }
  50% { width: 60%; opacity: 1; }
  100% { width: 60%; opacity: 0.7; }
}

.moving-car {
  position: absolute;
  font-size: 1.2rem;
  animation: moveCar 4s ease-in-out infinite;
}

@keyframes moveCar {
  0% { top: 25%; left: 15%; transform: rotate(0deg); }
  25% { top: 35%; left: 35%; transform: rotate(15deg); }
  50% { top: 45%; left: 55%; transform: rotate(-10deg); }
  75% { top: 35%; left: 75%; transform: rotate(5deg); }
  100% { top: 25%; left: 85%; transform: rotate(0deg); }
}

/* Earnings Preview */
.earnings-preview {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.earnings-preview h3 {
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  color: white;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.slider-container label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  min-width: 80px;
}

.earnings-slider {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
}

.earnings-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #34d186;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(52, 209, 134, 0.5);
  transition: all 0.3s;
}

.earnings-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 15px rgba(52, 209, 134, 0.7);
}

.slider-value {
  color: #34d186;
  font-weight: 700;
  font-size: 1.1rem;
  min-width: 40px;
  text-align: center;
}

.earnings-result {
  display: flex;
  gap: 2rem;
}

.earning-item {
  flex: 1;
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.earning-period {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.earning-amount {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  transition: all 0.3s;
}

.earning-amount.highlight {
  color: #ffeb3b;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  0% { text-shadow: 0 0 5px rgba(255, 235, 59, 0.5); }
  100% { text-shadow: 0 0 20px rgba(255, 235, 59, 0.8); }
}

/* CTA Buttons */
.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-buttons .btn-primary,
.cta-buttons .btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.pulse {
  animation: pulseButton 2s ease-in-out infinite;
}

@keyframes pulseButton {
  0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(52, 209, 134, 0.3); }
  50% { transform: scale(1.05); box-shadow: 0 8px 25px rgba(52, 209, 134, 0.6); }
}

/* Driver Dashboard */
.driver-dashboard {
  width: 320px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 25px;
  padding: 2rem;
  margin: 0 auto;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #333;
}

.dashboard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(52, 209, 134, 0.2);
}

.driver-avatar {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #34d186, #28a745);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.driver-info {
  flex: 1;
}

.driver-name {
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
  color: #333;
}

.driver-status {
  font-size: 0.9rem;
  color: #28a745;
  font-weight: 600;
}

.driver-status.online {
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.dash-stat {
  text-align: center;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.1), rgba(40, 167, 69, 0.1));
  border-radius: 15px;
  border: 1px solid rgba(52, 209, 134, 0.2);
}

.dash-number {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  color: #34d186;
  margin-bottom: 0.3rem;
  transition: all 0.3s;
}

.dash-number.counting {
  animation: counting 0.5s ease-in-out;
}

@keyframes counting {
  0% { transform: scale(1); color: #34d186; }
  50% { transform: scale(1.2); color: #28a745; }
  100% { transform: scale(1); color: #34d186; }
}

.dash-label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

/* Trip Notification */
.trip-notification {
  background: linear-gradient(135deg, #34d186, #28a745);
  border-radius: 15px;
  padding: 1.5rem;
  color: white;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.trip-notification::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shimmerNotification 2s ease-in-out infinite;
}

@keyframes shimmerNotification {
  0% { left: -100%; }
  100% { left: 100%; }
}

.trip-notification.show {
  transform: translateY(0);
  opacity: 1;
  animation: slideInUp 0.6s ease-out, wiggle 0.5s ease-in-out 0.6s;
}

@keyframes slideInUp {
  0% { transform: translateY(100px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  75% { transform: rotate(-2deg); }
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.notification-text {
  flex: 1;
}

.notification-title {
  display: block;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.notification-details {
  font-size: 0.9rem;
  opacity: 0.9;
}

.accept-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.accept-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

/* Dynamic Content Section */
.dynamic-content-section {
  padding: 100px 0;
  background: #f8f9fa;
}

/* Customer Content */
.customer-content, .driver-content {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fare Estimator */
.fare-estimator-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
  border: 1px solid #f0f0f0;
}

.estimator-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1a1a1a;
  text-align: center;
}

.route-inputs {
  margin-bottom: 2rem;
}

.input-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.route-input {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  padding: 0 15px;
  transition: all 0.3s;
}

.route-input:focus-within {
  border-color: #34d186;
  background: white;
  box-shadow: 0 0 0 3px rgba(52, 209, 134, 0.1);
}

.route-input .input-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  color: #34d186;
}

.route-input input {
  border: none;
  background: transparent;
  padding: 15px 0;
  flex: 1;
  font-size: 1rem;
  outline: none;
}

.estimate-btn {
  width: 100%;
  background: linear-gradient(45deg, #34d186 0%, #28a745 100%);
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.estimate-btn:disabled {
  background: #dee2e6;
  color: #6c757d;
  cursor: not-allowed;
}

.estimate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 209, 134, 0.3);
}

.fare-results {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  margin-top: 1.5rem;
}

.estimated-fare {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.fare-amount {
  font-size: 2rem;
  font-weight: 700;
}

.trip-details {
  opacity: 0.9;
  font-size: 0.9rem;
}

/* Popular Routes */
.popular-routes {
  margin-bottom: 3rem;
}

.popular-routes h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  text-align: center;
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.route-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #f0f0f0;
}

.route-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  border-color: #34d186;
}

.route-path {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.start-point, .end-point {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.9rem;
}

.route-arrow {
  color: #34d186;
  font-weight: bold;
  font-size: 1.2rem;
}

.route-price {
  color: #34d186;
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
}

/* Live Availability */
.live-availability {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
}

.availability-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.live-indicator {
  width: 12px;
  height: 12px;
  background: #28a745;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.availability-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.availability-stats {
  display: flex;
  justify-content: space-around;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #34d186;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* Enhanced Earnings Calculator */
.enhanced-earnings-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
  border: 1px solid #f0f0f0;
}

.calculator-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1a1a1a;
  text-align: center;
}

.earnings-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.slider-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slider-wrapper input[type="range"] {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 5px;
  outline: none;
  appearance: none;
}

.slider-wrapper input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #34d186;
  border-radius: 50%;
  cursor: pointer;
}

.slider-value {
  font-weight: 600;
  color: #34d186;
  min-width: 50px;
  text-align: center;
}

.earnings-breakdown {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.earning-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.earning-row.highlight {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  font-weight: 700;
}

.earning-row .period {
  font-weight: 600;
}

.earning-row .amount {
  font-size: 1.2rem;
  font-weight: 700;
}

.comparison-note {
  background: rgba(52, 209, 134, 0.1);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.comparison-note p {
  margin: 0;
  color: #1a1a1a;
  font-weight: 500;
}

/* Success Stories */
.success-stories {
  margin-bottom: 3rem;
}

.success-stories h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  text-align: center;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.story-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
}

.driver-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.driver-avatar {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 50%;
}

.driver-details h4 {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: #1a1a1a;
}

.experience {
  color: #666;
  font-size: 0.9rem;
}

.story-content p {
  font-style: italic;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.monthly-income {
  display: inline-block;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Partnership Benefits */
.partnership-benefits h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  text-align: center;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.benefit-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s;
  border: 1px solid #f0f0f0;
}

.benefit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.benefit-item h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.benefit-item p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-top: 4px solid transparent;
}

.feature-card:hover {
  transform: translateY(-10px) rotate(1deg);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  border-top-color: #34d186;
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 25px rgba(52, 209, 134, 0.4);
}

.feature-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  position: relative;
  z-index: 2;
}

/* Feature Animations */
.feature-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.feature-animation.active {
  opacity: 1;
}

.safety-animation.active {
  background: radial-gradient(circle, rgba(52, 209, 134, 0.1) 0%, transparent 70%);
  animation: safetyPulse 1s ease-in-out;
}

.speed-animation.active {
  background: linear-gradient(45deg, transparent, rgba(255, 235, 59, 0.2), transparent);
  animation: speedSweep 0.6s ease-in-out;
}

.price-animation.active {
  background: 
    radial-gradient(circle at 20% 20%, rgba(52, 209, 134, 0.3) 0%, transparent 30%),
    radial-gradient(circle at 80% 80%, rgba(40, 167, 69, 0.3) 0%, transparent 30%);
  animation: priceSparkle 1s ease-in-out;
}

.community-animation.active {
  background: 
    radial-gradient(circle at 25% 25%, rgba(52, 209, 134, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 75% 75%, rgba(52, 209, 134, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(52, 209, 134, 0.1) 0%, transparent 60%);
  animation: communityGrow 1.2s ease-in-out;
}

@keyframes safetyPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes speedSweep {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(100%) skewX(-15deg); }
}

@keyframes priceSparkle {
  0%, 100% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes communityGrow {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 80px 0;
  color: white;
}

.stats-content {
  animation: fadeInUp 0.6s ease-out;
}

.stats-header {
  text-align: center;
  margin-bottom: 3rem;
}

.stats-header h3 {
  font-size: 2rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(52, 209, 134, 0.2), transparent);
  transition: left 0.6s;
}

.stat-card:hover::before {
  left: 100%;
}

.stat-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 40px rgba(52, 209, 134, 0.2);
  border-color: rgba(52, 209, 134, 0.3);
}

.stat-card.pulse {
  animation: statPulse 0.6s ease-in-out;
}

@keyframes statPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1) rotate(2deg); }
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
  animation: float 3s ease-in-out infinite;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #34d186;
  display: block;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 2;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  z-index: 2;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  padding: 100px 0;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  opacity: 0.1;
  animation: bgMove 20s linear infinite;
}

@keyframes bgMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.cta-content h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  animation: titleFloat 3s ease-in-out infinite;
}

@keyframes titleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.cta-content p {
  font-size: 1.3rem;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav.container {
    padding: 1rem 4% !important;
  }

  .hero-tabs {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    margin-bottom: 2rem;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 4rem 0;
    text-align: center;
  }
  
  .animated-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .switch-tab {
    width: 200px;
  }
  
  .location-inputs {
    gap: 1rem;
  }
  
  .earnings-result {
    gap: 1rem;
  }
  
  .cta-buttons {
    flex-direction:row;
    justify-content: center;
    flex-wrap: initial;
    align-items: center;
  }
  
  .cta-buttons .btn-primary,
  .cta-buttons .btn-secondary {
    width: 100%;
    max-width: 280px;
  }
  
  .phone-mockup {
    width: 240px;
    height: 420px;
  }

  .hero-visual {
    display: none;
  }
  
  .driver-dashboard {
    width: 280px;
    padding: 1.5rem;
  }
  
  .dashboard-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
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
  .animated-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .ride-cta,
  .earnings-preview {
    margin-bottom: 1.5rem;
  }
  
  .btn-call-ride {
    padding: 1.2rem 2rem;
    font-size: 1.1rem;
  }
  
  .phone-mockup {
    width: 200px;
    height: 360px;
    padding: 15px;
  }
  
  .driver-dashboard {
    width: 240px;
    padding: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .floating-car,
  .money-icon {
    font-size: 1.5rem;
  }
  
  .feature-card {
    padding: 2rem;
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  .cta-content h2 {
    font-size: 1.8rem;
  }
}
</style>