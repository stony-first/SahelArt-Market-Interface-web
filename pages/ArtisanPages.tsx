import React, { useState } from 'react';
import { Category } from '../types';
import { MOCK_ARTISANS, MOCK_PRODUCTS, SALES_DATA } from '../constants';
import { Button } from '../components/UI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { 
  Plus, Package, DollarSign, Users, Settings, Sparkles, 
  ShoppingBag, ChevronRight, UploadCloud, Instagram, Copy, Check,
  Search, Filter, MoreVertical, Edit2, Truck
} from 'lucide-react';
import { generateProductDescription, generateSocialPost } from '../services/geminiService';

// --- ARTISAN PROFILE (Public View) ---
export const ArtisanProfile: React.FC<{ artisanId: string }> = ({ artisanId }) => {
  const artisan = MOCK_ARTISANS.find(a => a.id === artisanId);
  const products = MOCK_PRODUCTS.filter(p => p.artisanId === artisanId);

  if (!artisan) return <div>Artisan non trouvé</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden mb-12">
        <div className="h-48 bg-primary/10 w-full relative">
            <div className="absolute -bottom-16 left-8 md:left-12">
                <img src={artisan.photoUrl} alt={artisan.name} className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover" />
            </div>
        </div>
        <div className="pt-20 px-8 md:px-12 pb-8">
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-2">{artisan.name}</h1>
            <p className="text-stone-500 mb-6 flex items-center gap-2">
                <span>📍 {artisan.location}</span>
                <span>•</span>
                <span className="text-olive font-medium">{artisan.specialty}</span>
            </p>
            <p className="text-lg text-stone-700 max-w-3xl leading-relaxed mb-6">
                {artisan.bio}
            </p>
            <div className="flex gap-4">
                <Button>Contacter l'artisan</Button>
                <Button variant="outline">Suivre</Button>
            </div>
        </div>
      </div>

      <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6 border-l-4 border-accent pl-4">
        Créations de {artisan.name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(p => (
           <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
             <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"/>
             </div>
             <h3 className="font-bold text-stone-800 line-clamp-1">{p.name}</h3>
             <p className="text-primary font-bold">{p.price.toLocaleString()} FCFA</p>
           </div>
        ))}
      </div>
    </div>
  );
};

// --- ARTISAN DASHBOARD (Private View) ---
export const ArtisanDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');
  
  // Product Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Category>(Category.ART);
  const [newProdMaterials, setNewProdMaterials] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  
  // UI States
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);
  const [copied, setCopied] = useState(false);

  // Orders State
  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'Saly Diop', date: '12 Oct 2023', total: 45000, status: 'Livré', items: 2 },
    { id: 'ORD-002', customer: 'Jean Koffi', date: '14 Oct 2023', total: 85000, status: 'En cours', items: 1 },
    { id: 'ORD-003', customer: 'Aminata Sow', date: '15 Oct 2023', total: 12500, status: 'En attente', items: 3 },
    { id: 'ORD-004', customer: 'Paul Smith', date: '16 Oct 2023', total: 120000, status: 'En cours', items: 1 },
  ]);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleGenerateAI = async () => {
    if (!newProdName || !newProdMaterials) {
      alert("Veuillez remplir le nom et les matériaux pour générer une description.");
      return;
    }
    setIsGeneratingDesc(true);
    const desc = await generateProductDescription(newProdName, newProdCategory, newProdMaterials);
    setNewProdDesc(desc);
    setIsGeneratingDesc(false);
  };

  const handleGeneratePost = async () => {
    if (!newProdDesc) return;
    setIsGeneratingPost(true);
    const post = await generateSocialPost(newProdName, newProdDesc);
    setGeneratedPost(post);
    setIsGeneratingPost(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 
        ${activeTab === id 
          ? 'bg-primary text-white shadow-md' 
          : 'text-stone-600 hover:bg-orange-100'}`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      {activeTab === id && <ChevronRight size={16} className="ml-auto opacity-50" />}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-secondary">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-orange-100 hidden md:flex flex-col sticky top-20 h-[calc(100vh-5rem)]">
        <div className="p-6 border-b border-orange-100">
          <h2 className="text-xl font-serif font-bold text-stone-800">Atelier Connecté</h2>
          <p className="text-xs text-stone-400 mt-1">Gérez votre activité</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <SidebarItem id="overview" icon={DollarSign} label="Vue d'ensemble" />
          <SidebarItem id="products" icon={Package} label="Mes Produits" />
          <SidebarItem id="orders" icon={ShoppingBag} label="Commandes" />
          <SidebarItem id="settings" icon={Settings} label="Paramètres" />
        </nav>
        <div className="p-4 border-t border-orange-100">
          <div className="bg-secondary p-4 rounded-xl text-center">
            <p className="text-xs font-bold text-stone-600 mb-2">Besoin d'aide ?</p>
            <Button size="sm" variant="outline" className="w-full text-xs">Support Artisan</Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-serif font-bold text-stone-800">Bonjour, Amadou !</h1>
                <p className="text-stone-500">Voici ce qui se passe dans votre boutique aujourd'hui.</p>
              </div>
              <Button onClick={() => setActiveTab('products')}>+ Nouveau Produit</Button>
            </header>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Chiffre d\'Affaires', val: '1,630,000 FCFA', trend: '+12%', color: 'bg-primary' },
                { label: 'Commandes', val: orders.length.toString(), trend: '+5%', color: 'bg-olive' },
                { label: 'Visiteurs', val: '1,204', trend: '-2%', color: 'bg-accent' },
                { label: 'Note Moyenne', val: '4.8/5', trend: 'Top', color: 'bg-terracotta' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden group hover:shadow-md transition-all">
                  <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
                  <p className="text-stone-500 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-stone-800">{stat.val}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-2 inline-block ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>
                    {stat.trend} vs mois dernier
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-96">
                <h3 className="text-lg font-bold mb-6 text-stone-800">Analyse des Ventes</h3>
                <ResponsiveContainer width="100%" height="85%">
                  <AreaChart data={SALES_DATA}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EA580C" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#EA580C" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="total" stroke="#EA580C" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <h3 className="text-lg font-bold mb-4 text-stone-800">Commandes Récentes</h3>
                <div className="space-y-4">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold">
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-stone-800">{order.customer}</p>
                          <p className="text-xs text-stone-500">{order.items} article(s)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">{order.total.toLocaleString()} F</p>
                        <p className="text-[10px] text-stone-400">{order.date}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setActiveTab('orders')} className="w-full text-center text-sm text-primary font-bold mt-4 hover:underline">Voir tout</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold font-serif text-stone-800">Catalogue Produits</h1>
              <Button onClick={() => setIsAdding(!isAdding)}>
                <Plus size={20} className="mr-2" /> Ajouter un produit
              </Button>
            </div>

            {isAdding && (
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200 mb-8 animate-fade-in-up grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-stone-800">Détails du produit</h3>
                  <div className="space-y-4">
                    <input 
                      className="border border-stone-200 p-3 rounded-lg w-full focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                      placeholder="Nom du produit (ex: Vase en terre cuite)" 
                      value={newProdName}
                      onChange={e => setNewProdName(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="border border-stone-200 p-3 rounded-lg w-full bg-white outline-none"
                        value={newProdCategory}
                        onChange={e => setNewProdCategory(e.target.value as Category)}
                      >
                        {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input 
                        className="border border-stone-200 p-3 rounded-lg w-full outline-none" 
                        placeholder="Prix (FCFA)" 
                        type="number"
                      />
                    </div>
                    <input 
                      className="border border-stone-200 p-3 rounded-lg w-full outline-none" 
                      placeholder="Matériaux (ex: Bois d'ébène, Cuir...)" 
                      value={newProdMaterials}
                      onChange={e => setNewProdMaterials(e.target.value)}
                    />
                    
                    {/* Image Upload Simulation */}
                    <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:bg-stone-50 transition-colors cursor-pointer">
                      <UploadCloud className="mx-auto text-stone-400 mb-2" size={32} />
                      <p className="text-sm text-stone-500 font-medium">Glissez vos photos ici ou cliquez pour parcourir</p>
                      <p className="text-xs text-stone-400 mt-1">JPG, PNG jusqu'à 5MB</p>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 flex flex-col">
                   <div className="flex justify-between items-center mb-4">
                     <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                       <Sparkles size={16} className="text-accent" /> Assistant IA
                     </label>
                   </div>
                   
                   <textarea 
                    className="border border-stone-200 p-4 rounded-xl w-full flex-grow text-sm mb-4 focus:outline-none focus:border-accent min-h-[120px]" 
                    placeholder="La description générée apparaîtra ici..."
                    value={newProdDesc}
                    onChange={e => setNewProdDesc(e.target.value)}
                   />
                   
                   <div className="flex gap-2 mb-6">
                     <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={handleGenerateAI}
                        isLoading={isGeneratingDesc}
                        className="w-full text-xs"
                      >
                        Générer Description
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleGeneratePost}
                        isLoading={isGeneratingPost}
                        className="w-full text-xs"
                        disabled={!newProdDesc}
                      >
                        <Instagram size={14} className="mr-1"/> Post Social
                      </Button>
                   </div>

                   {generatedPost && (
                     <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm animate-fade-in relative">
                       <h4 className="text-xs font-bold text-stone-500 uppercase mb-2">Aperçu Réseaux Sociaux</h4>
                       <p className="text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">{generatedPost}</p>
                       <button 
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 p-1.5 hover:bg-stone-100 rounded text-stone-500 transition-colors"
                        title="Copier"
                       >
                         {copied ? <Check size={14} className="text-green-600"/> : <Copy size={14}/>}
                       </button>
                     </div>
                   )}

                   <div className="mt-auto flex justify-end gap-3 pt-4 border-t border-stone-200">
                      <Button variant="ghost" onClick={() => setIsAdding(false)}>Annuler</Button>
                      <Button onClick={() => { alert('Produit ajouté !'); setIsAdding(false); }}>Mettre en ligne</Button>
                   </div>
                </div>
              </div>
            )}

            {/* Product Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-4 border-b border-stone-100 flex gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input placeholder="Chercher un produit..." className="pl-10 pr-4 py-2 text-sm border border-stone-200 rounded-lg w-full focus:outline-none" />
                </div>
                <Button variant="ghost" size="sm"><Filter size={16} className="mr-2"/> Filtres</Button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-100">
                  <tr>
                    <th className="p-4 font-bold text-stone-600 text-sm">Produit</th>
                    <th className="p-4 font-bold text-stone-600 text-sm">Prix</th>
                    <th className="p-4 font-bold text-stone-600 text-sm">Stock</th>
                    <th className="p-4 font-bold text-stone-600 text-sm">Statut</th>
                    <th className="p-4 font-bold text-stone-600 text-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {MOCK_PRODUCTS.slice(0, 5).map(p => (
                    <tr key={p.id} className="hover:bg-stone-50 group transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover border border-stone-100" />
                        <div>
                          <span className="font-bold text-stone-800 block">{p.name}</span>
                          <span className="text-xs text-stone-500">{p.category}</span>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-stone-700">{p.price.toLocaleString()} FCFA</td>
                      <td className="p-4 text-stone-600">12</td>
                      <td className="p-4"><span className="text-green-700 bg-green-50 px-2 py-1 rounded-md text-xs font-bold border border-green-100">Actif</span></td>
                      <td className="p-4 text-right">
                        <button className="text-stone-400 hover:text-primary p-2"><Edit2 size={16}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-fade-in">
             <h1 className="text-2xl font-bold font-serif text-stone-800 mb-6">Gestion des Commandes</h1>
             
             <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200">
                    <tr>
                      <th className="p-5 font-bold text-stone-600">ID Commande</th>
                      <th className="p-5 font-bold text-stone-600">Client</th>
                      <th className="p-5 font-bold text-stone-600">Date</th>
                      <th className="p-5 font-bold text-stone-600">Total</th>
                      <th className="p-5 font-bold text-stone-600">Statut</th>
                      <th className="p-5 font-bold text-stone-600 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50">
                        <td className="p-5 font-mono text-sm font-bold text-stone-500">{order.id}</td>
                        <td className="p-5">
                          <div className="font-bold text-stone-800">{order.customer}</div>
                          <div className="text-xs text-stone-500">{order.items} article(s)</div>
                        </td>
                        <td className="p-5 text-sm text-stone-600">{order.date}</td>
                        <td className="p-5 font-bold text-primary">{order.total.toLocaleString()} FCFA</td>
                        <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold 
                            ${order.status === 'Livré' ? 'bg-green-100 text-green-700' : 
                              order.status === 'En cours' ? 'bg-blue-100 text-blue-700' : 
                              'bg-amber-100 text-amber-700'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-5 text-right flex items-center justify-end gap-2">
                           {order.status === 'En cours' && (
                             <Button 
                               size="sm" 
                               variant="outline" 
                               className="text-xs border-green-200 hover:bg-green-50 text-green-700"
                               onClick={() => updateOrderStatus(order.id, 'Livré')}
                             >
                               <Truck size={14} className="mr-1" /> Expédier
                             </Button>
                           )}
                          <button className="text-stone-400 hover:text-stone-800"><MoreVertical size={20} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-fade-in max-w-2xl">
            <h1 className="text-2xl font-bold font-serif text-stone-800 mb-6">Paramètres de la boutique</h1>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-8">
              <section>
                <h3 className="text-lg font-bold text-stone-800 mb-4 border-b pb-2">Profil Artisan</h3>
                <div className="flex items-center gap-6 mb-6">
                   <div className="w-20 h-20 rounded-full bg-stone-200 overflow-hidden">
                     <img src="https://picsum.photos/seed/amadou/200/200" alt="Profile" className="w-full h-full object-cover" />
                   </div>
                   <Button variant="outline" size="sm">Changer la photo</Button>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">Nom de la boutique / Artisan</label>
                    <input className="w-full border p-2 rounded-lg" defaultValue="Amadou Diallo" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">Biographie</label>
                    <textarea className="w-full border p-2 rounded-lg h-24" defaultValue="Maître tisserand depuis 30 ans..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">Localisation</label>
                    <input className="w-full border p-2 rounded-lg" defaultValue="Ségou, Mali" />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-stone-800 mb-4 border-b pb-2">Paiement & Retraits</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center text-orange-600 font-bold">OM</div>
                      <div>
                        <p className="font-bold">Orange Money</p>
                        <p className="text-xs text-stone-500">+223 70 ** ** 89</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Modifier</Button>
                  </div>
                  <Button variant="outline" className="w-full dashed border-2">+ Ajouter un moyen de paiement</Button>
                </div>
              </section>

              <div className="pt-4">
                <Button className="w-full">Enregistrer les modifications</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};