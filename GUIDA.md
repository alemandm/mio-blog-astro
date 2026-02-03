# Guida Completa: Da Zero al Deploy con Astro, Keystatic e Vercel 🚀

Questa guida ti accompagnerà passo dopo passo nella creazione del tuo blog. Non daremo nulla per scontato: partiremo dalla creazione del repository su GitHub fino alla configurazione su Vercel.

---

## ✅ Prerequisiti
Assicurati di avere:
1.  Un account **GitHub** (gratuito).
2.  Un account **Vercel** (gratuito, puoi accedere con GitHub).
3.  **Node.js** installato sul tuo computer.
4.  Il terminale aperto nella cartella del tuo progetto (questa cartella).

---

## 1. GitHub: Creazione del Repository
Dobbiamo mettere il tuo codice al sicuro "sulla nuvola" di GitHub.

### 1a. Crea la "Scatola" su GitHub
1.  Vai su [github.com/new](https://github.com/new).
2.  **Repository name:** Scegli un nome, ad esempio `mio-blog-astro`.
3.  **Public/Private:** Scegli "Public" (o Private se preferisci, Vercel supporta entrambi).
4.  **NON spuntare** "Add a README file", "Add .gitignore", ecc. Vogliamo un repository vuoto.
5.  Clicca su **Create repository**.

### 1b. Carica il Codice da Locale
Ora collega il tuo computer a quella scatola vuota.
Copia i comandi che GitHub ti mostra, oppure usa questi (sostituendo `TUO_USERNAME` e `NOME_REPO`):

```bash
# Inizializza Git (se non l'hai già fatto)
git init

# Aggiungi tutti i file
git add .

# Salva la prima versione "fotografia" del codice
git commit -m "Initial commit"

# Rinomina il ramo principale in 'main' (standard moderno)
git branch -M main

# Collega il tuo PC al server GitHub
# SOSTITUISCI CON IL TUO URL REALE! Esempio: https://github.com/MarioRossi/mio-blog-astro.git
git remote add origin https://github.com/TUO_USERNAME/NOME_REPO.git

# Spedisci il codice su GitHub
git push -u origin main
```

Se aggiorni la pagina su GitHub, ora dovresti vedere i tuoi file! ✨

---

## 2. Vercel: Creazione del Progetto
Ora diciamo a Vercel di prendere quel codice e trasformarlo in un sito vero.

1.  Vai su [vercel.com/new](https://vercel.com/new).
2.  Sotto **"Import Git Repository"**, dovresti vedere il tuo repository `mio-blog-astro`.
    *   *Se non lo vedi:* Clicca "Add GitHub Account" o "Adjust GitHub App Permissions" per dare il permesso a Vercel di vederlo.
3.  Clicca **Import** accanto al tuo repository.
4.  Nella schermata "Configure Project":
    *   **Project Name:** Lascia quello proposto o cambialo (questo determinerà l'URL del tuo sito).
    *   **Framework Preset:** Dovrebbe rilevare automaticamente "Astro". Se no, selezionalo.
    *   **Root Directory:** Lascia `./`.
    *   **Environment Variables:** *Aspetta un attimo, le mettiamo dopo.*
5.  Clicca **Deploy**.

Vercel inizierà a costruire il sito. Il primo deploy potrebbe andare a buon fine ma Keystatic (l'area admin) non funzionerà ancora perché mancano le chiavi di sicurezza. È normale!

Una volta finito, Vercel ti darà un dominio (es. `https://mio-blog-astro.vercel.app`). **Copia questo dominio**, ci serve ora.

---

## 3. GitHub OAuth App: Il "Pass" per Keystatic
Per modificare i post dal pannello di admin, Keystatic deve avere il permesso di parlare con GitHub.

1.  Vai su [GitHub Developer Settings](https://github.com/settings/developers).
2.  Clicca **New OAuth App**.
3.  Compila così:
    *   **Application Name:** "Keystatic Admin - Mio Blog"
    *   **Homepage URL:** Incolla il dominio di Vercel (es. `https://mio-blog-astro.vercel.app`) – *Attenzione: deve iniziare con `https://` e non avere barre finali.*
    *   **Authorization callback URL:** Aggiungi il percorso magico al tuo dominio.
        *   Deve essere PRECISO: `https://mio-blog-astro.vercel.app/api/keystatic/github/oauth/callback`
4.  Clicca **Register application**.

Ora vedrai una pagina con le chiavi. Lasciala aperta!

---

## 4. Collegare le Chiavi su Vercel
Torniamo su Vercel per inserire i segreti.

1.  Vai sulla dashboard del tuo progetto su Vercel.
2.  Vai su **Settings** (in alto) -> **Environment Variables** (a sinistra).
3.  Aggiungi queste 3 variabili (copia-incolla da GitHub a Vercel):

| Nome Variabile | Valore da Inserire |
| :--- | :--- |
| `KEYSTATIC_GITHUB_CLIENT_ID` | `Ov23limzrZpDFuA8zalz` |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | `b0bbfd473d724ddf1fdfebb64bb3373015045380` |
| `KEYSTATIC_SECRET` | `dHJpYmVzdW1tZXJzb2Z0bmV4dHRlbm5vcnRodHJlYXRlZHNpbmdhbnl0aGluZ3BhdHQ=` |

### ⚠️ Come generare `KEYSTATIC_SECRET` (Senza openssl)
Visto che sei su Windows e `openssl` potrebbe non funzionare, usa questo comando nel tuo terminale (PowerShell o CMD) per generare una stringa sicura:

```bash
node -e "console.log(crypto.randomBytes(32).toString('base64'))"
```

Copia il risultato che appare e usalo come valore per `KEYSTATIC_SECRET`.

---

## 5. Aggiornamento Finale del Codice
C'è un ultimo passaggio fondamentale! Dobbiamo dire a Keystatic "chi sei" nel file di configurazione.

1.  Apri il file `keystatic.config.ts` nel tuo editor.
2.  Cerca questa sezione:
    ```typescript
    repo: {
      owner: 'YOUR_GITHUB_USERNAME', // CAMBIA QUESTO! Es. 'mario-rossi'
      name: 'YOUR_REPO_NAME',        // CAMBIA QUESTO! Es. 'mio-blog-astro'
    },
    ```
3.  Inserisci il tuo username GitHub e il nome esatto del repository.
4.  Salva il file.
5.  Fai un nuovo commit e push per aggiornare Vercel:
    ```bash
    git add .
    git commit -m "Configura repo keystatic"
    git push
    ```

---

## 6. Finito! Proviamo? 🎉
Vercel rifarà il deploy automaticamente dopo il tuo `git push`. Aspetta un minuto.

1.  Vai su `https://mio-blog-astro.vercel.app/keystatic`
2.  Clicca "Sign in with GitHub".
3.  Se tutto è corretto, entrerai nella dashboard!

**Come lavorare d'ora in poi:**
- Scrivi i post da `/keystatic`.
- Quando salvi, il sito si aggiorna da solo.
- Se vuoi modificare il codice (CSS, layout), fallo sul tuo PC e usa `git push`.

Buona scrittura! ✍️
