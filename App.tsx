import {
  Store,
  Users,
  ShieldCheck,
  Package,
  CreditCard,
  Truck,
  LayoutDashboard,
  CheckCircle2,
  Ban,
  ArrowRight,
  MapPin,
  ShoppingCart,
} from 'lucide-react';

const coreFeatures = [
  {
    icon: Store,
    title: 'Onboarding vendeurs',
    text: 'Inscription, creation de profil et verification artisan pour etablir la confiance.',
  },
  {
    icon: Package,
    title: 'Gestion produits',
    text: 'Ajout, edition, images, prix, stock et categories dans un flux simple.',
  },
  {
    icon: ShoppingCart,
    title: 'Experience client',
    text: 'Parcours d achat structure: navigation, recherche, panier et checkout.',
  },
  {
    icon: CreditCard,
    title: 'Paiements',
    text: 'Initiation, confirmation et suivi du statut de paiement de bout en bout.',
  },
  {
    icon: Truck,
    title: 'Suivi livraison',
    text: 'Mises a jour d expedition et confirmation de livraison pour chaque commande.',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard artisan',
    text: 'Vue revenus, stock, commandes actives et historiques pour piloter l activite.',
  },
];

const invariants = [
  'Une commande appartient a un client valide.',
  'Une commande contient au moins un produit valide.',
  'Un produit appartient a un seul vendeur.',
  'Le stock ne peut jamais passer sous zero.',
  'Le montant paye doit egaler le total de commande.',
];

const refusals = [
  'Refus des commandes sur stock indisponible.',
  'Refus de modification apres paiement confirme (hors workflow autorise).',
  'Refus d acces aux routes protegees sans authentification.',
  'Refus de suppression de produit lie a une commande active.',
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7ED] via-[#FFFBF5] to-[#F4EBD8] text-stone-800">
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C2410C] text-white shadow-md">S</div>
            <div>
              <p className="font-display text-xl font-bold leading-none">SahelArt</p>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Marketplace Artisan</p>
            </div>
          </div>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full bg-[#EA580C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#C2410C]"
          >
            Rejoindre le lancement <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-14 md:pt-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-300/30 blur-3xl" />
          <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center">
            <div className="animate-fade-in-up">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">
                <MapPin size={14} /> Burkina Faso & Sahel
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-stone-900 md:text-6xl">
                La plateforme qui structure le commerce artisanal du Sahel.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-700">
                SahelArt connecte artisans, clients et administration dans un parcours fiable: produits, commandes, paiements et livraisons, avec transparence a chaque etape.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#features" className="rounded-full bg-[#EA580C] px-6 py-3 font-semibold text-white transition hover:bg-[#C2410C]">Voir le scope</a>
                <a href="#contract" className="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-700 transition hover:bg-white">Lire le contrat produit</a>
              </div>
            </div>

            <div className="grid gap-4 animate-fade-in">
              <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-stone-500">Probleme</p>
                <p className="mt-3 text-stone-700">Absence de place de marche digitale centralisee, tracable et de confiance pour les artisans locaux.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                  <Users className="text-[#EA580C]" />
                  <p className="mt-3 text-sm font-semibold">Artisans</p>
                  <p className="mt-1 text-sm text-stone-600">Visibilite, ventes, stock, revenus.</p>
                </div>
                <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                  <ShieldCheck className="text-[#EA580C]" />
                  <p className="mt-3 text-sm font-semibold">Clients</p>
                  <p className="mt-1 text-sm text-stone-600">Achats fiables et suivi de commande.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 py-14">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="font-display text-3xl font-bold text-stone-900 md:text-4xl">Scope Phase 1</h2>
            <p className="mt-3 max-w-2xl text-stone-600">Fonctionnalites coeur du PRD pour digitaliser le commerce artisanal de facon progressive et robuste.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {coreFeatures.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <Icon className="text-[#C2410C]" />
                  <h3 className="mt-4 text-lg font-semibold text-stone-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contract" className="px-4 py-14">
          <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="font-display text-2xl font-bold text-emerald-900">Garanties systeme</h3>
              <ul className="mt-4 space-y-3">
                {invariants.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-emerald-900">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
              <h3 className="font-display text-2xl font-bold text-rose-900">Refus explicites</h3>
              <ul className="mt-4 space-y-3">
                {refusals.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-rose-900">
                    <Ban size={18} className="mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-14">
          <div className="mx-auto w-full max-w-6xl rounded-3xl bg-[#2B120A] p-8 text-white md:p-10">
            <h2 className="font-display text-3xl font-bold">Objectifs de traction - Phase 1</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm text-orange-100">vendeurs verifies</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-orange-100">produits publies</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-3xl font-bold">200+</p>
                <p className="text-sm text-orange-100">commandes completees</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-3xl font-bold">&lt; 2%</p>
                <p className="text-sm text-orange-100">transactions echouees</p>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="px-4 pb-20 pt-6">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-orange-200 bg-white p-8 text-center shadow-sm md:p-10">
            <h2 className="font-display text-3xl font-bold text-stone-900">Construisons le nouveau standard du commerce artisanal</h2>
            <p className="mx-auto mt-3 max-w-2xl text-stone-600">
              Artisans, clients et partenaires operationnels: rejoignez SahelArt pour un marche digital transparent, scalable et ancre dans la realite du terrain.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-full bg-[#EA580C] px-6 py-3 font-semibold text-white transition hover:bg-[#C2410C]">Je suis artisan</button>
              <button className="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-50">Je suis client</button>
              <button className="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-50">Je suis admin</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-orange-100 bg-white px-4 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
          <p>SahelArt - Digitiser, structurer et valoriser l artisanat du Sahel.</p>
          <p>Produit inspire du PRD SahelArt.</p>
        </div>
      </footer>
    </div>
  );
}

