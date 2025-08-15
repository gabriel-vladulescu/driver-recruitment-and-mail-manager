# Bolt Driver Recruitment Page

O aplicație Vue.js pentru recrutarea șoferilor Bolt, complet tradusă în română și cu integrare pentru server Node.js.

## 🚀 Caracteristici

- **Vue.js 3** cu Composition API și setup modular
- **Vue Router** pentru navigare între pagini  
- **Lucide Vue Next** pentru icoane moderne
- **Axios** pentru trimiterea formularului către server
- **Design responsiv** optimizat pentru toate dispozitivele
- **Traducere completă în română**
- **Animații CSS** pentru o experiență îmbunătățită
- **Integrare server Node.js** pentru procesarea aplicațiilor

## 📁 Structura Proiectului

```
bolt-driver/
├── public/
│   ├── images/                 # Imagini și logo-uri
│   └── index.html             # HTML principal
├── src/
│   ├── assets/                # Resurse statice
│   ├── components/            # Componente reutilizabile
│   │   ├── AppHeader.vue      # Header cu navigare
│   │   ├── AppFooter.vue      # Footer cu link-uri
│   │   ├── HeroSection.vue    # Secțiunea hero
│   │   ├── BenefitsSection.vue # Beneficiile șoferilor
│   │   ├── RequirementsSection.vue # Cerințe pentru șoferi
│   │   ├── ProcessSection.vue  # Pașii de aplicare
│   │   └── ApplicationForm.vue # Formularul de aplicare
│   ├── router/                # Configurare Vue Router
│   ├── views/                 # Paginile aplicației
│   │   ├── Home.vue          # Pagina principală
│   │   ├── About.vue         # Despre Bolt
│   │   └── Support.vue       # Suport pentru șoferi
│   ├── App.vue               # Componenta principală
│   ├── main.js               # Entry point
│   └── style.css             # Stiluri globale și animații
├── .env                      # Variabile de mediu
├── server-example.js         # Server Node.js pentru formulare
└── package.json             # Dependencies și scripts
```

## 🛠️ Instalare și Pornire

### 1. Instalarea dependințelor

```bash
npm install
```

### 2. Configurarea variabilelor de mediu

Copiază `.env.example` în `.env` și ajustează valorile:

```bash
cp .env.example .env
```

### 3. Adăugarea imaginilor

Adaugă imaginile în folderul `public/images/`:
- `bolt-logo.png` - Logo-ul Bolt
- `bolt-hero.jpg` - Imagine pentru secțiunea hero
- Vezi `public/images/placeholder-setup.md` pentru detalii

### 4. Pornirea aplicației de dezvoltare

```bash
npm run dev
```

Aplicația va fi disponibilă la `http://localhost:5173`

### 5. Pornirea serverului Node.js (opțional)

Pentru a testa formularul, pornește serverul backend:

```bash
# Instalează dependințele pentru server
npm install express cors

# Pornește serverul
node server-example.js
```

Serverul va rula pe `http://localhost:4000`

## 🎨 Personalizare

### Culori

Culorile principale sunt definite în CSS:
- Verde Bolt: `#34d186`
- Verde închis: `#28a745`
- Gri text: `#1a1a1a`

### Fonturi

Utilizează Google Fonts (Inter) pentru o tipografie modernă.

### Animații

Animațiile sunt definite în `src/style.css`:
- `fadeInUp` - Pentru elemente care apar
- `slideInLeft/Right` - Pentru elemente laterale
- `pulse` - Pentru butoane importante

## 📱 API Endpoints

Serverul Node.js oferă următoarele endpoint-uri:

```
GET  /api/health           # Status server
POST /api/applications     # Trimitere aplicație
GET  /api/applications     # Lista aplicațiilor (admin)
GET  /api/applications/:id # Aplicație specifică
```

### Exemplu de cerere POST:

```javascript
{
  "firstName": "Ion",
  "lastName": "Popescu", 
  "email": "ion.popescu@email.com",
  "phone": "0723456789",
  "city": "București",
  "hasLicense": "yes",
  "hasVehicle": "yes",
  "message": "Mesaj opțional"
}
```

## 🔧 Scripts Disponibile

- `npm run dev` - Pornește serverul de dezvoltare
- `npm run build` - Construiește pentru producție  
- `npm run preview` - Preview build de producție

## 🌐 Deploy

### Vite + Netlify/Vercel

```bash
npm run build
# Upload folder dist/ to your hosting provider
```

### Docker (opțional)

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contribuții

1. Fork proiectul
2. Creează un branch pentru feature (`git checkout -b feature/AmazingFeature`)
3. Commit modificările (`git commit -m 'Add some AmazingFeature'`)
4. Push pe branch (`git push origin feature/AmazingFeature`)
5. Deschide un Pull Request

## 📄 Licență

Distribuit sub licența MIT. Vezi `LICENSE` pentru mai multe informații.

## 📞 Contact

Pentru întrebări legate de implementare:
- Email: dev@example.com
- GitHub Issues: [Create Issue](../../issues)

---

**Dezvoltat cu ❤️ pentru Bolt România**