<template>
  <div class="comanda-cursa-page">
    <!-- Work in Progress Banner -->
    <div class="work-in-progress-banner">
      <div class="banner-content">
        <div class="banner-icon">🚧</div>
        <div class="banner-text">
          <h3>Pagină în lucru</h3>
          <p>Această funcționalitate este în dezvoltare și va fi disponibilă în curând</p>
        </div>
      </div>
    </div>

    <!-- Dynamic Content Section -->
    <div class="dynamic-content-section">
      <div class="container">
        <!-- Customer Content -->
        <div v-show="activeSection === 'customers'" class="customer-content">
          <div class="section-header">
            <h2 class="section-title">Călătorește în siguranță prin Timișoara</h2>
            <p class="section-subtitle">Calculează tariful și comandă cursa în câteva secunde</p>
          </div>
          
          <!-- Fare Estimator -->
          <div class="fare-estimator-card">
            <div class="estimator-header">
              <h3>Calculează tariful pentru cursa ta</h3>
            </div>
            <div class="route-inputs">
              <div class="input-pair">
                <div class="route-input">
                  <MapPin class="input-icon start" />
                  <input type="text" placeholder="De unde pleci?" v-model="fareFrom">
                </div>
                <div class="route-input">
                  <Navigation class="input-icon destination" />
                  <input type="text" placeholder="Unde mergi?" v-model="fareTo">
                </div>
              </div>
              <button @click="calculateFare" class="estimate-btn" :disabled="!fareFrom || !fareTo">
                <DollarSign class="btn-icon" />
                Calculează tariful
              </button>
            </div>
            
            <div v-if="fareEstimate" class="fare-results">
              <div class="estimated-fare">
                <span class="fare-label">Tarif estimat:</span>
                <span class="fare-amount">{{ fareEstimate.price }} lei</span>
              </div>
              <div class="trip-details">
                <span>{{ fareEstimate.distance }} km • {{ fareEstimate.duration }} min</span>
              </div>
            </div>
          </div>
          
          <!-- Popular Routes -->
          <div class="popular-routes">
            <h3>Destinații populare în Timișoara</h3>
            <div class="routes-grid">
              <div class="route-card" @click="selectPopularRoute('Centrul Vechi', 'Iulius Mall')">
                <div class="route-info">
                  <div class="route-path">
                    <span class="start-point">Centrul Vechi</span>
                    <div class="route-arrow">→</div>
                    <span class="end-point">Iulius Mall</span>
                  </div>
                  <div class="route-price">~18 lei</div>
                </div>
              </div>
              
              <div class="route-card" @click="selectPopularRoute('Piața Victoriei', 'Aeroportul Traian Vuia')">
                <div class="route-info">
                  <div class="route-path">
                    <span class="start-point">Piața Victoriei</span>
                    <div class="route-arrow">→</div>
                    <span class="end-point">Aeroport</span>
                  </div>
                  <div class="route-price">~35 lei</div>
                </div>
              </div>
              
              <div class="route-card" @click="selectPopularRoute('Universitatea de Vest', 'Shopping City')">
                <div class="route-info">
                  <div class="route-path">
                    <span class="start-point">UVT</span>
                    <div class="route-arrow">→</div>
                    <span class="end-point">Shopping City</span>
                  </div>
                  <div class="route-price">~22 lei</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Live Availability -->
          <div class="live-availability">
            <div class="availability-header">
              <div class="live-indicator"></div>
              <h3>Șoferi disponibili acum</h3>
            </div>
            <div class="availability-stats">
              <div class="stat-item">
                <span class="stat-number">{{ availableDrivers }}</span>
                <span class="stat-label">în zona ta</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ averageWaitTime }}</span>
                <span class="stat-label">min așteptare</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Driver Content -->
        <div v-show="activeSection === 'drivers'" class="driver-content">
          <div class="section-header">
            <h2 class="section-title">Maximizează-ți veniturile ca șofer în Timișoara</h2>
            <p class="section-subtitle">Alătură-te echipei și lucrează pentru Bolt și Uber simultan</p>
          </div>
          
          <!-- Enhanced Earnings Calculator -->
          <div class="enhanced-earnings-card">
            <div class="calculator-header">
              <h3>Calculatorul veniturilor pentru șoferi</h3>
            </div>
            
            <div class="earnings-inputs">
              <div class="input-group">
                <label>Ore pe zi:</label>
                <div class="slider-wrapper">
                  <input type="range" min="4" max="12" v-model="detailedHours" @input="calculateDetailedEarnings">
                  <span class="slider-value">{{ detailedHours }}h</span>
                </div>
              </div>
              
              <div class="input-group">
                <label>Zile pe săptămână:</label>
                <div class="slider-wrapper">
                  <input type="range" min="3" max="7" v-model="workingDays" @input="calculateDetailedEarnings">
                  <span class="slider-value">{{ workingDays }} zile</span>
                </div>
              </div>
            </div>
            
            <div class="detailed-earnings">
              <div class="earnings-breakdown">
                <div class="earning-row">
                  <span class="period">Zilnic</span>
                  <span class="amount">{{ detailedDaily }} lei</span>
                </div>
                <div class="earning-row">
                  <span class="period">Săptămânal</span>
                  <span class="amount">{{ detailedWeekly }} lei</span>
                </div>
                <div class="earning-row highlight">
                  <span class="period">Lunar</span>
                  <span class="amount">{{ detailedMonthly }} lei</span>
                </div>
              </div>
              
              <div class="comparison-note">
                <p>💡 Cu Bloom câștigi cu ~30% mai mult decât independent</p>
              </div>
            </div>
          </div>
          
          <!-- Driver Success Stories -->
          <div class="success-stories">
            <h3>Povești de succes din Timișoara</h3>
            <div class="stories-grid">
              <div class="story-card">
                <div class="driver-info">
                  <div class="driver-avatar">👨‍💼</div>
                  <div class="driver-details">
                    <h4>Andrei M.</h4>
                    <span class="experience">2 ani cu Bloom</span>
                  </div>
                </div>
                <div class="story-content">
                  <p>"Cu Bloom am reușit să-mi dublez veniturile. Suportul lor pentru documentații a fost esențial."</p>
                  <div class="story-stats">
                    <span class="monthly-income">7,200 lei/lună</span>
                  </div>
                </div>
              </div>
              
              <div class="story-card">
                <div class="driver-info">
                  <div class="driver-avatar">👨‍🦱</div>
                  <div class="driver-details">
                    <h4>Mihai R.</h4>
                    <span class="experience">1.5 ani cu Bloom</span>
                  </div>
                </div>
                <div class="story-content">
                  <p>"Flexibilitatea de a lucra pentru ambele platforme mi-a schimbat viața financiară."</p>
                  <div class="story-stats">
                    <span class="monthly-income">6,800 lei/lună</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Partnership Benefits -->
          <div class="partnership-benefits">
            <h3>Avantajele parteneriatului Bloom</h3>
            <div class="benefits-grid">
              <div class="benefit-item">
                <div class="benefit-icon">🤝</div>
                <h4>Bolt + Uber</h4>
                <p>Acces simultan la ambele platforme</p>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">📋</div>
                <h4>Suport Legal</h4>
                <p>ARR, asigurări, documentații</p>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">🏆</div>
                <h4>Expertiză Locală</h4>
                <p>Cunoaștem Timișoara perfect</p>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">💰</div>
                <h4>Bonusuri</h4>
                <p>Câștiguri suplimentare în weekend</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Switcher for this page -->
        <div class="page-tab-switcher">
          <button 
            @click="activeSection = 'customers'"
            :class="{ active: activeSection === 'customers' }"
            class="tab-btn"
          >
            <MapPin class="tab-icon" />
            Pentru Călători
          </button>
          <button 
            @click="activeSection = 'drivers'"
            :class="{ active: activeSection === 'drivers' }"
            class="tab-btn"
          >
            <Car class="tab-icon" />
            Pentru Șoferi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  Car, MapPin, Navigation, DollarSign
} from 'lucide-vue-next'

export default {
  name: 'ComandaCursa',
  components: {
    Car, MapPin, Navigation, DollarSign
  },
  data() {
    return {
      activeSection: 'customers',
      
      // Customer section data
      fareFrom: '',
      fareTo: '',
      fareEstimate: null,
      availableDrivers: 12,
      averageWaitTime: 4,
      
      // Driver section data
      detailedHours: 8,
      workingDays: 5,
      detailedDaily: 0,
      detailedWeekly: 0,
      detailedMonthly: 0
    }
  },
  mounted() {
    this.calculateDetailedEarnings()
    this.updateAvailability()
  },
  methods: {
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
    title: 'Comandă Cursă - Bloom Timișoara'
  }
}
</script>

<style scoped>
.comanda-cursa-page {
  min-height: 100vh;
  background: #f8f9fa;
}

/* Work in Progress Banner */
.work-in-progress-banner {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.banner-icon {
  font-size: 2.5rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.banner-text h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.banner-text p {
  font-size: 1rem;
  margin: 0;
  opacity: 0.95;
}

/* Page Tab Switcher */
.page-tab-switcher {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 3rem 0;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  color: #6c757d;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn:hover {
  border-color: #34d186;
  color: #34d186;
  background: rgba(52, 209, 134, 0.05);
}

.tab-btn.active {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-color: #34d186;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 209, 134, 0.3);
}

.tab-icon {
  width: 20px;
  height: 20px;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Dynamic Content Section */
.dynamic-content-section {
  padding: 3rem 0;
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
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

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
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

/* Responsive Design */
@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
  }
  
  .banner-text h3 {
    font-size: 1.3rem;
  }
  
  .page-tab-switcher {
    flex-direction: column;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .input-pair {
    grid-template-columns: 1fr;
  }
  
  .earnings-inputs {
    grid-template-columns: 1fr;
  }
  
  .routes-grid {
    grid-template-columns: 1fr;
  }
  
  .availability-stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>