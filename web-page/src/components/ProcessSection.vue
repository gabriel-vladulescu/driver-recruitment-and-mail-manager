<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Cum să începi</h2>
        <p class="section-subtitle">Urmează aceși pași simpli pentru a începe să conduci cu Bloom</p>
      </div>
      
      <div class="process-timeline">
        <div v-for="(step, index) in steps" :key="step.id" class="process-step" :class="{ 'step-last': index === steps.length - 1 }">
          <div class="step-content">
            <div class="step-number">
              <component :is="step.icon" />
              <span class="step-badge">{{ step.id }}</span>
            </div>
            <div class="step-info">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="process-cta">
        <div class="cta-content">
          <h3>Gata să începi?</h3>
          <p>Completează formularul și începe călătoria ta cu Bloom astăzi!</p>
          <a :href="ctaHref" class="btn-primary">
            <Rocket class="btn-icon" />
            Aplică acum
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FileText, Upload, Shield, Play, Rocket } from 'lucide-vue-next'

export default {
  name: 'ProcessSection',
  components: {
    FileText,
    Upload,
    Shield,
    Play,
    Rocket
  },
  data() {
    return {
      isMobile: false,
      steps: [
        {
          id: 1,
          icon: 'FileText',
          title: 'Aplică online',
          description: 'Completează formularul nostru simplu de mai jos. Durează doar câteva minute.'
        },
        {
          id: 2,
          icon: 'Upload',
          title: 'Încărcarea documentelor',
          description: 'Încărci documentele necesare prin portalul nostru securizat.'
        },
        {
          id: 3,
          icon: 'Shield',
          title: 'Verificarea de background',
          description: 'Îți vom verifica informațiile și vom efectua verificările necesare.'
        },
        {
          id: 4,
          icon: 'Play',
          title: 'Începe să conduci',
          description: 'Odată aprobat, descarcă aplicația și începe să câștigi imediat!'
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
.section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.process-timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto 4rem;
}

.process-step {
  position: relative;
  margin-bottom: 3rem;
}


.step-content {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.step-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
}

.step-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.step-number {
  position: relative;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(52, 209, 134, 0.3);
}

.step-number svg {
  width: 32px;
  height: 32px;
  z-index: 2;
}

.step-badge {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background: white;
  color: #34d186;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.step-info {
  flex: 1;
}

.step-info h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.step-info p {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
}

.process-cta {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 0 auto;
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
  line-height: 1.6;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #34d186 0%, #28a745 100%);
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(52, 209, 134, 0.4);
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #28a745 0%, #34d186 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 209, 134, 0.6);
  color: white;
  text-decoration: none;
}

.btn-icon {
  width: 20px;
  height: 20px;
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
  
  .step-content {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
  
  
  .step-number {
    width: 70px;
    height: 70px;
    margin: 0 auto 1rem;
  }
  
  .step-number svg {
    width: 28px;
    height: 28px;
  }
  
  .step-info h3 {
    font-size: 1.2rem;
  }
  
  .step-info p {
    font-size: 0.95rem;
  }
  
  .process-cta {
    padding: 2rem;
  }
  
  .cta-content h3 {
    font-size: 1.5rem;
  }
  
  .cta-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 40px 0;
  }
  
  .step-content {
    padding: 1.25rem;
  }
  
  .step-number {
    width: 60px;
    height: 60px;
  }
  
  .step-number svg {
    width: 24px;
    height: 24px;
  }
  
  .step-badge {
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
    bottom: -6px;
    right: -6px;
  }
  
  .process-cta {
    padding: 1.5rem;
  }
}
</style>