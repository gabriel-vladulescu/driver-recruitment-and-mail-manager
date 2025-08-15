<template>
  <section class="earnings-calculator-section">
    <div class="container">
      <h2 class="section-title">Calculează-ți potențialul de câștig</h2>
      <p class="section-subtitle">Descoperă cât poți câștiga lunar lucrând pentru Bolt și Uber prin Bloom</p>
      
      <div class="calculator-container">
        <div class="calculator-form">
          <div class="form-group">
            <label for="hoursPerDay">Ore pe zi</label>
            <div class="slider-container">
              <input 
                type="range" 
                id="hoursPerDay" 
                min="2" 
                max="12" 
                step="1" 
                v-model="hoursPerDay"
                class="slider"
              >
              <div class="slider-value">{{ hoursPerDay }} ore</div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="daysPerWeek">Zile pe săptămână</label>
            <div class="slider-container">
              <input 
                type="range" 
                id="daysPerWeek" 
                min="3" 
                max="7" 
                step="1" 
                v-model="daysPerWeek"
                class="slider"
              >
              <div class="slider-value">{{ daysPerWeek }} zile</div>
            </div>
          </div>
          
          <div class="form-group">
            <label>Orașul de lucru</label>
            <select v-model="selectedCity" class="city-select">
              <option value="arad">Arad</option>
              <option value="brasov">Brașov</option>
              <option value="bucuresti">București</option>
              <option value="constanta">Constanța</option>
              <option value="cluj">Cluj-Napoca</option>
              <option value="sibiu">Sibiu</option>
              <option value="timisoara">Timișoara</option>
            </select>
          </div>
          
          <div class="bonus-options">
            <h4>Bonusuri incluse:</h4>
            <div class="bonus-list">
              <div class="bonus-item">
                <CheckCircle class="bonus-icon" />
                <span>Bonus de vârf (weekend)</span>
              </div>
              <div class="bonus-item">
                <CheckCircle class="bonus-icon" />
                <span>Bonus de experiență</span>
              </div>
              <div class="bonus-item">
                <CheckCircle class="bonus-icon" />
                <span>Bonus de fidelitate</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="calculator-results">
          <div class="result-card main-result">
            <div class="result-icon">
              <DollarSign />
            </div>
            <div class="result-content">
              <div class="result-label">Venit lunar estimat</div>
              <div class="result-value">{{ monthlyEarnings }} RON</div>
              <div class="result-breakdown">
                <div class="breakdown-item">
                  <span>Săptămânal: {{ weeklyEarnings }} RON</span>
                </div>
                <div class="breakdown-item">
                  <span>Zilnic: {{ dailyEarnings }} RON</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="result-comparison">
            <h4>Comparație cu alte opțiuni:</h4>
            <div class="comparison-bars">
              <div class="comparison-item">
                <span class="comparison-label">Doar Bolt</span>
                <div class="comparison-bar">
                  <div class="bar-fill bolt-only" :style="{ width: boltOnlyPercentage + '%' }"></div>
                </div>
                <span class="comparison-value">{{ boltOnlyEarnings }} RON</span>
              </div>
              <div class="comparison-item">
                <span class="comparison-label">Doar Uber</span>
                <div class="comparison-bar">
                  <div class="bar-fill uber-only" :style="{ width: uberOnlyPercentage + '%' }"></div>
                </div>
                <span class="comparison-value">{{ uberOnlyEarnings }} RON</span>
              </div>
              <div class="comparison-item highlight">
                <span class="comparison-label">Bloom (Bolt + Uber)</span>
                <div class="comparison-bar">
                  <div class="bar-fill bloom-combined" :style="{ width: '100%' }"></div>
                </div>
                <span class="comparison-value">{{ monthlyEarnings }} RON</span>
              </div>
            </div>
          </div>
          
          <div class="cta-container">
            <a :href="ctaHref" class="btn-primary">
              <Calculator class="btn-icon" />
              Vreau să câștig {{ monthlyEarnings }} RON/lună
            </a>
            <p class="disclaimer">*Estimările se bazează pe date istorice și pot varia în funcție de condițiile pieței</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DollarSign, CheckCircle, Calculator } from 'lucide-vue-next'
import '@/assets/styles/shared.css'

export default {
  name: 'EarningsCalculator',
  components: {
    DollarSign,
    CheckCircle,
    Calculator
  },
  data() {
    return {
      hoursPerDay: 8,
      daysPerWeek: 5,
      selectedCity: 'timisoara',
      isMobile: false,
      cityRates: {
        arad: { base: 39, bonus: 1.15 },
        brasov: { base: 42, bonus: 1.15 },
        bucuresti: { base: 51, bonus: 1.15 },
        cluj: { base: 48, bonus: 1.15 },
        constanta: { base: 38, bonus: 1.15 },
        sibiu: { base: 39, bonus: 1.15 },
        timisoara: { base: 41, bonus: 1.15 },
      }
    }
  },
  computed: {
    ctaHref() {
      return this.isMobile ? '#contact-form' : '#application-section'
    },
    baseHourlyRate() {
      return this.cityRates[this.selectedCity].base
    },
    bonusMultiplier() {
      return this.cityRates[this.selectedCity].bonus
    },
    dailyEarnings() {
      return Math.round(this.hoursPerDay * this.baseHourlyRate * this.bonusMultiplier)
    },
    weeklyEarnings() {
      return Math.round(this.dailyEarnings * this.daysPerWeek)
    },
    monthlyEarnings() {
      return Math.round(this.weeklyEarnings * 4.33) // Average weeks per month
    },
    boltOnlyEarnings() {
      return Math.round(this.monthlyEarnings * 0.55) // 55% of combined
    },
    uberOnlyEarnings() {
      return Math.round(this.monthlyEarnings * 0.60) // 60% of combined
    },
    boltOnlyPercentage() {
      return Math.round((this.boltOnlyEarnings / this.monthlyEarnings) * 100)
    },
    uberOnlyPercentage() {
      return Math.round((this.uberOnlyEarnings / this.monthlyEarnings) * 100)
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
.earnings-calculator-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.calculator-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.calculator-form {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  height: fit-content;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
  font-size: 1.1rem;
}

.slider-container {
  position: relative;
}

.slider {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #e0e0e0;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #34d186;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #34d186;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.slider-value {
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 600;
  color: #34d186;
  font-size: 1.1rem;
}

.city-select {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.city-select:focus {
  outline: none;
  border-color: #34d186;
}

.bonus-options {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  border-left: 4px solid #34d186;
}

.bonus-options h4 {
  margin-bottom: 1rem;
  color: #1a1a1a;
  font-size: 1rem;
}

.bonus-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bonus-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bonus-icon {
  width: 18px;
  height: 18px;
  color: #34d186;
}

.calculator-results {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.result-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.main-result {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
}

.result-icon {
  text-align: center;
  margin-bottom: 1rem;
}

.result-icon svg {
  width: 48px;
  height: 48px;
}

.result-label {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.result-value {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.result-breakdown {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.3);
}

.breakdown-item {
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
}

.result-comparison h4 {
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.comparison-bars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comparison-item {
  display: grid;
  grid-template-columns: 120px 1fr 80px;
  align-items: center;
  gap: 1rem;
}

.comparison-item.highlight {
  background: #f0f8f4;
  padding: 0.75rem;
  border-radius: 10px;
  border-left: 4px solid #34d186;
}

.comparison-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.comparison-bar {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.bolt-only {
  background: #ff6b35;
}

.uber-only {
  background: #000;
}

.bloom-combined {
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
}

.comparison-value {
  font-weight: 600;
  text-align: right;
  font-size: 0.9rem;
}

.cta-container {
  text-align: center;
}

/* Button styles handled by shared.css */

.disclaimer {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .calculator-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .result-value {
    font-size: 2.2rem;
  }
  
  .result-breakdown {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .comparison-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .comparison-value {
    text-align: left;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>