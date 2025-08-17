# Bolt Driver Recruitment Page

## 1. About

A Vue.js application for Bolt driver recruitment, fully translated to Romanian with Node.js server integration. The application provides a modern, responsive interface for driver applications with multi-step forms and real-time validation.

## 2. Specifications

- **Vue.js 3** with Composition API and modular setup
- **Vue Router** for page navigation  
- **Lucide Vue Next** for modern icons
- **Fetch API** for form submission to server
- **Responsive design** optimized for all devices
- **Complete Romanian translation**
- **CSS animations** for enhanced user experience
- **Docker support** for easy deployment
- **Environment-specific configuration**
- **Nginx** for production serving
- **Multi-step form** with validation

## 3. Project Structure

```
web-page/
├── public/
│   ├── images/                 # Images and logos
│   └── index.html             # Main HTML file
├── src/
│   ├── assets/                # Static resources
│   ├── components/            # Reusable components
│   │   ├── AppHeader.vue      # Header with navigation
│   │   ├── AppFooter.vue      # Footer with links
│   │   ├── HeroSection.vue    # Hero section
│   │   ├── BenefitsSection.vue # Driver benefits
│   │   ├── RequirementsSection.vue # Driver requirements
│   │   ├── ProcessSection.vue  # Application steps
│   │   └── ApplicationForm.vue # Application form
│   ├── router/                # Vue Router configuration
│   ├── views/                 # Application pages
│   │   ├── Home.vue          # Main page
│   │   ├── About.vue         # About Bolt
│   │   └── Contact.vue       # Contact page
│   ├── App.vue               # Main component
│   ├── main.js               # Entry point
│   └── style.css             # Global styles and animations
├── .env                      # Environment variables
├── .env.example             # Environment template
├── .env.production          # Production environment
├── Dockerfile               # Docker build instructions
├── docker-compose.yml       # Docker orchestration
├── nginx.conf               # Nginx configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 4. Setup and Running

### Prerequisites
- Node.js 20+ (for local development)
- npm or yarn (for local development)
- Docker (optional for development, required for production)

### 4.1. Run in Development Mode

#### Option 1: Local Development (Recommended for development)

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**
Copy `.env.example` to `.env` and adjust values:
```bash
cp .env.example .env
```

3. **Environment configuration (.env)**
```env
VITE_API_BASE_URL=http://localhost:4000
VITE_APP_NAME=Web Page
VITE_PHONE_NUMBER=123456789
VITE_EMAIL=contact@example.com
```

4. **Start development server**
```bash
npm run dev
```

**Local Development Details:**
- **URL**: `http://localhost:5173` (default Vite port)
- **API**: `http://localhost:4000` (from `.env`)
- **Features**: Hot reload, source maps, dev tools, fast rebuilds
- **Benefits**: Faster development cycle, immediate file changes

#### Option 2: Docker Development

For containerized development environment:

```bash
# Build and start in development mode
docker-compose up --build
```

**Docker Development Details:**
- **URL**: `http://localhost:8080`
- **API**: `http://localhost:4000` (from `.env`)
- **Features**: Containerized environment, consistent across teams
- **Benefits**: Environment parity, isolated dependencies

### 4.2. Run in Production Mode

#### Option 1: Docker (Recommended)

1. **Configure production environment**
Edit `.env.production` with your domain:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_NAME=Web Page
VITE_PHONE_NUMBER=123456789
VITE_EMAIL=contact@example.com
```

2. **Build and start with Docker**
```bash
# Build and start
docker-compose up --build

# Background mode
docker-compose up -d --build
```

**Production Details:**
- **URL**: `http://localhost:8080`
- **API**: `https://api.yourdomain.com` (from `.env.production`)
- **Features**: Optimized build, Nginx serving, Gzip compression
- **Mode**: Production with minified assets

#### Option 2: Manual Build

```bash
# Build for production
npm run build

# Preview locally
npm run preview
```

#### Option 3: Reverse Proxy Setup

For production with custom domain:
```nginx
# Nginx reverse proxy configuration
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 5. API Endpoints

The Node.js server provides the following endpoints:

### Base URL
- **Development**: `http://localhost:4000`
- **Production**: `https://api.yourdomain.com`

### Available Endpoints

```
GET  /api/health           # Server status check
POST /api/forms            # Submit application form
GET  /api/applications     # List applications (admin)
GET  /api/applications/:id # Get specific application
```

### POST /api/forms - Submit Application

**Request Body Example:**
```json
{
  "mapping": {
    "emailFromProperty": "email",
    "emailFromName": "name",
    "emailTo": "admin"
  },
  "formData": {
    "type": "TYPE_RECRUITMENT",
    "name": "Ion Popescu",
    "email": "ion.popescu@email.com",
    "phone": "0723456789",
    "experience": "3-5-ani",
    "hasVehicle": "yes",
    "vehicleBrand": "Dacia Logan",
    "vehicleYear": 2020,
    "vehicleFuel": "benzina",
    "vehicleColor": "Alb",
    "availability": "imediat",
    "preferredSchedule": "full-time",
    "message": "Optional message",
    "source": "/recrutare",
    "acceptTerms": true
  }
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "app_123456",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build (optimized)
- `npm run build-only` - Build without type checking  
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint check and fix