import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Servicii from '../views/Servicii.vue'
import Recrutare from '../views/Recrutare.vue'
import HelpCenter from '../views/HelpCenter.vue'
import InchiriazaMasina from '../views/InchiriazaMasina.vue'
import PoliticaConfidentialitate from '../views/PoliticaConfidentialitate.vue'
import PoliticaCookies from '../views/PoliticaCookies.vue'
import GhidulSoferului from '../views/GhidulSoferului.vue'
import ComandaCursa from '../views/ComandaCursa.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/despre-noi',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/servicii',
    name: 'Servicii',
    component: Servicii
  },
  {
    path: '/recrutare',
    name: 'Recrutare',
    component: Recrutare
  },
  {
    path: '/centrul-de-ajutor',
    name: 'HelpCenter',
    component: HelpCenter
  },
  {
    path: '/inchiriaza-masina',
    name: 'InchiriazaMasina',
    component: InchiriazaMasina
  },
  {
    path: '/politica-confidentialitate',
    name: 'PoliticaConfidentialitate',
    component: PoliticaConfidentialitate
  },
  {
    path: '/politica-cookies',
    name: 'PoliticaCookies',
    component: PoliticaCookies
  },
  {
    path: '/ghidul-soferului',
    name: 'GhidulSoferului',
    component: GhidulSoferului
  },
  {
    path: '/comanda-cursa',
    name: 'ComandaCursa',
    component: ComandaCursa
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router