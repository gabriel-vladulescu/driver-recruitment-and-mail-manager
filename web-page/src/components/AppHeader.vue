<template>
  <header class="header" :class="{ 'white-version': isWhiteVersion && !isMobileMenuOpen }">
    <nav class="nav container">
      <div class="logo">
        <!-- <img src="/images/bloom-logo.png" alt="Bloom" class="logo-img" /> -->
        <div class="logo-text">
          <span class="brand-name">Bloom</span>
          <span class="brand-subtitle" :class="{ 'white-version': isWhiteVersion && !isMobileMenuOpen }">Timișoara</span>
        </div>
      </div>
      <ul class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen, 'white-version': isWhiteVersion && !isMobileMenuOpen }">
        <li><router-link to="/" @click="closeMobileMenu">Acasă</router-link></li>
        <li><router-link to="/despre-noi" @click="closeMobileMenu">Despre Noi</router-link></li>
        <li><router-link to="/servicii" @click="closeMobileMenu">Servicii</router-link></li>
        <li><router-link to="/contact" @click="closeMobileMenu">Contact</router-link></li>
        <li><router-link to="/recrutare" @click="closeMobileMenu" class="btn-join">Alătură-te Echipei</router-link></li>
      </ul>
      <div class="mobile-menu-toggle" @click="toggleMobileMenu">
        <Menu v-if="!isMobileMenuOpen" />
        <X v-else />
      </div>
    </nav>
  </header>
</template>

<script>
import { Menu, X } from 'lucide-vue-next'

export default {
  name: 'AppHeader',
  components: {
    Menu,
    X
  },
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  props: {
    isWhiteVersion: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    }
  }
}
</script>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header.white-version {
  background: transparent;
  box-shadow: none;
}

.white-version {
  color: white !important;
}

.white-version.nav-links a {
  color: white !important;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
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
  font-size: 2rem;
  font-weight: 700;
  color: #34d186;
  line-height: 1;
}

.brand-subtitle {
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  line-height: 1;
}

.logo-img {
  width: 32px;
  height: 32px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #1a1a1a;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #34d186;
}

.btn-join {
  background: #34d186;
  color: white !important;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-join:hover {
  background: #28a745 !important;
  color: white !important;
  transform: translateY(-2px);
}

.mobile-menu-toggle {
  display: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav {
    padding: 1rem 4%;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 1rem 0;
    transform: translateY(-10px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .nav-links.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    padding: 2rem 2rem;
  }

  .nav-links.mobile-open .btn-join {
    background-color: transparent;
    color: #1a1a1a !important;
    padding-left: 0;
  }

  .nav-links.mobile-open .btn-join:hover {
    background-color: transparent !important;
    color: #34d186 !important;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
}
</style>