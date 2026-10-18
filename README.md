# Dicette Mammà — Bottega di idee personalizzate

Un sito completamente nuovo, sviluppato da zero, con HTML, CSS e JavaScript puro. Compatibile con **GitHub Pages**, senza backend.

## Cosa contiene

- `index.html`: pagina singola con hero, catalogo 3 prodotti, storia, passaggi e FAQ.
- `styles.css`: stile mobile-first con palette blu profondo, terracotta, crema e oro. Solo il cappellino ha il tema natalizio.
- `app.js`: illustrazioni SVG originali, personalizzazione dal vivo, carrello locale e riepilogo WhatsApp.
- `config.js`: numero WhatsApp configurabile e ID GA4 opzionale.

## Funzioni reali

1. Apri “Personalizza” sotto un prodotto.
2. Inserisci nome o frase, colori, quantità e note. L'illustrazione cambia in tempo reale.
3. Aggiungi al carrello. Il carrello resta memorizzato sullo stesso dispositivo, tramite localStorage.
4. Premi “Invia richiesta su WhatsApp” per aprire un messaggio precompilato con i prodotti selezionati.

**Importante:** non è un e-commerce con checkout o pagamenti. L'apertura di WhatsApp non equivale a un messaggio inviato né a un ordine confermato. Le richieste non sono archiviate su un server; non c'è una dashboard degli ordini. Per vendite continuative servono gli adempimenti previsti dalla normativa italiana.

## Pubblicazione su GitHub Pages

1. Crea un nuovo repository o una branch di prova, senza sostituire subito il sito attuale.
2. Carica nella radice `index.html`, `styles.css`, `app.js`, `config.js`.
3. In **Settings → Pages**, attiva Deploy from a branch / root.
4. Verifica sul sito di prova la resa su telefono e desktop.
5. Se vuoi collegare il dominio personalizzato, fallo solo quando la nuova versione è approvata.

## Configurazione

`config.js` contiene il numero per le richieste WhatsApp. **Verifica che sia corretto prima della pubblicazione.**

I prezzi per la prova si trovano in `app.js` nella costante `PRODUCTS`: 5,90 €, 7,90 €, 4,90 €. Sono **prezzi indicativi**, non condizioni commerciali garantite; prima di accettare vendite effettive verifica fiscalità, produzione, spedizioni, costi e condizioni applicabili.

Le illustrazioni dei prodotti sono **mockup SVG originali**, non fotografie dei pezzi reali. Per un lancio commerciale è preferibile sostituirle o affiancarle con immagini dei prototipi reali.

## Statistiche

Il file `config.js` include `ga4MeasurementId` vuoto. Non sono attivate statistiche reali di visita finché non inserisci un tuo Measurement ID e non configuri opportunamente il consenso e l'informativa privacy. Se attivi l'ID, viene mostrata una scelta per consentire o rifiutare il tracciamento. Adegua i testi e la soluzione cookie alle tue esigenze prima di pubblicare.

## Accessibilità e performance

- Stili responsive: 1 colonna su mobile, 2 su tablet, 3 su desktop.
- Navigazione con tastiera, focus visibile, skip link, contrasti elevati.
- Dialoghi HTML nativi, campi con label, aggiornamento del carrello accessibile.
- Rispetto della preferenza di movimento ridotto.
- SVG vettoriali senza dipendenze da immagini esterne.
- I Google Fonts possono richiedere accesso a Internet; sono previsti font di sistema alternativi.

## Novità della versione tutto l'anno

- Il sito mantiene un’identità stabile tutto l'anno: avorio, blu notte, terracotta e oro.
- Il cappellino segnaposto è l'unico prodotto presentato come **collezione Natale** con scelta colori rossa/verde.
- La vetrina principale mostra il mini quadretto con frase napoletana.
- Il carrello rimane locale al browser: non crea pagamenti né ordini in automatico. Il cliente deve **inviare davvero il messaggio** su WhatsApp; finché non lo fa, al venditore non arriva niente.
- I prezzi sono indicativi e sono da verificare prima di pubblicare il sito.
