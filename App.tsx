import React, { useState } from 'react';
import { ViewState, CartItem, Product } from './types';
import { MOCK_USER } from './constants';
import { Home, Catalog, ProductDetail } from './pages/ShopPages';
import { Cart, Checkout, UserProfile } from './pages/UserPages';
import { ArtisanDashboard, ArtisanProfile } from './pages/ArtisanPages';
import { ShoppingBag, User as UserIcon, Menu, X, LayoutDashboard } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [currentProductId, setCurrentProductId] = useState<string | undefined>();
  const [currentArtisanId, setCurrentArtisanId] = useState<string | undefined>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Navigation Handler ---
  const navigate = (newView: ViewState, id?: string) => {
    setView(newView);
    if (newView === 'PRODUCT_DETAIL' && id) setCurrentProductId(id);
    if (newView === 'ARTISAN_PROFILE' && id) setCurrentArtisanId(id);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- Cart Handlers ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} ajouté au panier !`);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    navigate('HOME');
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('HOME')}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">A</div>
            <span className="text-2xl font-serif font-bold text-stone-800 tracking-tight">AfriCraft</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-stone-600">
            <button onClick={() => navigate('HOME')} className="hover:text-primary transition-colors">Accueil</button>
            <button onClick={() => navigate('CATALOG')} className="hover:text-primary transition-colors">Boutique</button>
            <button onClick={() => navigate('ARTISAN_DASHBOARD')} className="hover:text-primary transition-colors flex items-center gap-1"><LayoutDashboard size={16}/> Espace Artisan</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-stone-100 rounded-full transition-colors" onClick={() => navigate('CART')}>
              <ShoppingBag className="text-stone-700" size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-terracotta text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-stone-100 rounded-full transition-colors hidden md:block" onClick={() => navigate('PROFILE')}>
              <img src={MOCK_USER.avatarUrl} className="w-8 h-8 rounded-full border border-stone-300" alt="Profile" />
            </button>
            <button className="md:hidden p-2 text-stone-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28}/> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200 p-4 space-y-4 shadow-lg animate-fade-in-down">
            <button onClick={() => navigate('HOME')} className="block w-full text-left py-2 font-bold text-stone-700">Accueil</button>
            <button onClick={() => navigate('CATALOG')} className="block w-full text-left py-2 font-bold text-stone-700">Boutique</button>
            <button onClick={() => navigate('PROFILE')} className="block w-full text-left py-2 font-bold text-stone-700">Mon Compte</button>
            <button onClick={() => navigate('ARTISAN_DASHBOARD')} className="block w-full text-left py-2 font-bold text-primary">Espace Artisan</button>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-grow animate-fade-in">
        {view === 'HOME' && <Home onNavigate={navigate} onAddToCart={addToCart} />}
        {view === 'CATALOG' && <Catalog onNavigate={navigate} onAddToCart={addToCart} />}
        {view === 'PRODUCT_DETAIL' && currentProductId && (
          <ProductDetail productId={currentProductId} onNavigate={navigate} onAddToCart={addToCart} />
        )}
        {view === 'ARTISAN_PROFILE' && currentArtisanId && (
          <ArtisanProfile artisanId={currentArtisanId} />
        )}
        {view === 'CART' && (
          <Cart items={cart} onUpdateQty={updateCartQty} onRemove={removeFromCart} onCheckout={() => navigate('CHECKOUT')} />
        )}
        {view === 'CHECKOUT' && <Checkout onConfirm={clearCart} />}
        {view === 'PROFILE' && <UserProfile />}
        {view === 'ARTISAN_DASHBOARD' && <ArtisanDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-stone-300 py-12 mt-auto">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-dark font-serif font-bold">A</div>
               <span className="text-xl font-serif font-bold text-white">AfriCraft</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Valoriser l'excellence de l'artisanat africain et connecter les créateurs au monde entier.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Boutique</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Nouveautés</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Populaires</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Artisans</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Aide</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Livraison</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Retours</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Newsletter</h4>
            <div className="flex">
              <input type="email" placeholder="Email" className="bg-stone-800 border-none rounded-l-md px-4 py-2 w-full text-white focus:ring-1 focus:ring-accent" />
              <button className="bg-accent text-dark font-bold px-4 py-2 rounded-r-md hover:bg-white transition-colors">OK</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-xs opacity-50">
          &copy; 2024 AfriCraft. Fait avec passion.
        </div>
      </footer>
    </div>
  );
}