<template>
  <div>
    <AppHeader />
    
    <!-- Hero Section -->
    <div class="hero-section guide-hero">
      <div class="hero-background">
        <div class="hero-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <FileText class="badge-icon" />
            <span>Ghidul complet al șoferului</span>
          </div>
          <h1>Ghidul Șoferului Bloom</h1>
          <p class="lead">Tot ce trebuie să știi pentru a deveni șofer-partener Bloom și a lucra legal pentru Bolt și Uber în Timișoara</p>
          
          <div class="hero-stats">
            <div class="stat">
              <div class="stat-number">7 pași</div>
              <div class="stat-label">Process simplu</div>
            </div>
            <div class="stat">
              <div class="stat-number">48h</div>
              <div class="stat-label">Aprobare rapidă</div>
            </div>
            <div class="stat">
              <div class="stat-number">100%</div>
              <div class="stat-label">Suport legal</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table of Contents -->
    <div class="table-of-contents-section">
      <div class="container">
        <div class="toc-card">
          <h2>Cuprins</h2>
          <div class="toc-grid">
            <a href="#cerinte-generale" class="toc-item">
              <div class="toc-number">1</div>
              <div class="toc-content">
                <h3>Cerințe Generale</h3>
                <p>Condiții de bază pentru șoferi</p>
              </div>
            </a>
            <a href="#documente-sofer" class="toc-item">
              <div class="toc-number">2</div>
              <div class="toc-content">
                <h3>Documente Șofer</h3>
                <p>Acte necesare pentru înregistrare</p>
              </div>
            </a>
            <a href="#cerinte-autoturism" class="toc-item">
              <div class="toc-number">3</div>
              <div class="toc-content">
                <h3>Cerințe Autoturism</h3>
                <p>Specificații tehnice și legale</p>
              </div>
            </a>
            <a href="#documente-masina" class="toc-item">
              <div class="toc-number">4</div>
              <div class="toc-content">
                <h3>Documente Mașină</h3>
                <p>Acte necesare pentru vehicul</p>
              </div>
            </a>
            <a href="#servicii-bloom" class="toc-item">
              <div class="toc-number">5</div>
              <div class="toc-content">
                <h3>Servicii Bloom</h3>
                <p>Suport și asistență oferite</p>
              </div>
            </a>
            <a href="#taxe-impozite" class="toc-item">
              <div class="toc-number">6</div>
              <div class="toc-content">
                <h3>Taxe și Impozite</h3>
                <p>Obligații fiscale și optimizări</p>
              </div>
            </a>
            <a href="#procesul-angajare" class="toc-item">
              <div class="toc-number">7</div>
              <div class="toc-content">
                <h3>Procesul de Angajare</h3>
                <p>Pași pentru a începe colaborarea</p>
              </div>
            </a>
            <a href="#faq" class="toc-item">
              <div class="toc-number">8</div>
              <div class="toc-content">
                <h3>Întrebări Frecvente</h3>
                <p>Răspunsuri la întrebările comune</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="content-sections">
      <div class="container">
        
        <!-- Cerințe Generale -->
        <section id="cerinte-generale" class="content-section">
          <div class="section-header">
            <div class="section-number">01</div>
            <div class="section-title-wrapper">
              <h2>Cerințe Generale</h2>
              <p>Condiții de bază pe care trebuie să le îndeplinești pentru a deveni șofer-partener Bloom</p>
            </div>
          </div>
          
          <div class="requirements-grid">
            <div class="requirement-card">
              <div class="req-icon">👤</div>
              <h3>Vârstă minimă</h3>
              <p>Minim 21 de ani împliniți</p>
            </div>
            <div class="requirement-card">
              <div class="req-icon">🚗</div>
              <h3>Permis de conducere</h3>
              <p>Vechime minim 2 ani (categoria B)</p>
            </div>
            <div class="requirement-card">
              <div class="req-icon">📱</div>
              <h3>Smartphone</h3>
              <p>Android 5.0+ sau iOS 10.0+</p>
            </div>
            <div class="requirement-card">
              <div class="req-icon">🏠</div>
              <h3>Rezidență</h3>
              <p>Domiciliu în România</p>
            </div>
            <div class="requirement-card">
              <div class="req-icon">💬</div>
              <h3>Limba română</h3>
              <p>Cunoștințe conversaționale</p>
            </div>
            <div class="requirement-card">
              <div class="req-icon">🎯</div>
              <h3>Orientare în oraș</h3>
              <p>Cunoașterea Timișoarei (avantaj)</p>
            </div>
          </div>
        </section>

        <!-- Documente Șofer -->
        <section id="documente-sofer" class="content-section">
          <div class="section-header">
            <div class="section-number">02</div>
            <div class="section-title-wrapper">
              <h2>Documente pentru Șofer</h2>
              <p>Lista completă de acte pe care trebuie să le ai pregătite pentru înregistrare</p>
            </div>
          </div>
          
          <div class="documents-list">
            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>Aviz medical și psihologic valabil</h3>
                <p>Certificat medical care atestă aptitudinea psihică și fizică pentru conducerea vehiculelor categoriei B în regim de închiriere. Valabil 1 an.</p>
                <div class="doc-details">
                  <span class="detail-item">📍 Se obține de la medicul de familie + psiholog autorizat</span>
                  <span class="detail-item">💰 Cost aproximativ: 200-300 lei</span>
                  <span class="detail-item">⏱️ Valabilitate: 12 luni</span>
                </div>
              </div>
            </div>

            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>Permis de conducere</h3>
                <p>Permis categoria B cu vechime de minimum 2 ani, valabil și neîntrerupt.</p>
                <div class="doc-details">
                  <span class="detail-item">📅 Vechime minimă: 24 luni</span>
                  <span class="detail-item">✅ Fără suspendări în ultimii 2 ani</span>
                  <span class="detail-item">🔄 Copie xerox + original pentru verificare</span>
                </div>
              </div>
            </div>

            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>Carte de identitate</h3>
                <p>Buletin sau carte de identitate electronică valabilă.</p>
                <div class="doc-details">
                  <span class="detail-item">🆔 Copie după CI + original</span>
                  <span class="detail-item">📍 Domiciliu în România</span>
                </div>
              </div>
            </div>

            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>Cazier judiciar și auto</h3>
                <p>Cazier judiciar pentru România și cazier auto (extrasul de pe permisul de conducere).</p>
                <div class="doc-details">
                  <span class="detail-item">🏛️ Cazier judiciar: gratuit de pe site-ul ANI</span>
                  <span class="detail-item">🚗 Cazier auto: de la DRPCIV</span>
                  <span class="detail-item">📅 Valabilitate: 6 luni</span>
                </div>
              </div>
            </div>

            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>Certificate de studii</h3>
                <p>Diploma de bacalaureat sau echivalent (minimum 10 clase).</p>
                <div class="doc-details">
                  <span class="detail-item">🎓 Diploma de bacalaureat sau certificat de absolvire</span>
                  <span class="detail-item">📄 Copie legalizată</span>
                </div>
              </div>
            </div>

            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>Atestat profesional transport persoane</h3>
                <p>Atestat pentru transportul de persoane în regim de închiriere eliberat de ARR.</p>
                <div class="doc-details">
                  <span class="detail-item">📋 Se obține de la ARR după susținerea examenului</span>
                  <span class="detail-item">💰 Cost: ~400 lei (taxe + cursuri)</span>
                  <span class="detail-item">⏱️ Valabilitate: 5 ani</span>
                  <span class="detail-item">✨ Bloom te asistă în obținerea atestatului</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Cerințe Autoturism -->
        <section id="cerinte-autoturism" class="content-section">
          <div class="section-header">
            <div class="section-number">03</div>
            <div class="section-title-wrapper">
              <h2>Cerințe pentru Autoturism</h2>
              <p>Specificațiile tehnice și legale pe care trebuie să le îndeplinească vehiculul tău</p>
            </div>
          </div>

          <div class="car-requirements">
            <div class="req-category">
              <h3>Specificații Tehnice</h3>
              <div class="spec-grid">
                <div class="spec-item">
                  <div class="spec-icon">📅</div>
                  <div class="spec-content">
                    <h4>Anul fabricației</h4>
                    <p>Maximum 10 ani (pentru Bolt și Uber)</p>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">🚪</div>
                  <div class="spec-content">
                    <h4>Numărul de uși</h4>
                    <p>Minimum 4 uși + portbagaj separat</p>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">👥</div>
                  <div class="spec-content">
                    <h4>Locuri</h4>
                    <p>Minimum 4 locuri (excluzând șoferul)</p>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">🔧</div>
                  <div class="spec-content">
                    <h4>Starea tehnică</h4>
                    <p>Funcționare perfectă, fără defecțiuni vizibile</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="req-category">
              <h3>Aspectul Exterior și Interior</h3>
              <div class="spec-grid">
                <div class="spec-item">
                  <div class="spec-icon">✨</div>
                  <div class="spec-content">
                    <h4>Exterior</h4>
                    <p>Caroserie intactă, fără rugină, zgârieturi mari sau impact</p>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">🪑</div>
                  <div class="spec-content">
                    <h4>Interior</h4>
                    <p>Tapițerie curată, fără rupturi, pete sau mirosuri</p>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">❄️</div>
                  <div class="spec-content">
                    <h4>Aer condiționat</h4>
                    <p>Sistem de climatizare funcțional (obligatoriu vara)</p>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">💺</div>
                  <div class="spec-content">
                    <h4>Centuri de siguranță</h4>
                    <p>Toate centurile funcționale și în stare bună</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="req-category">
              <h3>Dotări Obligatorii</h3>
              <div class="spec-grid">
                <div class="spec-item">
                  <div class="spec-icon">📱</div>
                  <div class="spec-content">
                    <h4>Suport telefon</h4>
                    <p>Suport stabil pentru aplicația de navigație</p>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">🔌</div>
                  <div class="spec-content">
                    <h4>Încărcător telefon</h4>
                    <p>Priză 12V sau USB pentru încărcarea dispozitivelor</p>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">💧</div>
                  <div class="spec-content">
                    <h4>Apă pentru pasageri</h4>
                    <p>Recomandare: sticle de apă la dispoziția clienților</p>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">🧽</div>
                  <div class="spec-content">
                    <h4>Kit curățenie</h4>
                    <p>Produse pentru menținerea curățeniei vehiculului</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Documente Mașină -->
        <section id="documente-masina" class="content-section">
          <div class="section-header">
            <div class="section-number">04</div>
            <div class="section-title-wrapper">
              <h2>Documente pentru Mașină</h2>
              <p>Acte legale necesare pentru autorizarea vehiculului în activitatea de ridesharing</p>
            </div>
          </div>

          <div class="documents-list">
            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>Asigurarea RCA</h3>
                <p>Asigurare de răspundere civilă auto valabilă, cu mențiunea pentru transport persoane în regim de închiriere.</p>
                <div class="doc-details">
                  <span class="detail-item">📋 RCA cu clauza "transport persoane contra cost"</span>
                  <span class="detail-item">💰 Cost suplimentar: ~200-400 lei/an</span>
                  <span class="detail-item">🛡️ Bloom te ajută să găsești cele mai bune prețuri</span>
                </div>
              </div>
            </div>

            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>ITP autorizat pentru ridesharing</h3>
                <p>Inspecție tehnică periodică cu autorizație specială pentru transportul de persoane în regim de închiriere.</p>
                <div class="doc-details">
                  <span class="detail-item">🔧 ITP normal + inspecție suplimentară ARR</span>
                  <span class="detail-item">💰 Cost: ~300-500 lei</span>
                  <span class="detail-item">📅 Reînnoire: anual</span>
                  <span class="detail-item">🏢 Se face la stații ITP autorizate ARR</span>
                </div>
              </div>
            </div>

            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>Autorizația și Ecusoanele ARR</h3>
                <p>Copie conformă după autorizația de transport și ecusoanele oficiale eliberate de ARR prin firma Bloom.</p>
                <div class="doc-details">
                  <span class="detail-item">📄 Copie conformă certificată notarial</span>
                  <span class="detail-item">🏷️ Ecusoane pentru parbriz și laterale</span>
                  <span class="detail-item">✨ Bloom se ocupă de toate formalitățile</span>
                  <span class="detail-item">💰 Taxa ARR inclusă în serviciile Bloom</span>
                </div>
              </div>
            </div>

            <div class="document-item required">
              <div class="doc-status">
                <CheckCircle class="status-icon required" />
                <span class="status-label">OBLIGATORIU</span>
              </div>
              <div class="doc-content">
                <h3>Contract de comodat</h3>
                <p>Contract între firma Bloom și proprietarul mașinii pentru folosirea vehiculului în activitatea de transport.</p>
                <div class="doc-details">
                  <span class="detail-item">📋 Contract standard pregătit de Bloom</span>
                  <span class="detail-item">⚖️ Cadru legal complet pentru colaborare</span>
                  <span class="detail-item">🛡️ Protecție juridică pentru toate părțile</span>
                  <span class="detail-item">📝 Bloom se ocupă de întreaga documentație</span>
                </div>
              </div>
            </div>

            <div class="document-item optional">
              <div class="doc-status">
                <Info class="status-icon optional" />
                <span class="status-label">RECOMANDAT</span>
              </div>
              <div class="doc-content">
                <h3>Asigurarea CASCO</h3>
                <p>Asigurare voluntară pentru protecția completă a vehiculului.</p>
                <div class="doc-details">
                  <span class="detail-item">💡 Recomandată pentru vehicule noi sau de valoare</span>
                  <span class="detail-item">🛡️ Protecție în caz de furt, vandalism, calamități</span>
                  <span class="detail-item">💰 Bloom negociază prețuri preferențiale</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Servicii Bloom -->
        <section id="servicii-bloom" class="content-section">
          <div class="section-header">
            <div class="section-number">05</div>
            <div class="section-title-wrapper">
              <h2>Servicii Oferite de Bloom</h2>
              <p>Tot suportul de care ai nevoie pentru a lucra legal și eficient ca șofer-partener</p>
            </div>
          </div>

          <div class="services-grid">
            <div class="service-card featured">
              <div class="service-icon">🧾</div>
              <h3>Suport pentru Casa de Marcat</h3>
              <div class="service-content">
                <p>Asistență completă pentru configurarea și utilizarea casei de marcat electronice.</p>
                <ul>
                  <li>Configurare inițială și conectare la ANAF</li>
                  <li>Training pentru emiterea bonurilor fiscale</li>
                  <li>Suport tehnic permanent</li>
                  <li>Înlocuirea gratuită în caz de defect</li>
                  <li>Actualizări software automate</li>
                </ul>
              </div>
            </div>

            <div class="service-card">
              <div class="service-icon">🔧</div>
              <h3>Mentenanță Tehnică Mașini</h3>
              <div class="service-content">
                <p>Servicii de întreținere și reparații la prețuri preferențiale.</p>
                <ul>
                  <li>Rețea de service-uri partenere în Timișoara</li>
                  <li>Reduceri de până la 20% la manopera</li>
                  <li>Planificare inteligentă a reviziilor</li>
                  <li>Mașini de rezervă în caz de reparații majore</li>
                </ul>
              </div>
            </div>

            <div class="service-card">
              <div class="service-icon">🚗</div>
              <h3>Colaborare Parcuri Auto</h3>
              <div class="service-content">
                <p>Parteneriatul cu firme de închiriat mașini pentru șoferii fără vehicul propriu.</p>
                <ul>
                  <li>Mașini noi, dotate complet pentru ridesharing</li>
                  <li>Tarife preferențiale de închiriere</li>
                  <li>Contracte flexibile (zilnic, săptămânal, lunar)</li>
                  <li>Asigurări incluse în prețul de închiriere</li>
                </ul>
              </div>
            </div>

            <div class="service-card">
              <div class="service-icon">⚖️</div>
              <h3>Suport pentru Condițiile Legale</h3>
              <div class="service-content">
                <p>Asistență juridică și administrativă pentru conformitatea legală.</p>
                <ul>
                  <li>Obținerea autorizațiilor ARR</li>
                  <li>Întocmirea contractelor de muncă</li>
                  <li>Consiliere juridică gratuită</li>
                  <li>Reprezentare la instituțiile statului</li>
                </ul>
              </div>
            </div>

            <div class="service-card">
              <div class="service-icon">📈</div>
              <h3>Optimizarea Fiscală</h3>
              <div class="service-content">
                <p>Strategii legale pentru minimizarea taxelor și maximizarea veniturilor.</p>
                <ul>
                  <li>Calcul optim al impozitelor și contribuțiilor</li>
                  <li>Declarații fiscale pregătite de experți</li>
                  <li>Monitorizarea modificărilor legislative</li>
                  <li>Consiliere gratuită cu contabilul firmei</li>
                </ul>
              </div>
            </div>

            <div class="service-card">
              <div class="service-icon">🎓</div>
              <h3>Training și Dezvoltare</h3>
              <div class="service-content">
                <p>Cursuri și materiale pentru îmbunătățirea performanței ca șofer.</p>
                <ul>
                  <li>Training pentru obținerea atestatului profesional</li>
                  <li>Cursuri de customer service</li>
                  <li>Ghiduri pentru maximizarea veniturilor</li>
                  <li>Sesiuni de feedback și îmbunătățire</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Taxe și Impozite -->
        <section id="taxe-impozite" class="content-section">
          <div class="section-header">
            <div class="section-number">06</div>
            <div class="section-title-wrapper">
              <h2>Taxe și Impozite</h2>
              <p>Structura de costuri și beneficii pentru șoferii angajați prin Contract Individual de Muncă</p>
            </div>
          </div>

          <div class="tax-info">
            <div class="cost-breakdown">
              <h3>Structura de costuri pentru șoferi</h3>
              <div class="cost-grid">
                <div class="cost-card primary">
                  <div class="cost-header">
                    <FileText class="cost-icon" />
                    <h4>Contract Individual de Muncă</h4>
                  </div>
                  <div class="cost-details">
                    <div class="cost-item">
                      <span class="cost-label">Comision Bloom:</span>
                      <span class="cost-value highlight">10%</span>
                    </div>
                    <div class="cost-item">
                      <span class="cost-label">Impozit pe salariu:</span>
                      <span class="cost-value">10%</span>
                    </div>
                    <div class="cost-item">
                      <span class="cost-label">Contribuții sociale:</span>
                      <span class="cost-value">25%</span>
                    </div>
                    <div class="cost-total">
                      <span class="total-label">Total deduceri:</span>
                      <span class="total-value">45%</span>
                    </div>
                  </div>
                </div>

                <div class="cost-card benefits">
                  <div class="cost-header">
                    <CheckCircle class="cost-icon" />
                    <h4>Ce primești în schimb</h4>
                  </div>
                  <div class="benefits-content">
                    <ul>
                      <li>Asigurări de sănătate și muncă</li>
                      <li>Drept la concediu plătit</li>
                      <li>Protecție socială completă</li>
                      <li>Suport tehnic și juridic 24/7</li>
                      <li>Fără griji administrative</li>
                      <li>Conformitate legală 100%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="tax-calculator">
              <h3>Calculator de venit net</h3>
              <div class="calculator-content">
                <div class="calc-inputs">
                  <div class="input-group">
                    <label>Venit brut lunar estimat:</label>
                    <input type="number" v-model="grossIncome" placeholder="ex: 8000" />
                    <span class="input-suffix">lei</span>
                  </div>
                </div>
                <div class="calc-results">
                  <div class="result-item">
                    <span class="result-label">Venit brut:</span>
                    <span class="result-value">{{ grossIncome }} lei</span>
                  </div>
                  <div class="result-item deduction">
                    <span class="result-label">- Comision Bloom (10%):</span>
                    <span class="result-value">{{ calculateBloomCommission(grossIncome) }} lei</span>
                  </div>
                  <div class="result-item deduction">
                    <span class="result-label">- Impozit + Contribuții (35%):</span>
                    <span class="result-value">{{ calculateSalaryTax(grossIncome) + calculateSocialContrib(grossIncome) }} lei</span>
                  </div>
                  <div class="result-item highlight">
                    <span class="result-label">Venit net în mână:</span>
                    <span class="result-value">{{ calculateNetIncomeWithCommission(grossIncome) }} lei</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Procesul de Angajare -->
        <section id="procesul-angajare" class="content-section">
          <div class="section-header">
            <div class="section-number">07</div>
            <div class="section-title-wrapper">
              <h2>Procesul de Angajare</h2>
              <p>Pașii simpli și rapizi pentru a începe colaborarea cu Bloom</p>
            </div>
          </div>

          <div class="process-timeline">
            <div class="timeline-item">
              <div class="timeline-number">1</div>
              <div class="timeline-content">
                <h3>Aplicarea inițială</h3>
                <p>Completează formularul de aplicare online cu informațiile de bază.</p>
                <div class="timeline-details">
                  <span class="detail">⏱️ Durată: 10 minute</span>
                  <span class="detail">📱 Online sau telefonic</span>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-number">2</div>
              <div class="timeline-content">
                <h3>Consultația gratuită</h3>
                <p>Programează o întâlnire cu consultantul Bloom pentru detalii și răspunsuri la întrebări.</p>
                <div class="timeline-details">
                  <span class="detail">⏱️ Durată: 30-45 minute</span>
                  <span class="detail">🏢 La biroul Bloom din Timișoara</span>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-number">3</div>
              <div class="timeline-content">
                <h3>Strângerea documentelor</h3>
                <p>Pregătirea actelor necesare cu suportul echipei Bloom.</p>
                <div class="timeline-details">
                  <span class="detail">⏱️ Durată: 3-7 zile</span>
                  <span class="detail">✨ Asistență completă pentru obținere</span>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-number">4</div>
              <div class="timeline-content">
                <h3>Verificarea vehiculului</h3>
                <p>Inspecția tehnică și estetică a mașinii de către specialiștii Bloom.</p>
                <div class="timeline-details">
                  <span class="detail">⏱️ Durată: 30 minute</span>
                  <span class="detail">📋 Verificare conform standardelor Bolt/Uber</span>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-number">5</div>
              <div class="timeline-content">
                <h3>Semnarea contractului</h3>
                <p>Încheierea contractului de colaborare și configurarea conturilor pe platforme.</p>
                <div class="timeline-details">
                  <span class="detail">⏱️ Durată: 1 oră</span>
                  <span class="detail">📄 Contract legal complet</span>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-number">6</div>
              <div class="timeline-content">
                <h3>Training și setup</h3>
                <p>Instruire pentru folosirea aplicațiilor și configurarea echipamentelor.</p>
                <div class="timeline-details">
                  <span class="detail">⏱️ Durată: 2 ore</span>
                  <span class="detail">📱 Training practic cu aplicațiile</span>
                </div>
              </div>
            </div>

            <div class="timeline-item completed">
              <div class="timeline-number">7</div>
              <div class="timeline-content">
                <h3>Primul zbor</h3>
                <p>Începi să lucrezi ca șofer-partener Bloom cu suport complet!</p>
                <div class="timeline-details">
                  <span class="detail">🚗 Start imediat</span>
                  <span class="detail">📞 Suport 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ -->
        <section id="faq" class="content-section">
          <div class="section-header">
            <div class="section-number">08</div>
            <div class="section-title-wrapper">
              <h2>Întrebări Frecvente</h2>
              <p>Răspunsuri la cele mai comune întrebări ale viitorilor șoferi-parteneri</p>
            </div>
          </div>

          <div class="faq-list">
            <div class="faq-item" @click="toggleFAQ('faq1')">
              <div class="faq-question">
                <h3>Cât câștig în medie pe lună?</h3>
                <ChevronDown :class="{ rotated: activeFAQ === 'faq1' }" />
              </div>
              <div class="faq-answer" :class="{ active: activeFAQ === 'faq1' }">
                <p>Veniturile variază în funcție de orele lucrate, zona de activitate și perioada. În medie, șoferii noștri câștigă între 5.000-8.000 lei net pe lună lucrând 8-10 ore pe zi. Șoferii cu experiență și care lucrează în orele de vârf pot ajunge și la 10.000+ lei lunar.</p>
              </div>
            </div>

            <div class="faq-item" @click="toggleFAQ('faq2')">
              <div class="faq-question">
                <h3>Pot lucra part-time?</h3>
                <ChevronDown :class="{ rotated: activeFAQ === 'faq2' }" />
              </div>
              <div class="faq-answer" :class="{ active: activeFAQ === 'faq2' }">
                <p>Absolut! Unul dintre marile avantaje ale colaborării cu Bloom este flexibilitatea totală. Poți lucra când vrei, cât vrei. Mulți dintre partenerii noștri lucrează part-time, combinând cu alte activități sau în weekend.</p>
              </div>
            </div>

            <div class="faq-item" @click="toggleFAQ('faq3')">
              <div class="faq-question">
                <h3>Ce costuri am cu întreținerea mașinii?</h3>
                <ChevronDown :class="{ rotated: activeFAQ === 'faq3' }" />
              </div>
              <div class="faq-answer" :class="{ active: activeFAQ === 'faq3' }">
                <p>Costurile principale sunt combustibilul (40-50% din venit), asigurarea RCA specială (~300-500 lei/an suplimentar), ITP pentru ridesharing (~400 lei/an) și întreținerea normală. Bloom te ajută să optimizezi aceste costuri prin parteneriatul cu service-uri și asiguratori.</p>
              </div>
            </div>

            <div class="faq-item" @click="toggleFAQ('faq4')">
              <div class="faq-question">
                <h3>Cât durează procesul de aprobare?</h3>
                <ChevronDown :class="{ rotated: activeFAQ === 'faq4' }" />
              </div>
              <div class="faq-answer" :class="{ active: activeFAQ === 'faq4' }">
                <p>Dacă ai toate documentele pregătite, poți începe să lucrezi în 24-48 ore. Cel mai mult timp îl ia obținerea atestatului profesional (1-2 săptămâni) și ITP-ul pentru ridesharing, dar Bloom te asistă în tot procesul pentru a-l accelera.</p>
              </div>
            </div>

            <div class="faq-item" @click="toggleFAQ('faq5')">
              <div class="faq-question">
                <h3>Ce se întâmplă dacă nu am mașină proprie?</h3>
                <ChevronDown :class="{ rotated: activeFAQ === 'faq5' }" />
              </div>
              <div class="faq-answer" :class="{ active: activeFAQ === 'faq5' }">
                <p>Bloom colaborează cu mai multe parcuri auto din Timișoara. Poți închiria o mașină pregătită special pentru ridesharing, cu toate documentele în regulă, la tarife preferențiale. Costul închirierii variază între 700-1200 lei/săptămână, în funcție de modelul ales.</p>
              </div>
            </div>

            <div class="faq-item" @click="toggleFAQ('faq6')">
              <div class="faq-question">
                <h3>Sunt protejat legal lucrând cu Bloom?</h3>
                <ChevronDown :class="{ rotated: activeFAQ === 'faq6' }" />
              </div>
              <div class="faq-answer" :class="{ active: activeFAQ === 'faq6' }">
                <p>Da, complet! Bloom oferă contract de muncă legal, toate autorizațiile necesare sunt în regulă, beneficiezi de asigurare de sănătate și contribuții la pensia. În plus, echipa juridică Bloom te asistă în caz de probleme sau dispute.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Gata să devii șofer-partener Bloom?</h2>
          <p>Începe procesul de aplicare și alătură-te echipei celor mai bine plătiți șoferi din Timișoara!</p>
          <div class="cta-actions">
            <router-link to="/recrutare" class="btn-primary btn-large">
              <Car class="btn-icon" />
              Aplică acum
            </router-link>
            <a :href="`tel:${phoneNumber}`" class="btn-secondary">
              <Phone class="btn-icon" />
              Sună pentru detalii
            </a>
          </div>
          <div class="contact-info">
            <span><Phone class="contact-icon" /> {{ phoneNumber }}</span>
            <span><Mail class="contact-icon" /> {{ email }}</span>
            <span><MapPin class="contact-icon" /> Timișoara, România</span>
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
import { 
  FileText, CheckCircle, Info, ChevronDown, Car, Phone, Mail, MapPin, DollarSign, Coins
} from 'lucide-vue-next'
import '@/assets/styles/shared.css'

export default {
  name: 'GhidulSoferului',
  components: {
    AppHeader,
    AppFooter,
    FileText,
    CheckCircle,
    Info,
    ChevronDown,
    Car,
    Phone,
    Mail,
    MapPin,
    DollarSign,
    Coins
  },
  data() {
    return {
      activeFAQ: null,
      grossIncome: 8000,
      phoneNumber: import.meta.env.VITE_PHONE_NUMBER || '0756123499',
      email: import.meta.env.VITE_EMAIL || 'contact@bloom.ro'
    }
  },
  methods: {
    toggleFAQ(faqId) {
      this.activeFAQ = this.activeFAQ === faqId ? null : faqId
    },
    calculateBloomCommission(income) {
      return Math.round(income * 0.1) // 10% comision Bloom
    },
    calculateSalaryTax(income) {
      // Impozit pe salariu 10% din venitul după comision
      const afterCommission = income - this.calculateBloomCommission(income)
      return Math.round(afterCommission * 0.1)
    },
    calculateSocialContrib(income) {
      // Contribuții sociale 25% din venitul după comision
      const afterCommission = income - this.calculateBloomCommission(income)
      return Math.round(afterCommission * 0.25)
    },
    calculateNetIncomeWithCommission(income) {
      const commission = this.calculateBloomCommission(income)
      const afterCommission = income - commission
      const salaryTax = this.calculateSalaryTax(income)
      const socialContrib = this.calculateSocialContrib(income)
      return Math.round(afterCommission - salaryTax - socialContrib)
    },
    // Metode vechi păstrate pentru compatibilitate
    calculateTax(income, rate) {
      return Math.round((income * 12 * rate) / 100)
    },
    calculateNetIncome(income) {
      return this.calculateNetIncomeWithCommission(income)
    }
  },
  metaInfo: {
    title: 'Ghidul Șoferului - Bloom Timișoara'
  }
}
</script>

<style scoped>
/* Hero Section */
.guide-hero {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #34d186 100%);
  color: white;
}

/* Table of Contents */
.table-of-contents-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.toc-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
}

.toc-card h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  color: #1a1a1a;
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.toc-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  border: 1px solid #e9ecef;
}

.toc-item:hover {
  background: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transform: translateY(-2px);
  border-color: #34d186;
  text-decoration: none;
  color: inherit;
}

.toc-number {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.toc-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.toc-content p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

/* Content Sections */
.content-sections {
  padding: 80px 0;
  background: white;
}

.content-section {
  margin-bottom: 6rem;
}

.content-section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: flex-start;
  text-align: initial;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 3px solid #f0f0f0;
}

.section-number {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.section-title-wrapper h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.section-title-wrapper p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Requirements Grid */
.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.requirement-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid #e9ecef;
  transition: all 0.3s;
}

.requirement-card:hover {
  background: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-color: #34d186;
}

.req-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.requirement-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.requirement-card p {
  color: #666;
  margin: 0;
}

/* Documents List */
.documents-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.document-item {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-left: 5px solid #34d186;
}

.document-item.optional {
  border-left-color: #ffc107;
}

.doc-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.status-icon {
  width: 20px;
  height: 20px;
}

.status-icon.required {
  color: #34d186;
}

.status-icon.optional {
  color: #ffc107;
}

.status-label {
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
}

.document-item.required .status-label {
  background: rgba(52, 209, 134, 0.1);
  color: #34d186;
}

.document-item.optional .status-label {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.doc-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.doc-content p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.doc-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Car Requirements */
.car-requirements {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.req-category h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #34d186;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.spec-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  border: 1px solid #e9ecef;
}

.spec-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.spec-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.spec-content p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.service-card.featured {
  border-left: 5px solid #34d186;
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.05) 0%, rgba(40, 167, 69, 0.05) 100%);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.service-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.service-content p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-content ul {
  list-style: none;
  padding: 0;
}

.service-content li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.service-content li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #34d186;
  font-weight: bold;
}

/* Tax Information */
.tax-info {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Cost Breakdown */
.cost-breakdown {
  margin-bottom: 3rem;
}

.cost-breakdown h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1a1a1a;
}

.cost-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.cost-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
}

.cost-card.primary {
  border-left: 5px solid #34d186;
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.05) 0%, rgba(40, 167, 69, 0.05) 100%);
}

.cost-card.benefits {
  border-left: 5px solid #28a745;
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(52, 209, 134, 0.05) 100%);
}

.cost-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.cost-icon {
  width: 24px;
  height: 24px;
  color: #34d186;
}

.cost-header h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.cost-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.cost-item:last-child {
  border-bottom: none;
}

.cost-label {
  color: #666;
  font-weight: 500;
}

.cost-value {
  font-weight: 600;
  color: #333;
}

.cost-value.highlight {
  color: #34d186;
  font-weight: 700;
  font-size: 1.1rem;
}

.cost-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 2px solid #34d186;
  margin-top: 0.5rem;
}

.total-label {
  font-weight: 700;
  color: #1a1a1a;
}

.total-value {
  font-weight: 700;
  font-size: 1.2rem;
  color: #34d186;
}

.benefits-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefits-content li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: #666;
  line-height: 1.4;
}

.benefits-content li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #34d186;
  font-weight: bold;
}

.calc-results .result-item.deduction .result-value {
  color: #e74c3c;
}


.regime-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.regime-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
  position: relative;
}

.regime-card.recommended {
  border-left: 5px solid #34d186;
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.05) 0%, rgba(40, 167, 69, 0.05) 100%);
}

.regime-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #34d186;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.regime-card h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.regime-rate {
  font-size: 2rem;
  font-weight: 700;
  color: #34d186;
  margin-bottom: 0.5rem;
}

.regime-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

.regime-card ul {
  list-style: none;
  padding: 0;
}

.regime-card li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.regime-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #34d186;
  font-weight: bold;
}

/* Tax Calculator */
.tax-calculator {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
}

.tax-calculator h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.calculator-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.input-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.input-group input {
  width: 100%;
  padding: 12px 60px 12px 12px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
}

.input-group input:focus {
  border-color: #34d186;
  outline: none;
}

.input-suffix {
  position: absolute;
  right: 12px;
  bottom: 10px;
  color: #666;
  font-weight: 600;
  pointer-events: none;
}

.calc-results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.result-item.highlight {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  font-weight: 700;
}

.result-value {
  font-weight: 700;
  font-size: 1.1rem;
}

/* Benefits List */
.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.benefit-icon {
  width: 24px;
  height: 24px;
  color: #34d186;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.benefit-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.benefit-content p {
  color: #666;
  margin: 0;
}

/* Process Timeline */
.process-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.process-timeline::before {
  content: '';
  position: absolute;
  left: 25px;
  top: 50px;
  bottom: 50px;
  width: 3px;
  background: linear-gradient(to bottom, #34d186, #28a745);
  border-radius: 2px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  position: relative;
}

.timeline-number {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
  z-index: 2;
}

.timeline-item.completed .timeline-number {
  background: linear-gradient(135deg, #ffc107 0%, #ff8c00 100%);
}

.timeline-content {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
  flex: 1;
}

.timeline-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.timeline-content p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.timeline-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.detail {
  font-size: 0.9rem;
  color: #34d186;
  font-weight: 600;
  background: rgba(52, 209, 134, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
}

/* FAQ */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.faq-question:hover {
  background: #f8f9fa;
}

.faq-question h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.faq-question svg {
  width: 24px;
  height: 24px;
  color: #666;
  transition: transform 0.3s;
}

.faq-question svg.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s;
  background: #f8f9fa;
}

.faq-answer.active {
  max-height: 500px;
  padding: 0 2rem 2rem;
}

.faq-answer p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Contact Info */
.contact-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.9);
}

.contact-info span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-icon {
  width: 18px;
  height: 18px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .toc-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .section-number {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .calculator-content {
    grid-template-columns: 1fr;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .regime-cards {
    grid-template-columns: 1fr;
  }
  
  .process-timeline::before {
    left: 20px;
  }
  
  .timeline-number {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .timeline-item {
    gap: 1rem;
  }
  
  .contact-info {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .cost-grid {
    grid-template-columns: 1fr;
  }
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #34d186 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.cta-content p {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.cta-actions .btn-primary,
.cta-actions .btn-secondary {
  font-size: 1.2rem;
  padding: 18px 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.cta-actions .btn-primary {
  background: linear-gradient(45deg, #fff 0%, #f8f9fa 100%);
  color: #34d186;
}

.cta-actions .btn-primary:hover {
  background: linear-gradient(45deg, #f8f9fa 0%, #fff 100%);
  color: #28a745;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}

.cta-actions .btn-secondary {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
}

.cta-actions .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  color: white;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}

@media (max-width: 768px) {
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .cta-content p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .cta-actions .btn-primary,
  .cta-actions .btn-secondary {
    width: 100%;
    max-width: 300px;
    font-size: 1.1rem;
    padding: 16px 32px;
  }
}
</style>