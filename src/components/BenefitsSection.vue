<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">De ce să alegi Bloom?</h2>
        <p class="section-subtitle">Partenerul tău de încredere pentru Bolt și Uber. Experimentează libertatea și flexibilitatea cu suportul unei echipe profesioniste</p>
      </div>
      
      <div class="benefits-grid">
        <div v-for="(benefit, index) in benefits" :key="benefit.id" class="benefit-card" :class="{ 'card-featured': index === 1 }">
          <div class="card-header">
            <div class="benefit-icon">
              <component :is="benefit.icon" />
            </div>
            <div class="card-number">{{ String(benefit.id).padStart(2, '0') }}</div>
          </div>
          <div class="card-content">
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.description }}</p>
          </div>
          <div class="card-accent"></div>
        </div>
      </div>
      
      <div class="benefits-stats">
        <div class="stat-item">
          <div class="stat-number">500+</div>
          <div class="stat-label">Șoferi mulțumiți</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">4.9/5</div>
          <div class="stat-label">Rating mediu</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Suport disponibil</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DollarSign, Clock, Smartphone, Shield, Target, Users } from 'lucide-vue-next'

export default {
  name: 'BenefitsSection',
  components: {
    DollarSign,
    Clock,
    Smartphone,
    Shield,
    Target,
    Users
  },
  data() {
    return {
      benefits: [
        {
          id: 1,
          icon: 'DollarSign',
          title: 'Venituri Stabile',
          description: 'Lucrează simultan pentru Bolt și Uber prin parteneriatul nostru. Venituri mai mari și plăți regulate.'
        },
        {
          id: 2,
          icon: 'Clock',
          title: 'Program Flexibil',
          description: 'Conduci când vrei, unde vrei. Perfect pentru venit cu normă întreagă sau parțială.'
        },
        {
          id: 3,
          icon: 'Smartphone',
          title: 'Aplicație Ușor de Folosit',
          description: 'Aplicația noastră pentru șoferi este intuitivă și plină de funcții care îți fac munca mai ușoară.'
        },
        {
          id: 4,
          icon: 'Shield',
          title: 'Acoperire de Asigurare',
          description: 'Conduci cu încredere știind că ești acoperit de asigurarea noastră comprehensivă.'
        },
        {
          id: 5,
          icon: 'Target',
          title: 'Oportunități de Bonus',
          description: 'Câștigă în plus cu prețuri de vârf, promoții și bonusuri de recomandare.'
        },
        {
          id: 6,
          icon: 'Users',
          title: 'Suport Profesionist',
          description: 'Echipa Bloom te susține cu suport dedicat, training și asistență pentru ambele platforme.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.section {
  padding: 80px 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
  position: relative;
}

.section-title::after {
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

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.benefit-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: left;
}

.benefit-card:hover::before {
  transform: scaleX(1);
}

.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  border-color: rgba(52, 209, 134, 0.2);
}

.card-featured {
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.05) 0%, rgba(40, 167, 69, 0.05) 100%);
  border-color: rgba(52, 209, 134, 0.2);
  transform: scale(1.02);
}

.card-featured::before {
  transform: scaleX(1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.benefit-icon {
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

.benefit-icon svg {
  width: 32px;
  height: 32px;
}

.card-number {
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
  line-height: 1.3;
}

.card-content p {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
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

.benefit-card:hover .card-accent {
  transform: translate(25px, 25px) scale(1.1);
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.2) 0%, rgba(40, 167, 69, 0.2) 100%);
}

.benefits-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: #34d186;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.stat-label {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

@media (max-width: 768px) {
  .section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .card-featured {
    transform: none;
  }
  
  .benefit-card {
    padding: 2rem;
  }
  
  .card-content h3 {
    font-size: 1.2rem;
  }
  
  .card-content p {
    font-size: 0.95rem;
  }
  
  .benefits-stats {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 40px 0;
  }
  
  .benefit-card {
    padding: 1.5rem;
  }
  
  .benefit-icon {
    width: 60px;
    height: 60px;
  }
  
  .benefit-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .card-number {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
  }
  
  .benefits-stats {
    gap: 1.5rem;
    padding: 1.5rem 1rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
  }
}
</style>