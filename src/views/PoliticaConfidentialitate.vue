<template>
  <div class="policy-page">
    <div class="container">
      <h1>Politica de Confidențialitate</h1>
      
      <div class="policy-content">
          
          <section>
          <h2>1. Introducere</h2>
          <p>
            Prezenta Politică de Confidențialitate descrie modul în care Bolt Operations OÜ („Bolt", „noi", „nouă") 
            colectează, utilizează și protejează informațiile dumneavoastră personale atunci când aplicați pentru 
            poziția de șofer-partener.
          </p>
        </section>

        <section>
          <h2>2. Informațiile pe care le colectăm</h2>
          <p>Colectăm următoarele tipuri de informații:</p>
          <ul>
            <li>Informații de identificare personală (nume, prenume)</li>
            <li>Informații de contact (adresa de email, numărul de telefon)</li>
            <li>Informații despre vehicul (marca, modelul, anul, tipul de combustibil)</li>
            <li>Alte informații relevante pentru aplicarea la poziția de șofer</li>
          </ul>
        </section>

        <section>
          <h2>3. Cum utilizăm informațiile</h2>
          <p>Utilizăm informațiile colectate pentru:</p>
          <ul>
            <li>Procesarea aplicației dumneavoastră pentru poziția de șofer</li>
            <li>Contactarea dumneavoastră în legătură cu aplicația</li>
            <li>Verificarea eligibilității pentru a deveni șofer-partener</li>
            <li>Respectarea obligațiilor legale</li>
          </ul>
        </section>

        <section>
          <h2>4. Partajarea informațiilor</h2>
          <p>
            Nu partajăm informațiile dumneavoastră personale cu terțe părți, cu excepția cazurilor în care:
          </p>
          <ul>
            <li>Este necesar pentru procesarea aplicației</li>
            <li>Suntem obligați legal să o facem</li>
            <li>Aveți consimțământul explicit</li>
          </ul>
        </section>

        <section>
          <h2>5. Securitatea datelor</h2>
          <p>
            Implementăm măsuri de securitate tehnice și organizatorice adecvate pentru a proteja 
            informațiile dumneavoastră împotriva accesului neautorizat, pierderii sau deteriorării.
          </p>
        </section>

        <section>
          <h2>6. Drepturile dumneavoastră</h2>
          <p>Aveți dreptul să:</p>
          <ul>
            <li>Solicitați accesul la informațiile personale</li>
            <li>Solicitați corectarea informațiilor inexacte</li>
            <li>Solicitați ștergerea informațiilor</li>
            <li>Să vă opuneți prelucrării informațiilor</li>
          </ul>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            Pentru întrebări despre această politică de confidențialitate, ne puteți contacta la:
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
  name: 'PoliticaConfidentialitate',
  data() {
    return {
      email: import.meta.env.VITE_EMAIL || 'contact@bloom.ro'
    }
  },
  metaInfo: {
    title: 'Politica de Confidențialitate - Bloom'
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
}
</style>