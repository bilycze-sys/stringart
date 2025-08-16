// ===================================================================
// SOUBOR: app.js (KOMPLETNÍ KÓD - AKTUALIZACE BEZ PŘEJMENOVÁVÁNÍ)
// ===================================================================

const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;

const upload = multer({ dest: 'uploads/' });

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

// --- DATA PRO APLIKACI ---

// Data pro produktové kategorie (s vašimi novými změnami a existujícími názvy souborů)
const productCategories = [
    {
        title: "Portrét pro dva (kruhový rám)",
        description: "Nechte zvěčnit váš vztah. Nejoblíbenější volba pro páry.",
        // POUŽÍVÁME OBRÁZEK SILUETY V SRDCI, DOKUD NEDODÁTE FINÁLNÍ
        imageUrl: "/images/1.png",
        isBestseller: true,
        price: 3000
    },
    {
        title: "Portrét jednotlivce", // Změněn název
        description: "Zvěčněte kohokoliv, na kom vám záleží – partnera, dítě, nebo i domácího mazlíčka.", // Změněn text
        imageUrl: "/images/Snímek obrazovky 2025-08-14 185250.png", // Změněno na obrázek jednotlivce
        isBestseller: false,
        price: 3000
    },
    {
        title: "Svatební & Výroční dar", // Změněn název
        description: "Ideální jako svatební dar nebo elegantní připomínka vašeho velkého dne.",
        imageUrl: "/images/Snímek obrazovky 2025-08-14 184322.png", // Změněno na obrázek páru na stojanu
        isBestseller: false,
        price: 3000
    }
];

// Data pro galerii
const galleryImages = [
    // Zde jsou vaše obrázky z galerie...
    { src: "/images/Snímek obrazovky 2025-08-14 184200.png", alt: "String art s motivem dolaru" },
    { src: "/images/Snímek obrazovky 2025-08-14 184304.png", alt: "String art portrét páru zblízka" },
    { src: "/images/Snímek obrazovky 2025-08-14 184322.png", alt: "String art portrét páru na stojanu" },
    { src: "/images/Snímek obrazovky 2025-08-14 185152.png", alt: "String art portrét muže" },
    { src: "/images/Snímek obrazovky 2025-08-14 185210.png", alt: "String art usmívající se ženy" },
    { src: "/images/Snímek obrazovky 2025-08-14 185228.png", alt: "String art portrét ženy" },
    { src: "/images/Snímek obrazovky 2025-08-14 185250.png", alt: "String art ženy z profilu" },
    { src: "/images/Snímek obrazovky 2025-08-14 185314.png", alt: "Čtvercový string art portrét páru s věnováním" },
    { src: "/images/Snímek obrazovky 2025-08-14 185347.png", alt: "String art silueta páru v srdci" },
    { src: "/images/Snímek obrazovky 2025-08-14 185434.png", alt: "Detailní pohled na string art portrét" },
];

// --- ROUTES ---
app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Váš příběh v umělecké podobě',
        gallery: galleryImages,
        productCategories: productCategories
    });
});

app.post('/objednat', upload.single('photo'), (req, res) => {
    const customerData = req.body;
    const uploadedFile = req.file;
    console.log("Nová objednávka přijata!", { customerData, uploadedFile });
    res.send('<h1>Děkujeme za vaši objednávku!</h1><p>Brzy se vám ozveme s návrhem.</p><a href="/">Zpět na hlavní stránku</a>');
});

// --- SPUŠTĚNÍ SERVERU ---
app.listen(PORT, () => {
    console.log(`Server úspěšně běží na adrese http://localhost:${PORT}`);
});