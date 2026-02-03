import React, { useState } from 'react';
import { CartItem, User } from '../types';
import { MOCK_USER } from '../constants';
import { Button, SectionTitle } from '../components/UI';
import { Trash2, CreditCard, CheckCircle, MapPin } from 'lucide-react';

// --- CART ---
export const Cart: React.FC<{ 
  items: CartItem[]; 
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}> = ({ items, onUpdateQty, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif text-stone-600 mb-4">Votre panier est vide</h2>
        <Button onClick={() => window.location.reload()}>Retourner à la boutique</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="Mon Panier" />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex items-center gap-4">
              <img src={item.images[0]} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-stone-800 font-serif">{item.name}</h3>
                <p className="text-stone-500 text-sm mb-2">{item.artisanName}</p>
                <p className="font-bold text-primary">{item.price} FCFA</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center"
                    onClick={() => onUpdateQty(item.id, -1)}
                >-</button>
                <span className="font-medium">{item.quantity}</span>
                <button 
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center"
                    onClick={() => onUpdateQty(item.id, 1)}
                >+</button>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600 p-2">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Récapitulatif</h3>
            <div className="flex justify-between mb-2 text-stone-600">
              <span>Sous-total</span>
              <span>{total.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between mb-4 text-stone-600">
              <span>Livraison (estimée)</span>
              <span>2,000 FCFA</span>
            </div>
            <div className="border-t border-stone-200 my-4 pt-4 flex justify-between font-bold text-xl text-stone-800">
              <span>Total</span>
              <span>{(total + 2000).toLocaleString()} FCFA</span>
            </div>
            
            <div className="mb-4">
                <input type="text" placeholder="Code Promo" className="w-full border p-2 rounded mb-2" />
                <Button variant="ghost" size="sm" className="w-full">Appliquer</Button>
            </div>

            <Button size="lg" className="w-full" onClick={onCheckout}>
              Commander
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CHECKOUT ---
export const Checkout: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirm

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <SectionTitle title="Paiement" />
      
      {/* Progress */}
      <div className="flex items-center justify-center mb-8 text-sm font-bold text-stone-400">
        <span className={step >= 1 ? "text-primary" : ""}>1. Livraison</span>
        <span className="mx-4">——</span>
        <span className={step >= 2 ? "text-primary" : ""}>2. Paiement</span>
        <span className="mx-4">——</span>
        <span className={step >= 3 ? "text-primary" : ""}>3. Confirmation</span>
      </div>

      {step === 1 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 animate-fade-in-up">
          <h3 className="text-xl font-bold mb-6 flex items-center"><MapPin className="mr-2" /> Adresse de livraison</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input className="border p-3 rounded" placeholder="Prénom" defaultValue="Saly" />
            <input className="border p-3 rounded" placeholder="Nom" defaultValue="Diop" />
            <input className="border p-3 rounded md:col-span-2" placeholder="Adresse" />
            <input className="border p-3 rounded" placeholder="Ville" />
            <input className="border p-3 rounded" placeholder="Téléphone" />
          </div>
          <Button onClick={() => setStep(2)} className="w-full">Continuer vers le paiement</Button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 animate-fade-in-up">
          <h3 className="text-xl font-bold mb-6 flex items-center"><CreditCard className="mr-2" /> Moyen de paiement</h3>
          <div className="space-y-4 mb-8">
             <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
               <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-primary" />
               <div>
                 <span className="font-bold block">Mobile Money</span>
                 <span className="text-sm text-stone-500">Orange Money, Wave, MTN...</span>
               </div>
             </label>
             <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
               <input type="radio" name="payment" className="w-5 h-5 text-primary" />
               <div>
                 <span className="font-bold block">Carte Bancaire</span>
                 <span className="text-sm text-stone-500">Visa, Mastercard</span>
               </div>
             </label>
             <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
               <input type="radio" name="payment" className="w-5 h-5 text-primary" />
               <div>
                 <span className="font-bold block">Paiement à la livraison</span>
                 <span className="text-sm text-stone-500">Espèces uniquement</span>
               </div>
             </label>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => setStep(1)}>Retour</Button>
            <Button onClick={() => setStep(3)} className="flex-1">Payer et Commander</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white p-12 rounded-2xl shadow-lg border border-stone-100 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">Merci pour votre commande !</h2>
          <p className="text-stone-600 mb-8">
            Votre commande #SAHEL-9382 a bien été enregistrée. Vous recevrez un email de confirmation sous peu.
          </p>
          <Button onClick={onConfirm}>Retour à l'accueil</Button>
        </div>
      )}
    </div>
  );
};

// --- USER PROFILE ---
export const UserProfile: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
        <SectionTitle title="Mon Profil" />
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col md:flex-row gap-8 items-start">
            <div className="text-center">
                <img src={MOCK_USER.avatarUrl} alt={MOCK_USER.name} className="w-32 h-32 rounded-full mb-4 mx-auto" />
                <Button variant="outline" size="sm">Modifier la photo</Button>
            </div>
            <div className="flex-1 space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-stone-500 uppercase tracking-wide">Informations</h3>
                    <p className="text-2xl font-serif font-bold">{MOCK_USER.name}</p>
                    <p className="text-stone-600">{MOCK_USER.email}</p>
                </div>
                
                <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-stone-500 uppercase tracking-wide mb-4">Dernières Commandes</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-stone-50 p-4 rounded-lg">
                            <div>
                                <p className="font-bold">Commande #SAHEL-8821</p>
                                <p className="text-xs text-stone-500">12 Oct 2023</p>
                            </div>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Livré</span>
                        </div>
                         <div className="flex justify-between items-center bg-stone-50 p-4 rounded-lg">
                            <div>
                                <p className="font-bold">Commande #SAHEL-8100</p>
                                <p className="text-xs text-stone-500">28 Sept 2023</p>
                            </div>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Livré</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};