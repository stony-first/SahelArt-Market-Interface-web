import { Artisan, Category, Product, User } from './types';

export const MOCK_ARTISANS: Artisan[] = [
  {
    id: 'a1',
    name: 'Amadou Diallo',
    location: 'Ségou, Mali',
    bio: 'Maître tisserand depuis 30 ans, je perpétue la tradition du Bogolan avec des teintures 100% naturelles à base d\'argile et de plantes.',
    photoUrl: 'https://picsum.photos/seed/amadou/200/200',
    specialty: 'Textile',
    rating: 4.8,
  },
  {
    id: 'a2',
    name: 'Awa Koné',
    location: 'Grand-Bassam, Côte d\'Ivoire',
    bio: 'Créatrice de bijoux contemporains inspirés des poids Akan. Chaque pièce raconte une histoire de royauté et de sagesse.',
    photoUrl: 'https://picsum.photos/seed/awa/200/200',
    specialty: 'Bijoux',
    rating: 4.9,
  },
  {
    id: 'a3',
    name: 'Koffi Mensah',
    location: 'Accra, Ghana',
    bio: 'Sculpteur sur bois passionné, je transforme l\'ébène et l\'acajou en œuvres d\'art qui célèbrent la vie quotidienne africaine.',
    photoUrl: 'https://picsum.photos/seed/koffi/200/200',
    specialty: 'Art',
    rating: 4.7,
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Étole en Bogolan Fine',
    price: 45000,
    category: Category.TEXTILE,
    artisanId: 'a1',
    artisanName: 'Amadou Diallo',
    description: 'Une étole légère en coton tissé main, teinte avec de l\'argile fermentée du fleuve Niger. Motifs traditionnels symbolisant la protection.',
    materials: ['Coton', 'Argile', 'Décoctions végétales'],
    images: ['https://picsum.photos/seed/bogolan1/600/600', 'https://picsum.photos/seed/bogolan2/600/600'],
    rating: 4.8,
    reviewsCount: 12,
    isPopular: true,
  },
  {
    id: 'p2',
    name: 'Collier Poids Baoulé Or',
    price: 85000,
    category: Category.BIJOUX,
    artisanId: 'a2',
    artisanName: 'Awa Koné',
    description: 'Pendentif en bronze plaqué or 18 carats, moulé selon la technique de la cire perdue. Représente un proverbe ancien sur l\'unité.',
    materials: ['Bronze', 'Plaqué Or', 'Perles de verre'],
    images: ['https://picsum.photos/seed/bijoux1/600/600', 'https://picsum.photos/seed/bijoux2/600/600'],
    rating: 5.0,
    reviewsCount: 8,
    isNew: true,
  },
  {
    id: 'p3',
    name: 'Statue "Le Penseur"',
    price: 120000,
    category: Category.ART,
    artisanId: 'a3',
    artisanName: 'Koffi Mensah',
    description: 'Sculpture unique en ébène massif. Une pièce maîtresse pour votre salon qui invite à la méditation.',
    materials: ['Bois d\'ébène'],
    images: ['https://picsum.photos/seed/statue1/600/600'],
    rating: 4.9,
    reviewsCount: 3,
  },
  {
    id: 'p4',
    name: 'Panier Bolga Coloré',
    price: 25000,
    category: Category.DECORATION,
    artisanId: 'a1',
    artisanName: 'Amadou Diallo', // Reusing for demo
    description: 'Panier tressé à la main avec de l\'herbe à éléphant. Robuste et coloré, idéal pour le marché ou comme rangement.',
    materials: ['Herbe à éléphant', 'Cuir'],
    images: ['https://picsum.photos/seed/panier1/600/600'],
    rating: 4.6,
    reviewsCount: 24,
    isPopular: true,
  },
  {
    id: 'p5',
    name: 'Beurre de Karité Pur',
    price: 5000,
    category: Category.ALIMENTATION,
    artisanId: 'a2',
    artisanName: 'Awa Koné',
    description: 'Beurre de karité brut, non raffiné, produit par une coopérative de femmes. Hydratation intense pour la peau et les cheveux.',
    materials: ['Noix de karité'],
    images: ['https://picsum.photos/seed/karite1/600/600'],
    rating: 4.7,
    reviewsCount: 45,
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Saly Diop',
  email: 'saly@example.com',
  avatarUrl: 'https://picsum.photos/seed/user/100/100',
  favorites: ['p1', 'p3'],
};

export const CURRENCY = 'FCFA';

// Dashboard Data
export const SALES_DATA = [
  { name: 'Jan', total: 150000 },
  { name: 'Fév', total: 230000 },
  { name: 'Mar', total: 180000 },
  { name: 'Avr', total: 320000 },
  { name: 'Mai', total: 290000 },
  { name: 'Juin', total: 450000 },
];
