<template>
  <div>
    <AppHeader />
    
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">Centrul de Ajutor</h1>
          <p class="page-subtitle">Găsește răspunsuri la întrebările tale frecvente</p>
        </div>
        
        <div class="faq-section">


          <div class="faq-category">
            <h3 class="category-title">Taxe și Impozite</h3>
            
            <div class="faq-item">
              <div class="faq-question" @click="toggleFAQ('faq3')">
                <h4>Ce taxe trebuie să plătesc?</h4>
                <ChevronDown :class="{ 'rotated': activeFAQ === 'faq3' }" />
              </div>
              <div class="faq-answer" :class="{ 'active': activeFAQ === 'faq3' }">
                <p>Trebuie să achiți impozitul pe venitul net și contribuțiile pentru sănătate și pensie. Echipa Bloom te va ajuta să optimizezi taxele pentru a plăti mereu cea mai mică sumă legală posibilă.</p>
                <p>În perioadele în care nu lucrezi (ești în concediu, ai mașina în service etc.), nu trebuie să plătești nicio taxă. Pentru contribuții, marele avantaj este că ești asigurat în sistemul de sănătate și strângi bani în fondul de pensie.</p>
              </div>
            </div>
          </div>


        </div>

        <div class="contact-section">
          <div class="contact-card">
            <div class="contact-icon">
              <MessageCircle />
            </div>
            <h3>Încă mai ai întrebări?</h3>
            <p>Nu ai găsit răspunsul la întrebarea ta? Echipa noastră de suport este aici să te ajute!</p>
            <div class="contact-actions">
              <router-link to="/contact" class="btn-primary">
                <Mail class="btn-icon" />
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
import { ChevronDown, MessageCircle, Mail } from 'lucide-vue-next'
import '@/assets/styles/shared.css'

export default {
  name: 'HelpCenter',
  components: {
    AppHeader,
    AppFooter,
    ChevronDown,
    MessageCircle,
    Mail
  },
  data() {
    return {
      activeFAQ: null
    }
  },
  methods: {
    toggleFAQ(faqId) {
      this.activeFAQ = this.activeFAQ === faqId ? null : faqId
      
      // Improved animation by setting exact height
      this.$nextTick(() => {
        const faqAnswers = this.$el.querySelectorAll('.faq-answer')
        faqAnswers.forEach(answer => {
          if (answer.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px'
          } else {
            answer.style.maxHeight = '0px'
          }
        })
      })
    }
  }
}
</script>

<style scoped>
/* Help Center specific styles */
.page-content {
  padding: 120px 0 80px;
  background: #f8f9fa;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.page-subtitle {
  font-size: 1.3rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.faq-section {
  margin-bottom: 4rem;
}

/* Section titles handled by shared.css */

.faq-category {
  margin-bottom: 3rem;
}

.category-title {
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #34d186;
}

.faq-item {
  background: white;
  border-radius: 15px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.faq-question {
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: between;
  align-items: center;
  transition: background-color 0.3s;
}

.faq-question:hover {
  background-color: #f8f9fa;
}

.faq-question h4 {
  flex: 1;
  color: #1a1a1a;
  font-size: 1.1rem;
  font-weight: 600;
}

.faq-question svg {
  width: 20px;
  height: 20px;
  color: #34d186;
  transition: transform 0.3s;
}

.faq-question svg.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-answer.active {
  padding: 0 1.5rem 1.5rem;
}

.faq-answer p {
  margin-bottom: 1rem;
  color: #666;
  line-height: 1.6;
}

.faq-answer ul,
.faq-answer ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.faq-answer li {
  margin-bottom: 0.5rem;
  color: #666;
  line-height: 1.6;
}

.contact-section {
  margin: 4rem 0;
}

.contact-card {
  background: linear-gradient(135deg, #34d186, #2bc77a);
  color: white;
  padding: 3rem;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(52, 209, 134, 0.3);
}

.contact-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.contact-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.contact-card h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.contact-card p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.contact-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Button styles handled by shared.css */
.contact-actions .btn-primary {
  background: white;
  color: #34d186;
}

.contact-actions .btn-primary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}

.contact-actions .btn-secondary {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.contact-actions .btn-secondary:hover {
  background: white;
  color: #34d186;
}

.cta-section {
  text-align: center;
  margin-top: 3rem;
}

.btn-icon {
  width: 18px;
  height: 18px;
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .contact-card {
    padding: 2rem;
  }
  
  .contact-card h3 {
    font-size: 1.5rem;
  }
  
  .contact-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-actions a {
    width: 100%;
    max-width: 250px;
  }
}
</style>