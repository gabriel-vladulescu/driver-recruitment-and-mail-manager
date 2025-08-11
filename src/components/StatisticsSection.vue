<template>
  <section class="statistics-section">
    <div class="container">
      <div class="stats-header">
        <h2 class="section-title">Bloom în cifre</h2>
        <p class="section-subtitle">Rezultate concrete care demonstrează avantajele parteneriatului nostru</p>
      </div>
      
      <div class="stats-grid">
        <div v-for="stat in statistics" :key="stat.id" class="stat-card" :class="{ featured: stat.featured }">
          <div class="stat-icon">
            <component :is="stat.icon" />
          </div>
          <div class="stat-content">
            <div class="stat-number" ref="statNumbers">{{ formatNumber(stat.value) }}</div>
            <div class="stat-unit">{{ stat.unit }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-description">{{ stat.description }}</div>
          </div>
        </div>
      </div>
      
      <div class="comparison-section">
        <h3>Comparație cu concurența</h3>
        <div class="comparison-chart">
          <div class="comparison-item">
            <div class="comparison-header">
              <span class="platform-name">Doar Bolt</span>
            </div>
            <div class="comparison-metrics">
              <div class="metric">
                <span class="metric-label">Venit mediu/oră</span>
                <span class="metric-value">50-65 RON</span>
              </div>
              <div class="metric">
                <span class="metric-label">Suport tehnic</span>
                <span class="metric-value">Limitat</span>
              </div>
              <div class="metric">
                <span class="metric-label">Timp aprobare</span>
                <span class="metric-value">5-7 zile</span>
              </div>
            </div>
          </div>
          
          <div class="comparison-item">
            <div class="comparison-header">
              <span class="platform-name">Doar Uber</span>
            </div>
            <div class="comparison-metrics">
              <div class="metric">
                <span class="metric-label">Venit mediu/oră</span>
                <span class="metric-value">50-65 RON</span>
              </div>
              <div class="metric">
                <span class="metric-label">Suport tehnic</span>
                <span class="metric-value">Limitat</span>
              </div>
              <div class="metric">
                <span class="metric-label">Timp aprobare</span>
                <span class="metric-value">7-10 zile</span>
              </div>
            </div>
          </div>
          
          <div class="comparison-item featured">
            <div class="comparison-header">
              <span class="platform-name">Bloom (Bolt + Uber)</span>
              <div class="featured-badge">Recomandat</div>
            </div>
            <div class="comparison-metrics">
              <div class="metric">
                <span class="metric-label">Venit mediu/oră</span>
                <span class="metric-value highlight">65-90 RON</span>
              </div>
              <div class="metric">
                <span class="metric-label">Suport tehnic</span>
                <span class="metric-value highlight">24/7</span>
              </div>
              <div class="metric">
                <span class="metric-label">Timp aprobare</span>
                <span class="metric-value highlight">< 5 zile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="cta-section">
        <div class="cta-content">
          <h3>Gata să faci parte din aceste statistici?</h3>
          <p>Alătură-te celor peste 500 de șoferi care au ales să lucreze cu Bloom</p>
          <a :href="ctaHref" class="btn-primary">
            <UserPlus class="btn-icon" />
            Aplică acum și începe să câștigi mai mult
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { TrendingUp, Users, Clock, DollarSign, Award, UserPlus } from 'lucide-vue-next'
import '@/assets/styles/shared.css'

export default {
  name: 'StatisticsSection',
  components: {
    TrendingUp,
    Users,
    Clock,
    DollarSign,
    Award,
    UserPlus
  },
  data() {
    return {
      isMobile: false,
      statistics: [
        {
          id: 1,
          icon: 'Users',
          value: 500,
          unit: '+',
          label: 'Șoferi activi',
          description: 'Comunitate în creștere constantă',
          featured: false
        },
        {
          id: 2,
          icon: 'TrendingUp',
          value: 35,
          unit: '%',
          label: 'Creștere medie venituri',
          description: 'Față de platformele individuale',
          featured: true
        },
        {
          id: 3,
          icon: 'Award',
          value: 4.9,
          unit: '/5',
          label: 'Rating satisfacție',
          description: 'De la șoferii noștri',
          featured: false
        },
        {
          id: 4,
          icon: 'DollarSign',
          value: 6000,
          unit: 'RON',
          label: 'Venit mediu lunar',
          description: 'Pentru șoferi full-time',
          featured: false
        }
      ]
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
    this.animateNumbers()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768
    },
    formatNumber(value) {
      if (typeof value === 'number' && value > 999) {
        return value.toLocaleString()
      }
      return value.toString()
    },
    
    animateNumbers() {
      // Simple number animation on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      })
      
      const statCards = this.$el.querySelectorAll('.stat-card')
      statCards.forEach(card => observer.observe(card))
    }
  }
}
</script>

<style scoped>
.statistics-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.stats-header {
  text-align: center;
  margin-bottom: 4rem;
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
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
}

.stat-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
}

.stat-card.featured {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  transform: scale(1.05);
}

.stat-card.featured::before {
  background: rgba(255,255,255,0.3);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.stat-card.featured:hover {
  transform: scale(1.05) translateY(-5px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background: rgba(52, 209, 134, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #34d186;
}

.stat-card.featured .stat-icon {
  background: rgba(255,255,255,0.2);
  color: white;
}

.stat-icon svg {
  width: 28px;
  height: 28px;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
  line-height: 1;
}

.stat-card.featured .stat-number {
  color: white;
}

.stat-unit {
  font-size: 1.2rem;
  font-weight: 600;
  color: #34d186;
  margin-bottom: 0.5rem;
  display: inline;
  margin-left: 0.25rem;
}

.stat-card.featured .stat-unit {
  color: rgba(255,255,255,0.9);
}

.stat-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.stat-card.featured .stat-label {
  color: white;
}

.stat-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

.stat-card.featured .stat-description {
  color: rgba(255,255,255,0.8);
}

.comparison-section {
  margin-bottom: 4rem;
}

.comparison-section h3 {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1a1a1a;
}

.comparison-chart {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.comparison-item {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.comparison-item.featured {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  transform: scale(1.02);
}

.comparison-item:hover {
  transform: translateY(-5px);
}

.comparison-item.featured:hover {
  transform: scale(1.02) translateY(-5px);
}

.comparison-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.comparison-item.featured .comparison-header {
  border-bottom-color: rgba(255,255,255,0.3);
}

.platform-name {
  font-size: 1.1rem;
  font-weight: 600;
}

.featured-badge {
  background: rgba(255,255,255,0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.comparison-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-label {
  font-size: 0.9rem;
  color: #666;
}

.comparison-item.featured .metric-label {
  color: rgba(255,255,255,0.8);
}

.metric-value {
  font-weight: 600;
  color: #1a1a1a;
}

.comparison-item.featured .metric-value {
  color: white;
}

.metric-value.highlight {
  color: #fff;
  background: rgba(255,255,255,0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-weight: 700;
}

.cta-section {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.cta-content h3 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.cta-content p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* Button styles handled by shared.css */

.stat-card.animate {
  animation: fadeInUp 0.6s ease forwards;
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

@media (max-width: 768px) {
  .statistics-section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .stat-card {
    padding: 2rem;
  }
  
  .stat-card.featured {
    transform: none;
  }
  
  .stat-card.featured:hover {
    transform: translateY(-5px);
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .comparison-chart {
    grid-template-columns: 1fr;
  }
  
  .comparison-item.featured {
    transform: none;
  }
  
  .comparison-item.featured:hover {
    transform: translateY(-5px);
  }
  
  .cta-section {
    padding: 2rem;
  }
  
  .cta-content h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .statistics-section {
    padding: 40px 0;
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .comparison-item {
    padding: 1.5rem;
  }
  
  .cta-section {
    padding: 1.5rem;
  }
}
</style>