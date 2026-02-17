import { useEffect, useState } from 'react';

type Product = {
  name: string;
  artisan: string;
  price: string;
  image: string;
  alt: string;
};

const categories: { title: string; subtitle: string; items: Product[] }[] = [
  {
    title: 'Sacs',
    subtitle: 'Articles tisses et bogolan',
    items: [
      { name: 'Sac Bogolan', artisan: 'Fatoumata Diallo', price: '26 000 CFA', image: '/assets/bag1.jpg', alt: 'Sac Bogolan' },
      { name: 'Panier Tisse', artisan: 'Amina Traore', price: '15 500 CFA', image: '/assets/bag6.jpg', alt: 'Panier Tisse' },
      { name: 'Sac Tresse Indigo', artisan: 'Kadidia Konate', price: '19 000 CFA', image: '/assets/bag2.jpg', alt: 'Sac Tresse Indigo' },
      { name: 'Cabas Sahel', artisan: 'Hawa Barry', price: '17 500 CFA', image: '/assets/bag3.jpg', alt: 'Cabas Sahel' },
    ],
  },
  {
    title: 'Poterie',
    subtitle: 'Pieces decoratives et utilitaires',
    items: [
      { name: 'Vase Terracotta', artisan: 'Oumar Kone', price: '12 000 CFA', image: '/assets/pot1.jpg', alt: 'Vase Terracotta' },
      { name: 'Poterie Deco', artisan: "Koffi M.'Ba", price: '11 000 CFA', image: '/assets/pot8.jpg', alt: 'Poterie Deco' },
      { name: 'Jarre Tradition', artisan: 'Yacouba Tapsoba', price: '13 500 CFA', image: '/assets/pot2.jpg', alt: 'Jarre Tradition' },
      { name: 'Bol Ceramique', artisan: 'Aissata Bationo', price: '9 500 CFA', image: '/assets/pot4.jpg', alt: 'Bol Ceramique' },
    ],
  },
  {
    title: 'Masques',
    subtitle: 'Sculptures rituelles et murales',
    items: [
      { name: 'Masque Dogon', artisan: 'Boubacar Sanogo', price: '18 500 CFA', image: '/assets/mask1.jpg', alt: 'Masque Dogon' },
      { name: 'Masque Sculpte', artisan: 'Issa Ouattara', price: '20 000 CFA', image: '/assets/mask7.jpg', alt: 'Masque Sculpte' },
      { name: 'Masque Rituel', artisan: 'Moussa Dembele', price: '21 000 CFA', image: '/assets/mask2.jpg', alt: 'Masque Rituel' },
      { name: 'Masque Mural', artisan: 'Salif Keita', price: '16 500 CFA', image: '/assets/mask3.jpg', alt: 'Masque Mural' },
    ],
  },
  {
    title: 'Chaussures',
    subtitle: 'Cuir et finitions traditionnelles',
    items: [
      { name: 'Sandales Cuir', artisan: 'Mariam Coulibaly', price: '14 000 CFA', image: '/assets/shoe2.jpg', alt: 'Sandales Cuir' },
      { name: 'Babouches Sahel', artisan: 'Abdoulaye Cisse', price: '16 000 CFA', image: '/assets/shoe11.jpg', alt: 'Babouches Sahel' },
      { name: 'Sandales Nomades', artisan: 'Rokia Toure', price: '13 000 CFA', image: '/assets/shoe3.jpg', alt: 'Sandales Nomades' },
      { name: 'Mocassins Artisanaux', artisan: 'Idrissa Ouedraogo', price: '22 000 CFA', image: '/assets/shoe4.jpg', alt: 'Mocassins Artisanaux' },
    ],
  },
];

function SunIcon({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="4" />
      <line x1="32" y1="3" x2="32" y2="13" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="32" y1="51" x2="32" y2="61" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="3" y1="32" x2="13" y2="32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="51" y1="32" x2="61" y2="32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="11.5" y1="11.5" x2="18.6" y2="18.6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="45.4" y1="45.4" x2="52.5" y2="52.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="11.5" y1="52.5" x2="18.6" y2="45.4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="45.4" y1="18.6" x2="52.5" y2="11.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="20.4" y1="4.8" x2="24.3" y2="14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="39.7" y1="50" x2="43.6" y2="59.2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="4.8" y1="43.6" x2="14" y2="39.7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="24.3" x2="59.2" y2="20.4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="4.8" y1="20.4" x2="14" y2="24.3" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="39.7" x2="59.2" y2="43.6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="20.4" y1="59.2" x2="24.3" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="39.7" y1="14" x2="43.6" y2="4.8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen text-gray-800 bg-[radial-gradient(circle_at_8%_2%,#ffd5a8_0%,rgba(255,213,168,0)_30%),radial-gradient(circle_at_92%_6%,#ffe7c8_0%,rgba(255,231,200,0)_34%),linear-gradient(180deg,#fff5e8_0%,#fffaf3_48%,#f5ebdc_100%)]">
      <style>{`
        .site-header { transition: background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease; }
        .site-header.is-scrolled { background-color: rgba(255,255,255,.18) !important; border-color: rgba(251,146,60,.28) !important; box-shadow:none; backdrop-filter: blur(2px); }
        .product-card { border: 1px solid #f5cda6; transition: transform 160ms ease, box-shadow 160ms ease; }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 14px 28px rgba(153,66,13,.16); }
        .search-panel { position: relative; overflow: visible; min-height: 420px; }
        .search-panel-bg {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px;
          color: rgba(234,122,16,.35); pointer-events: none;
          animation: floatPanel 5.5s ease-in-out infinite;
          filter: drop-shadow(0 8px 16px rgba(234,122,16,.22));
        }
        .search-panel-title { font-size: clamp(78px, 9vw, 128px); font-weight: 800; line-height: 1; letter-spacing: -.02em; color: rgba(234,122,16,.3); }
        @keyframes floatPanel {
          0%,100% { transform: translate(-50%, -50%) translate3d(0,0,0); }
          25% { transform: translate(-50%, -50%) translate3d(16px,-10px,0); }
          50% { transform: translate(-50%, -50%) translate3d(26px,-18px,0); }
          75% { transform: translate(-50%, -50%) translate3d(12px,-8px,0); }
        }
      `}</style>

      <header className={`site-header sticky top-0 z-40 border-b border-orange-200 bg-white/95 backdrop-blur-md ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="mx-auto flex h-24 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <SunIcon className="h-12 w-12 text-[#EA7A10]" />
            <div>
              <p className="text-[34px] font-extrabold leading-none tracking-tight text-[#EA7A10]">SahelArt</p>
              <p className="text-sm font-medium leading-none text-stone-900">Authentic treasures from the Sahel</p>
            </div>
          </div>
          <a href="#cta" className="inline-flex items-center gap-2 rounded-full bg-[#EA580C] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-300/40">Commander</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-10 pt-10 md:pt-14">
          <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Burkina Faso & Sahel</p>
              <h1 className="font-display text-4xl font-black leading-tight text-stone-900 md:text-6xl">Un marketplace artisanal plus clair, plus visible, plus vendeur.</h1>
              <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-stone-700">Decouvre les creations locales, trouve rapidement un produit et passe commande en quelques secondes.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#EA7A10] px-4 py-2 text-sm font-semibold text-white">Livraison rapide</span>
                <span className="rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700">Paiement securise</span>
              </div>
            </div>

            <div className="search-panel">
              <div className="search-panel-bg" aria-hidden="true">
                <SunIcon className="h-52 w-52 text-[#EA7A10]" />
                <p className="search-panel-title">SahelArt</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-14">
          <div className="mx-auto w-full max-w-6xl space-y-8">
            <div className="mb-2">
              <h2 className="text-3xl font-extrabold text-stone-900">Liste des produits disponible par cathégories</h2>
            </div>

            {categories.map((category) => (
              <div key={category.title} className="rounded-3xl border border-[#fed7aa] bg-white/92 p-4 shadow-[0_10px_30px_rgba(194,81,11,0.08)] sm:p-6">
                <h3 className="text-xl font-extrabold text-stone-900">{category.title}</h3>
                <p className="text-sm text-stone-600">{category.subtitle}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {category.items.map((item) => (
                    <article key={item.name} className="product-card overflow-hidden rounded-3xl bg-white">
                      <img src={item.image} alt={item.alt} className="h-52 w-full object-cover" />
                      <div className="p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">Categorie: {category.title}</p>
                        <p className="mt-1 text-lg font-bold text-stone-900">{item.name}</p>
                        <p className="text-sm text-stone-600">Artisan: {item.artisan}</p>
                        <p className="mt-1 text-xl font-extrabold text-[#EA7A10]">{item.price}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-14">
          <div className="mx-auto w-full max-w-6xl rounded-3xl bg-[#2B120A] p-8 text-white shadow-xl shadow-black/20 md:p-10">
            <h2 className="font-display text-3xl font-bold">Objectifs de traction - Phase 1</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-bold">50+</p><p className="text-sm text-orange-100">vendeurs verifies</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-bold">500+</p><p className="text-sm text-orange-100">produits publies</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-bold">200+</p><p className="text-sm text-orange-100">commandes completees</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-bold">&lt; 2%</p><p className="text-sm text-orange-100">transactions echouees</p></div>
            </div>
          </div>
        </section>

        <section id="cta" className="px-4 pb-24 pt-6">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-orange-300 bg-white p-8 text-center shadow-xl shadow-orange-100 md:p-10">
            <h2 className="font-display text-3xl font-bold text-stone-900">Construisons le nouveau standard du commerce artisanal</h2>
            <a href="#" className="mt-6 inline-flex rounded-full bg-[#EA7A10] px-6 py-3 text-base font-bold text-white shadow-lg shadow-orange-300/40">Passer une commande</a>
          </div>
        </section>

        <footer className="border-t border-orange-200 bg-[#2B120A] px-4 py-12 text-orange-50">
          <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-4">
            <div>
              <p className="text-2xl font-extrabold text-orange-300">SahelArt</p>
              <p className="mt-3 text-sm leading-relaxed text-orange-100/90">Marketplace dedie aux creations artisanales du Sahel. Achetez local, authentique et trace.</p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Navigation</p>
              <ul className="mt-3 space-y-2 text-sm text-orange-100/90">
                <li><a href="#" className="hover:text-white">Accueil</a></li>
                <li><a href="#" className="hover:text-white">Catalogue</a></li>
                <li><a href="#" className="hover:text-white">Artisans</a></li>
                <li><a href="#" className="hover:text-white">Panier</a></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Categories</p>
              <ul className="mt-3 space-y-2 text-sm text-orange-100/90">
                <li>Sacs</li>
                <li>Poterie</li>
                <li>Masques</li>
                <li>Chaussures</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Contact</p>
              <ul className="mt-3 space-y-2 text-sm text-orange-100/90">
                <li>Ouagadougou, Burkina Faso</li>
                <li>+226 70 00 00 00</li>
                <li>contact@sahelart.africa</li>
              </ul>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Instagram</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Facebook</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">TikTok</span>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 w-full max-w-6xl border-t border-white/15 pt-5 text-xs text-orange-100/80">
            <p>© 2026 SahelArt. Tous droits reserves.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
