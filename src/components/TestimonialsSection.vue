<template>
  <section class="testimonials-section">
    <div class="container">
      <h2 class="section-title">Ce spun șoferii noștri</h2>
      <p class="section-subtitle">Descoperă experiențele reale ale partenerilor Bloom care lucrează pentru Bolt și Uber</p>
      
      <div class="testimonials-grid">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
          <div class="testimonial-content">
            <div class="quote-icon">
              <Quote />
            </div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img :src="testimonial.avatar" :alt="testimonial.name" />
              </div>
              <div class="author-info">
                <h4>{{ testimonial.name }}</h4>
                <p>{{ testimonial.role }}</p>
                <div class="rating">
                  <Star v-for="star in 5" :key="star" :class="{ filled: star <= testimonial.rating }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="testimonials-stats">
        <div class="stat-item">
          <div class="stat-number">4.8</div>
          <div class="stat-label">Rating mediu</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">500+</div>
          <div class="stat-label">Șoferi activi</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">95%</div>
          <div class="stat-label">Satisfacție</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Quote, Star } from 'lucide-vue-next'

export default {
  name: 'TestimonialsSection',
  components: {
    Quote,
    Star
  },
  data() {
    return {
      testimonials: [
        {
          id: 1,
          text: 'Bloom mi-a schimbat viața! Lucrez pentru ambele platforme și câștig dublu față de înainte. Echipa îmi oferă suport constant și îmi răspunde la orice întrebare.',
          name: 'Andrei Popescu',
          role: 'Șofer Bloom - 2 ani experiență',
          rating: 5,
          avatar: '/images/testimonials/andrei.jpg'
        },
        {
          id: 2,
          text: 'Am început cu Bloom acum 6 luni. Procesul de înscriere a fost foarte simplu, iar suportul oferit este excepțional. Recomand cu încredere!',
          name: 'Maria Ionescu',
          role: 'Șofer Bloom - 6 luni experiență',
          rating: 5,
          avatar: '/images/testimonials/maria.jpg'
        },
        {
          id: 3,
          text: 'Flexibilitatea oferită de Bloom este perfectă pentru mine. Pot lucra când vreau și câștig bine. Aplicația este ușor de folosit și eficientă.',
          name: 'George Mihai',
          role: 'Șofer Bloom - 1 an experiență',
          rating: 5,
          avatar: '/images/testimonials/george.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.testimonials-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.testimonial-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #34d186 0%, #28a745 100%);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.quote-icon {
  color: #34d186;
  margin-bottom: 1rem;
}

.quote-icon svg {
  width: 30px;
  height: 30px;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 2rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background: #34d186;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #1a1a1a;
}

.author-info p {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.rating {
  display: flex;
  gap: 2px;
}

.rating svg {
  width: 16px;
  height: 16px;
  color: #ddd;
  transition: color 0.3s;
}

.rating svg.filled {
  color: #ffc107;
  fill: currentColor;
}

.testimonials-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #34d186;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials-stats {
    flex-direction: column;
    gap: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .testimonials-section {
    padding: 60px 0;
  }
  
  .testimonial-card {
    padding: 1.5rem;
  }
  
  .testimonials-stats {
    gap: 1.5rem;
  }
}
</style>