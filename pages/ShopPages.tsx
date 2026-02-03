import React, { useState } from 'react';
import { Product, Category, Artisan } from '../types';
import { MOCK_PRODUCTS, MOCK_ARTISANS } from '../constants';
import { ProductCard, SectionTitle, Button } from '../components/UI';
import { Search, Filter, ArrowRight, Share2, ShieldCheck, Truck } from 'lucide-react';

// --- HOME PAGE ---
export const Home: React.FC<{ 
  onNavigate: (view: any, id?: string) => void; 
  onAddToCart: (p: Product) => void 
}> = ({ onNavigate, onAddToCart }) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/africanart/1920/1080" 
            alt="Artisanat Africain" 
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <span className="block text-accent font-semibold tracking-widest uppercase mb-4 animate-fade-in-up">Authenticité & Tradition</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-in-up delay-100">
            Soutenez les mains qui façonnent l'histoire
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Découvrez une sélection unique de créations artisanales locales. Chaque objet a une âme, chaque achat a un impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Button size="lg" onClick={() => onNavigate('CATALOG')}>
              Explorer la collection
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-stone-900">
              Découvrir les artisans
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <SectionTitle title="Nos Catégories" subtitle="Savoir-faire diversifiés" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.values(Category).map((cat) => (
            <div 
              key={cat}
              onClick={() => onNavigate('CATALOG')}
              className="group cursor-pointer flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-white border border-stone-100 hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-2xl group-hover:bg-accent group-hover:text-white transition-colors">
                {cat === 'Textile' && '🧵'}
                {cat === 'Bijoux' && '💍'}
                {cat === 'Décoration' && '🏺'}
                {cat === 'Alimentation' && '🍯'}
                {cat === 'Art' && '🗿'}
              </div>
              <span className="font-serif font-bold text-stone-700">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <SectionTitle title="Populaire" />
          <Button variant="ghost" onClick={() => onNavigate('CATALOG')}>Voir tout <ArrowRight size={16} className="ml-2"/></Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.filter(p => p.isPopular).slice(0, 4).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={(id) => onNavigate('PRODUCT_DETAIL', id)}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Features/Values */}
      <section className="bg-stone-900 text-stone-100 py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <div className="mx-auto w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-stone-900">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Qualité Garantie</h3>
            <p className="text-stone-400">Chaque produit est vérifié et certifié authentique.</p>
          </div>
          <div className="p-4">
            <div className="mx-auto w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-stone-900">
              <Share2 size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Commerce Équitable</h3>
            <p className="text-stone-400">Les artisans fixent leurs prix et reçoivent 90% des revenus.</p>
          </div>
          <div className="p-4">
            <div className="mx-auto w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-stone-900">
              <Truck size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Livraison Rapide</h3>
            <p className="text-stone-400">Expédition locale et internationale sécurisée.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- CATALOG PAGE ---
export const Catalog: React.FC<{ 
  onNavigate: (view: any, id?: string) => void;
  onAddToCart: (p: Product) => void 
}> = ({ onNavigate, onAddToCart }) => {
  const [filterCategory, setFilterCategory] = useState<string>('Tout');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    filterCategory === 'Tout' ? true : p.category === filterCategory
  ).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return 0; // Default or newest
  });

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold text-stone-800">Catalogue</h1>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="pl-10 pr-4 py-2 border border-stone-200 rounded-full focus:outline-none focus:border-primary w-full md:w-64"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter size={18} className="text-stone-500" />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              <option value="Tout">Toutes catégories</option>
              {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option value="newest">Plus récents</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={(id) => onNavigate('PRODUCT_DETAIL', id)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stone-500 text-lg">Aucun produit ne correspond à vos critères.</p>
          <Button variant="ghost" className="mt-4" onClick={() => setFilterCategory('Tout')}>Réinitialiser</Button>
        </div>
      )}
    </div>
  );
};

// --- PRODUCT DETAIL PAGE ---
export const ProductDetail: React.FC<{ 
  productId: string; 
  onNavigate: (view: any, id?: string) => void;
  onAddToCart: (p: Product) => void 
}> = ({ productId, onNavigate, onAddToCart }) => {
  const product = MOCK_PRODUCTS.find(p => p.id === productId);
  const artisan = MOCK_ARTISANS.find(a => a.id === product?.artisanId);
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  if (!product) return <div>Produit non trouvé</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" onClick={() => onNavigate('CATALOG')} className="mb-6">
        ← Retour au catalogue
      </Button>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`${product.name} ${idx}`}
                className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-olive/10 text-olive text-xs font-bold px-2 py-1 rounded-full uppercase">{product.category}</span>
            <div className="flex items-center text-amber-500 text-sm">
              {'★'.repeat(Math.round(product.rating))}
              <span className="text-stone-400 ml-1">({product.reviewsCount} avis)</span>
            </div>
          </div>

          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">{product.name}</h1>
          <div className="text-3xl font-bold text-primary mb-6">{product.price.toLocaleString()} FCFA</div>

          <p className="text-stone-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 mb-8">
            <h3 className="font-serif font-bold text-stone-800 mb-3">Détails de fabrication</h3>
            <ul className="list-disc list-inside text-stone-600 space-y-1">
              {product.materials.map(m => <li key={m}>{m}</li>)}
            </ul>
          </div>

          <div className="flex gap-4 mb-8">
            <Button size="lg" className="flex-1" onClick={() => onAddToCart(product)}>
              Ajouter au panier
            </Button>
            <Button size="lg" variant="outline" className="px-4">
              <Share2 size={20} />
            </Button>
          </div>

          {/* Artisan Mini Profile */}
          {artisan && (
            <div className="mt-auto pt-8 border-t border-stone-200">
              <div 
                className="flex items-center gap-4 cursor-pointer hover:bg-stone-50 p-4 rounded-xl transition-colors"
                onClick={() => onNavigate('ARTISAN_PROFILE', artisan.id)}
              >
                <img src={artisan.photoUrl} alt={artisan.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="text-sm text-stone-500">Créé par</p>
                  <h4 className="font-serif font-bold text-lg text-stone-800">{artisan.name}</h4>
                  <p className="text-xs text-stone-500 flex items-center"><span className="mr-1">📍</span> {artisan.location}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto text-primary">Voir le profil</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};