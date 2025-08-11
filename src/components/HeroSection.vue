<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1>Devino Șofer Profesionist cu Bloom</h1>
          <p>Alătură-te echipei noastre și lucrează pentru Bolt și Uber prin parteneriatul nostru. Flexibilitate maximă și venituri stabile te așteaptă!</p>
          <router-link to="/recrutare" class="btn-primary">
            <Car class="btn-icon" />
            Începe Astăzi
          </router-link>
        </div>
        <div class="hero-image" style="box-shadow: none;">
          <img src="/images/bolt-hero.png" alt="Șofer Bloom" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Car } from 'lucide-vue-next'

export default {
  name: 'HeroSection',
  components: {
    Car
  },
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-text {
  text-align: left;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.btn-primary {
  background: #fff;
  color: #34d186;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.hero-image {
  text-align: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-text {
    text-align: center;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
}
</style>