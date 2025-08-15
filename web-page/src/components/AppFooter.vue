<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="logo">
            <!-- <img src="/images/bloom-logo.png" alt="Bloom" class="logo-img" /> -->
            <div class="logo-text">
              <span class="brand-name">Bloom</span>
              <span class="brand-subtitle">Timișoara</span>
            </div>
          </div>
          <p>Partenerul tău de încredere pentru servicii de transport și șoferi profesioniști</p>
          <div class="social-links">
            <a href="https://www.facebook.com/share/16KW7BhwLm/?mibextid=wwXIfr" class="social-link">
              <Facebook />
            </a>
            <a href="https://www.tiktok.com/@ageme6?_t=ZN-8yl1rbwA2uE&_r=1" class="social-link">
              <TikTokIcon />
            </a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>Link-uri rapide</h3>
          <ul>
            <li><router-link to="/">Acasă</router-link></li>
            <li><router-link to="/despre-noi">Despre Noi</router-link></li>
            <li><router-link to="/servicii">Servicii</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Suport</h3>
          <ul>
            <li><router-link to="/centrul-de-ajutor">Centrul de ajutor</router-link></li>
            <li><router-link to="/contact">Contactează-ne</router-link></li>
            <li><router-link to="/ghidul-soferului">Ghidul șoferului</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><router-link to="/politica-confidentialitate">Politica de confidențialitate</router-link></li>
            <li><router-link to="/politica-cookies">Politica cookie</router-link></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025. Toate drepturile rezervate.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { Facebook, Instagram, Linkedin } from 'lucide-vue-next'
import TikTokIcon from './CustomIcons/TikTokIcon.vue';

export default {
  name: 'AppFooter',
  components: {
    Facebook,
    Instagram,
    Linkedin,
    TikTokIcon
  }
}
</script>

<style scoped>
.footer {
  background: #1a1a1a;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  margin-bottom: 1rem;
  color: #34d186;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #34d186;
}

.logo {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #34d186;
  line-height: 1;
}

.brand-subtitle {
  font-size: 0.8rem;
  font-weight: 500;
  color: #999;
  line-height: 1;
}

.logo-img {
  width: 24px;
  height: 24px;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  transition: all 0.3s;
}

.social-link:hover {
  background: #34d186;
  color: white;
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.footer-section p {
  color: #ccc;
  line-height: 1.6;
}

.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 1rem;
  text-align: center;
}

.footer-bottom p {
  color: #999;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>