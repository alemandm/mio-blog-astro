Agisci come un Senior Full Stack Engineer esperto in JAMStack e Developer Education.
Il tuo compito è generare il codice completo e la documentazione per un progetto web basato su Astro e Keystatic, ottimizzato per il deployment su Vercel con integrazione GitHub.

### 1. OBIETTIVO TECNICO (OUTPUT CODICE)
Devi generare i file necessari per una installazione pulita e funzionante con le seguenti caratteristiche:

1.  **Framework:** Astro (ultima versione stabile).
2.  **Styling:** Tailwind CSS (tramite integrazione ufficiale Astro).
3.  **CMS:** Keystatic (tramite `@keystatic/astro` e `@keystatic/core`).
4.  **Adapter & Rendering:**
    * Configura `astro.config.mjs` con `output: 'hybrid'` (fondamentale per le API server-side).
    * Utilizza l'adapter `@astrojs/vercel/serverless`.
5.  **Configurazione Keystatic:**
    * Il file `keystatic.config.ts` deve avere una logica condizionale rigorosa:
        * Se `process.env.NODE_ENV === 'development'`, usa `storage: { kind: 'local' }`.
        * Altrimenti (produzione), usa `storage: { kind: 'github' }` con repository configurato.
    * Crea una "Collection" di esempio chiamata "Blog" (campi: titolo, slug, contenuto rich text).
6.  **Routing:**
    * Genera la rotta UI: `src/pages/keystatic/[...params].astro`.
    * Genera la rotta API: `src/pages/api/keystatic/[...params].ts`.
    * **IMPORTANTE:** Nel file API `[...params].ts`, devi includere esplicitamente `export const prerender = false;` altrimenti il deploy su Vercel fallirà in modalità hybrid.

### 2. OBIETTIVO EDUCATIVO (FILE GUIDA.md)
Scrivi un file `GUIDA.md` rivolto a uno **Sviluppatore Junior** assoluto. Usa un tono incoraggiante e chiaro.
Struttura obbligatoria:

1.  **Concetto:** Spiega in 3 righe cos'è questo stack e perché serve GitHub.
2.  **GitHub OAuth (La parte difficile):** Guida passo-passo "ClickOps" per creare la OAuth App su GitHub.
    * Specifica chiaramente l'**Homepage URL**: `https://tuo-progetto.vercel.app`
    * Specifica chiaramente l'**Authorization callback URL**: `https://tuo-progetto.vercel.app/api/keystatic/github/oauth/callback` (Spiega che questo URL è magico e gestito da Keystatic).
3.  **Vercel Deployment:**
    * Lista delle variabili d'ambiente da copiare su Vercel:
        * `KEYSTATIC_GITHUB_CLIENT_ID`
        * `KEYSTATIC_GITHUB_CLIENT_SECRET`
        * `KEYSTATIC_SECRET` (Spiega come generarlo, es. comando openssl o stringa random).
4.  **Workflow:** Spiega come modificare un post: vai su `/keystatic` -> modifica -> salva -> Keystatic fa il commit su GitHub -> Vercel vede il commit -> Vercel fa il redeploy del sito aggiornato.

### 3. FASE DI AUDIT E VERIFICA (SELF-CHECK)
Al termine della generazione dei file, devi stampare una checklist di verifica dove confermi di aver rispettato i requisiti critici. Usa questo formato:

**✅ CHECKLIST DI SICUREZZA E DEPLOY:**
- [ ] `astro.config.mjs`: Impostato su `output: 'hybrid'` con adapter Vercel?
- [ ] `src/pages/api/keystatic/[...params].ts`: Contiene `export const prerender = false`? (Cruciale per evitare Error 405 su Vercel).
- [ ] `keystatic.config.ts`: La logica Local vs GitHub è corretta?
- [ ] `GUIDA.md`: L'URL di callback OAuth indicato finisce esattamente con `/api/keystatic/github/oauth/callback`?
- [ ] `package.json`: Include `@astrojs/vercel`, `@keystatic/astro`, `@keystatic/core`?

---

**Procedi ora con la generazione del codice file per file e del file GUIDA.md. Rispondi sempre in lingua italiana.**