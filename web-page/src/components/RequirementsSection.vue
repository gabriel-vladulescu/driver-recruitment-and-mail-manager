<template>
  <section class="section requirements-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Cerințe</h2>
        <p class="section-subtitle">Asigură-te că îndeplinești aceste cerințe de bază pentru a începe călătoria ta cu Bloom</p>
      </div>
      
      <div class="requirements-content">
        <div class="requirements-intro">
          <div class="intro-card">
            <div class="intro-icon">
              <CheckCircle2 />
            </div>
            <h3>Simplu și rapid</h3>
            <p>Îndeplinești cerințele? Grozav! Aplică chiar acum, aprobarea este rapidă și simplă.</p>
          </div>
        </div>
        
        <div class="requirements-grid">
          <div v-for="(requirement, index) in requirements" :key="requirement.id" class="requirement-card" :class="{ 'card-primary': index % 3 === 0 }">
            <div class="card-header">
              <div class="requirement-check">
                <Check />
              </div>
              <div class="requirement-number">{{ String(requirement.id).padStart(2, '0') }}</div>
            </div>
            <div class="card-content">
              <h4>{{ requirement.title }}</h4>
              <p>{{ requirement.description }}</p>
            </div>
            <div class="card-progress">
              <div class="progress-bar"></div>
            </div>
          </div>
        </div>
        
        <div class="requirements-help">
          <div class="help-card">
            <div class="help-content">
              <h3>Ai nevoie de ajutor?</h3>
              <p>Echipa noastră te poate ajuta să îndeplinești toate cerințele. Nu ezita să ne contactezi!</p>
              <div class="help-features">
                <div class="help-feature">
                  <CheckCircle2 class="feature-icon" />
                  <span>Consultanță gratuită</span>
                </div>
                <div class="help-feature">
                  <CheckCircle2 class="feature-icon" />
                  <span>Asistență pentru documentație</span>
                </div>
                <div class="help-feature">
                  <CheckCircle2 class="feature-icon" />
                  <span>Suport în procesul de aprobare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Check, CheckCircle2 } from 'lucide-vue-next'

export default {
  name: 'RequirementsSection',
  components: {
    Check,
    CheckCircle2
  },
  data() {
    return {
      requirements: [
        {
          id: 1,
          title: "Permis de conducere valabil",
          description: "Cel puțin 2 ani de experiență în conducere"
        },
        {
          id: 2,
          title: "Cerință de vârstă",
          description: "Trebuie să ai cel puțin 21 de ani"
        },
        {
          id: 3,
          title: "Cerințe pentru vehicul",
          description: "Mașină cu 4 uși, din 2015 sau mai nouă"
        },
        {
          id: 4,
          title: "Verificare de background",
          description: "Cazier judiciar și de conducere curat"
        },
        {
          id: 5,
          title: "Smartphone",
          description: "Dispozitiv iPhone sau Android"
        },
        {
          id: 6,
          title: "Asigurare",
          description: "Poliță de asigurare auto valabilă"
        }
      ]
    }
  }
}
</script>

<style scoped>
.requirements-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.section {
  padding: 80px 0;
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

.requirements-content {
  max-width: 1000px;
  margin: 0 auto;
}

.requirements-intro {
  margin-bottom: 3rem;
  text-align: center;
}

.intro-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.intro-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
}

.intro-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  box-shadow: 0 5px 15px rgba(52, 209, 134, 0.3);
}

.intro-icon svg {
  width: 40px;
  height: 40px;
}

.intro-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.intro-card p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.requirement-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}

.requirement-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6c757d 0%, #495057 100%);
  transition: all 0.3s ease;
}

.card-primary::before {
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
}

.requirement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  border-color: rgba(52, 209, 134, 0.2);
}

.requirement-card:hover::before {
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.requirement-check {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 3px 10px rgba(52, 209, 134, 0.3);
  flex-shrink: 0;
}

.requirement-check svg {
  width: 20px;
  height: 20px;
}

.requirement-number {
  font-size: 0.8rem;
  font-weight: 700;
  color: #666;
  background: #f8f9fa;
  padding: 0.4rem 0.6rem;
  border-radius: 15px;
  min-width: 35px;
  text-align: center;
}

.card-primary .requirement-number {
  color: #34d186;
  background: rgba(52, 209, 134, 0.1);
}

.card-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
  line-height: 1.3;
}

.card-content p {
  color: #666;
  line-height: 1.5;
  font-size: 0.95rem;
  margin: 0;
}

.card-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #f0f0f0;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease 0.1s;
}

.requirement-card:hover .progress-bar {
  transform: scaleX(1);
}

.requirements-help {
  margin-top: 3rem;
}

.help-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.help-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #17a2b8 0%, #138496 100%);
}

.help-content h3 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.help-content p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.help-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.help-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #17a2b8;
  font-weight: 500;
}

.feature-icon {
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
  
  .intro-card {
    padding: 2rem;
  }
  
  .intro-icon {
    width: 70px;
    height: 70px;
  }
  
  .intro-icon svg {
    width: 35px;
    height: 35px;
  }
  
  .requirements-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .requirement-card {
    padding: 1.5rem;
  }
  
  .card-content h4 {
    font-size: 1.1rem;
  }
  
  .card-content p {
    font-size: 0.9rem;
  }
  
  .help-card {
    padding: 2rem;
  }
  
  .help-content h3 {
    font-size: 1.5rem;
  }
  
  .help-content p {
    font-size: 1rem;
  }
  
  .help-features {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 40px 0;
  }
  
  .intro-card {
    padding: 1.5rem;
  }
  
  .intro-card h3 {
    font-size: 1.3rem;
  }
  
  .requirement-card {
    padding: 1.25rem;
  }
  
  .requirement-check {
    width: 35px;
    height: 35px;
  }
  
  .requirement-check svg {
    width: 18px;
    height: 18px;
  }
  
  .requirement-number {
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
  }
  
  .help-card {
    padding: 1.5rem;
  }
  
  .help-content h3 {
    font-size: 1.3rem;
  }
  
  .help-content p {
    font-size: 0.95rem;
  }
}
</style>