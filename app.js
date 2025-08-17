// =======================================================
// SOUBOR: app.js (S NOVÝMI TEXTY U PRODUKTŮ)
// =======================================================

const express = require('express');
const path = require('path');
const multer = require('multer');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' });

app.use(session({
    secret: 'mujSuperTajnyKlicProSession',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.cart = req.session.cart || { items: [], totalItems: 0 };
    next();
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

// --- DATA PRO APLIKACI (S NOVÝMI TEXTY) ---
const productCategories = [
    {
        id: "portret-pro-dva",
        title: "Portrét pro dva (tvar srdce)",
        description: "Obraz, který vypráví váš příběh lásky. Nejprodávanější volba pro páry a výročí.",
        imageUrl: "/images/Snímek obrazovky 2025-08-14 185347.png",
        isBestseller: true,
        price: 3000
    },
    {
        id: "portret-jednotlivce",
        title: "Portrét jednotlivce",
        // !!! ZMĚNA ZDE !!!
        description: "Portrét nebo libovolný motiv – partner, dítě, mazlíček, oblíbený herec či symbol. Dárek, který nikdy nevybledne.",
        imageUrl: "/images/Snímek obrazovky 2025-08-14 185250.png",
        isBestseller: false,
        price: 3000
    },
    {
        id: "svatebni-dar",
        title: "Svatební & Výroční dar",
        description: "Jedinečná připomínka vašeho velkého dne. Ideální svatební nebo výroční dar.",
        imageUrl: "/images/Snímek obrazovky 2025-08-14 184322.png",
        isBestseller: false,
        price: 3000
    }
];

const galleryImages = [
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

app.get('/produkt/:id', (req, res) => {
    const productId = req.params.id;
    const product = productCategories.find(p => p.id === productId);
    if (product) {
        res.render('detail', { pageTitle: product.title, product: product });
    } else {
        res.redirect('/');
    }
});

app.post('/pridat-do-kosiku', (req, res) => {
    const { productId, size, threads } = req.body;
    const product = productCategories.find(p => p.id === productId);
    if (product) {
        if (!req.session.cart) {
            req.session.cart = { items: [], totalItems: 0 };
        }
        const cartItem = { id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl, size: size, threads: threads };
        req.session.cart.items.push(cartItem);
        req.session.cart.totalItems++;
    }
    res.redirect('/kosik');
});

app.get('/kosik', (req, res) => {
    res.render('cart', { pageTitle: 'Váš nákupní košík' });
});

// --- SPUŠTĚNÍ SERVERU ---
app.listen(PORT, () => {
    console.log(`Server úspěšně běží na adrese http://localhost:${PORT}`);
});