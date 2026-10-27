# Morakot Mart · មរកតម៉ាត

**ទិញងាយ ស្រួលចិត្ត គុណភាពទុកចិត្តបាន** · *Your Trusted Online Shop*

A demo e-commerce website built with **Angular 19 + TypeScript** for a university midterm project. It is frontend-only: no backend, no database, no external APIs. Products live in a TypeScript file; the cart and demo orders live in the browser's `localStorage`.

> This is a static single-page application, **not** Server-Side Rendered (SSR). If your instructor requires SSR, that is a different setup (`ng add @angular/ssr`) and should be discussed first.

## Features
- Home page: hero, category cards, featured products, full catalog, promo banner
- `/shop` catalog: search by name/model, category and brand filters, sort (price, name, brand), featured filter, "Load more" paging, clear filters, empty state
- Product detail (`/products/:id`): specifications, image gallery (when extra photos exist), quantity selector limited by stock, related products, not-found state
- Cart (`/cart`): add/increase/decrease/remove, clear with confirmation, live navbar count, persists after refresh, stock limits
- Checkout (`/checkout`): Reactive Forms with validation, Cash on Delivery or Demo Bank Transfer, **demo only**
- Order confirmation (`/order-success/:orderId`)
- HTML invoice (`/invoice/:orderId`): A4 print layout (`@media print`), **Print** button, **Download Invoice HTML** (standalone file)
- Accessible markup: labels, focus outlines, alt text, skip link, `aria-live` toasts

## Tech stack
Angular 19 (standalone components, signals), Angular Router, Reactive Forms, TypeScript, Bootstrap 5, Bootstrap Icons, Kantumruy Pro (Google Fonts), localStorage.

## Folder structure
```
src/app/
  core/services/   product, cart, order, toast services
  models/          product, cart-item, customer, order interfaces
  data/products.ts 120 products in 10 categories + categories
  shared/          components (navbar, footer, logo, product-card, category-card,
                   catalog, toast, quantity-selector, empty-state),
                   invoice-template.ts, utils.ts
  pages/           home, shop, product-detail, cart, checkout,
                   order-success, invoice, not-found
src/assets/images/ categories/ (illustrations), products/ (put real photos here), placeholder.svg
public/            favicon
scripts/           sync-images, fetch-images, validate-catalog, make-images, gh-404 (GitHub Pages fallback)
```

## Setup commands
```bash
# 1. How this project was created
npx @angular/cli@19 new morakot-mart --routing --style=css --ssr=false
cd morakot-mart
# 2. Dependencies
npm install bootstrap bootstrap-icons
# (angular.json "styles" lists bootstrap.min.css, bootstrap-icons.css, src/styles.css)

# If you received this folder already: just install
npm install
npm start            # dev server at http://localhost:4200
npm run build        # production build -> dist/morakot-mart/browser
```

## Product catalog (120 products, 10 categories)
Each category has 12 real commercial models (23 brands: Apple, Samsung, Google, Xiaomi, OnePlus, ASUS, Lenovo, HP, Dell, Acer, Sony, JBL, Logitech, Razer, Anker, Bose, Marshall, Keychron, Garmin and others). Data lives in one TypeScript file per category: `src/app/data/products/*.ts`, combined in `index.ts`. Check it any time with:
```bash
npm run validate:catalog   # counts per category, unique ids/slugs, numeric prices, photo coverage
```
Product fields: id, slug, name, brand, model, category, description, price, originalPrice (genuine demo discount only), image, additionalImages, stock, featured, specifications.

**Honest data notes**
- **Prices are sample/demo prices in USD.** They are not verified retail prices, and not Cambodian prices. The UI says so.
- **Specifications are deliberately short** (2 key facts per product, such as display size and chip). They were written from general product knowledge and were not machine-verified against manufacturer pages. Check them against the manufacturer's page before presenting them as fact.
- Model names are real products, but some very recent models may have variants or naming I could not re-check. Fix any mismatch in the data files.
- Stock numbers are made up for the demo.

## Product images: real photos vs. illustrations
Real manufacturer photos could **not** be bundled: they are copyrighted, and the build environment had no internet access to manufacturer sites, so no photo URL was verified. Instead of guessing URLs (which would break), the app works like this:
- If a photo exists in `src/assets/images/products/`, it is used (`object-fit: contain`, lazy-loaded).
- If not, the product shows its **category illustration** with a visible "Illustration · official photo pending" label. Nothing is hotlinked, so nothing can break.

**Add real photos (about 5 minutes per batch)**
1. Download images you are allowed to use, e.g. from each manufacturer's press/media page (apple.com/newsroom, news.samsung.com, store.google.com, sony.com, logitech.com, anker.com ...) and credit them in your report.
2. Save each as `src/assets/images/products/<slug>.webp` (or .jpg/.png). See `PRODUCT-SLUGS.md` for every file name (regenerate with `npm run list:slugs`). The slug is the product's `slug` in the data, e.g. `apple-iphone-17-pro-max.webp`, `samsung-galaxy-s25-ultra.jpg`. Extra gallery images: `apple-iphone-17-pro-max-2.webp`, `-3`, ...
3. Run `npm start` or `npm run build`. The image list is regenerated automatically (`npm run images:sync`).
4. `npm run validate:catalog` prints how many products still use an illustration.

Optional: put `{ "<slug>": "<direct image URL>" }` pairs in `scripts/image-sources.json` and run `npm run images:fetch` on a computer with internet to download them. URLs must point directly to an image file, and you are responsible for the licence.

## Data and storage
- **Products:** `src/app/data/products.ts` (id, name, slug, description, price, image, category, stock, featured).
- **localStorage keys:** `morakot_mart_cart` (product ids + quantities; prices and stock are re-read from the product file on load) and `morakot_mart_orders` (saved demo orders).
- Invalid or corrupted storage is ignored safely. No passwords or card data are stored.
- localStorage is per browser and per origin. Orders from one browser or device will not appear on another, and clearing site data deletes them.
- Delivery fee: flat **$2.00**, free when the subtotal is **$100 or more** (`cart.service.ts`).

## Invoice
- **Angular invoice route** (`/invoice/:orderId`): lives inside the app, needs the app running and the order in this browser's localStorage.
- **Downloaded HTML file** (`INV-….html`): a self-contained document with the order data and CSS embedded. It opens in any browser without the app. It is generated from the same template (`shared/invoice-template.ts`), so both look identical. Only the Khmer web font is loaded online; offline it falls back to a system font.
- Printing hides the navbar, footer and buttons and uses A4 page size.

## GitHub (public repository)
```bash
git init
git add .
git commit -m "Morakot Mart: Angular e-commerce midterm project"
git branch -M main
# create an empty PUBLIC repository on github.com first, then:
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploy to GitHub Pages
Project sites are served from `https://<user>.github.io/<repo>/`, so Angular needs a matching **base href**; otherwise scripts and images 404.
```bash
npx ng build --base-href "/<your-repo>/" && node scripts/gh-404.mjs
# or: npm run build:gh   (edit REPO_NAME in package.json first)
npx angular-cli-ghpages --dir=dist/morakot-mart/browser
```
Then in the repository: **Settings → Pages → Deploy from branch → `gh-pages` / root**.

**Routing on GitHub Pages:** it has no SPA fallback, so opening `/cart` directly would 404. `scripts/gh-404.mjs` copies `index.html` to `404.html`, which makes Pages serve the app for unknown paths so Angular Router takes over. (Netlify/Vercel: build with the default base href `/` and add a rewrite of all paths to `/index.html`; Netlify uses a `_redirects` file containing `/* /index.html 200`.)

Only add the live URL to your report after the deployment actually works.

## Known limitations
- Demo only: no real payments, no server, no emails.
- Orders and carts are stored per browser (see above); stock is not reduced after an order.
- Product photos are not bundled (see above); illustrations are shown until you add them.
- Not SSR.

## Testing checklist
- [ ] Home loads; 10 category cards show correct counts (12 each); catalog shows 12 products + Load more
- [ ] Search, category filter, brand filter, sorting, featured filter and "Clear all filters" work; empty results state shows
- [ ] Product details open; invalid id (`/products/999`) shows not-found state
- [ ] Add to Cart works; adding the same product again increases its quantity
- [ ] Quantity cannot go below 1 or above stock (product page and cart)
- [ ] Remove, clear (with confirmation) work; cart persists after refresh; navbar count updates instantly
- [ ] `/checkout` with an empty cart shows an empty state
- [ ] Checkout validation: empty form, bad email, bad phone, short address
- [ ] Place order: order number generated, saved in `morakot_mart_orders`, cart cleared, success page shows
- [ ] Invoice shows the correct order; unknown id shows "Invoice not found"
- [ ] Print Invoice: only the invoice prints on A4
- [ ] Download Invoice HTML opens correctly from the file system
- [ ] Mobile layout (menu toggle, grids, cart rows) works
- [ ] `npm run build` succeeds; deployed direct links (e.g. `/cart`) work
