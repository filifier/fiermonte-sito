# Fiermonte Boxing & Fitness — Sito

Sito statico (HTML/CSS/JavaScript, senza framework) per Fiermonte Boxing & Fitness,
boutique boxing ai Parioli, Roma.

## Struttura
```
index.html          Home (tutte le sezioni)
css/style.css       Stile, temi chiaro/scuro, responsive
js/i18n.js          Tutti i testi (IT/EN) e le discipline
js/main.js          Logica: tema, lingua, carosello hero, menu, form
media/logo/         Loghi
media/foto/         Foto (hero + sezioni) — vedi METTI_QUI_LE_FOTO.txt
media/video/        Video opzionale — vedi METTI_QUI_IL_VIDEO.txt
```

## Vedere il sito in locale
Da questa cartella:
```
python3 -m http.server 8000
```
poi apri http://localhost:8000

(Serve un piccolo server locale: aprire il file direttamente non fa funzionare
carosello, cambio lingua e cambio tema per via dei percorsi relativi.)

## Funzioni
- Tema chiaro / scuro (con memoria della scelta)
- Lingua Italiano / Inglese (con memoria della scelta)
- Carosello foto nell'hero
- Menu mobile
- Form di contatto (NON invia ancora: da collegare)

## Da collegare in seguito
Il form contatti valida i campi ma non invia. Il punto dove aggiungere
l'invio reale è segnato in `js/main.js`.
