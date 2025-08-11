<template>
  <div class="policy-page">
    <div class="container">
      <h1>Politica de Utilizare a Cookie-urilor</h1>
      
      <div class="policy-content">
          
          <section>
          <h2>1. Ce sunt cookie-urile?</h2>
          <p>
            Cookie-urile sunt fișiere mici de text care sunt stocate pe dispozitivul dumneavoastră 
            (computer, telefon mobil sau tabletă) atunci când vizitați un site web. Ele ajută site-ul 
            web să își amintească informații despre vizita dumneavoastră.
          </p>
        </section>

        <section>
          <h2>2. Cum utilizăm cookie-urile</h2>
          <p>Utilizăm cookie-uri pentru:</p>
          <ul>
            <li>A îmbunătăți funcționalitatea site-ului nostru</li>
            <li>A analiza traficul și comportamentul utilizatorilor</li>
            <li>A personaliza experiența dumneavoastră</li>
            <li>A reține preferințele dumneavoastră</li>
            <li>A măsura eficacitatea campaniilor noastre de marketing</li>
          </ul>
        </section>

        <section>
          <h2>3. Tipurile de cookie-uri pe care le folosim</h2>
          
          <h3>Cookie-uri esențiale</h3>
          <p>
            Aceste cookie-uri sunt necesare pentru funcționarea corectă a site-ului și nu pot fi dezactivate. 
            Ele includ cookie-uri pentru securitate, sesiune și funcționalități de bază.
          </p>
          
          <h3>Cookie-uri de performanță</h3>
          <p>
            Aceste cookie-uri ne ajută să înțelegem cum interactionează vizitatorii cu site-ul nostru, 
            colectând informații în mod anonim despre paginile vizitate.
          </p>
          
          <h3>Cookie-uri funcționale</h3>
          <p>
            Aceste cookie-uri permit site-ului să își amintească alegerile făcute de dumneavoastră 
            (cum ar fi limba) și să ofere funcții îmbunătățite și personalizate.
          </p>
          
          <h3>Cookie-uri de marketing</h3>
          <p>
            Aceste cookie-uri sunt utilizate pentru a vă livra reclame relevante și pentru a măsura 
            eficacitatea campaniilor publicitare.
          </p>
        </section>

        <section>
          <h2>4. Cookie-uri terțe părți</h2>
          <p>Utilizăm servicii terțe părți care pot seta cookie-uri pe site-ul nostru:</p>
          <ul>
            <li><strong>Google Analytics:</strong> Pentru analiza traficului web</li>
            <li><strong>Google Fonts:</strong> Pentru încărcarea fonturilor</li>
            <li><strong>Rețele sociale:</strong> Pentru funcționalitățile de partajare</li>
          </ul>
        </section>

        <section>
          <h2>5. Gestionarea cookie-urilor</h2>
          <p>
            Puteți controla și gestiona cookie-urile în mai multe moduri:
          </p>
          <ul>
            <li>Prin setările browser-ului dumneavoastră</li>
            <li>Prin ștergerea cookie-urilor existente</li>
            <li>Prin blocarea cookie-urilor pentru anumite site-uri</li>
          </ul>
          <p>
            <strong>Notă:</strong> Dezactivarea anumitor cookie-uri poate afecta funcționalitatea site-ului.
          </p>
        </section>

        <section>
          <h2>6. Instrucțiuni pentru browsere</h2>
          
          <h3>Chrome</h3>
          <p>Setări → Confidențialitate și securitate → Cookie-uri și alte date ale site-urilor</p>
          
          <h3>Firefox</h3>
          <p>Opțiuni → Confidențialitate și securitate → Cookie-uri și date ale site-urilor</p>
          
          <h3>Safari</h3>
          <p>Preferințe → Confidențialitate → Cookie-uri și datele site-urilor web</p>
          
          <h3>Edge</h3>
          <p>Setări → Cookie-uri și permisiuni site</p>
        </section>

        <section>
          <h2>7. Actualizări ale politicii</h2>
          <p>
            Această politică poate fi actualizată periodic pentru a reflecta modificările 
            în practicile noastre privind cookie-urile. Vă încurajăm să revizuiți această 
            pagină în mod regulat.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Pentru întrebări despre utilizarea cookie-urilor, ne puteți contacta la:
            <a :href="`mailto:${email}`">{{ email }}</a>
          </p>
        </section>

        <div class="last-updated">
          <p><em>Ultima actualizare: Ianuarie 2024</em></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoliticaCookies',
  data() {
    return {
      email: import.meta.env.VITE_EMAIL || 'contact@bloom.ro'
    }
  },
  metaInfo: {
    title: 'Politica Cookie-uri - Bloom'
  }
}
</script>

<style scoped>
.policy-page {
  padding: 80px 0;
  background: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1a1a1a;
}

.policy-content {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #34d186;
}

h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
  color: #333;
}

p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #555;
}

ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #555;
}

a {
  color: #34d186;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

strong {
  font-weight: 600;
  color: #333;
}

.last-updated {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .policy-content {
    padding: 2rem 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.3rem;
  }
}
</style>