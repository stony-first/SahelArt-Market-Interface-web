import React from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Heart } from 'lucide-react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading,
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-amber-800 shadow-md",
    secondary: "bg-olive text-white hover:bg-olive-700 shadow-md",
    outline: "border-2 border-primary text-primary hover:bg-stone-100",
    ghost: "text-stone-600 hover:bg-stone-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      ) : null}
      {children}
    </button>
  );
};

// --- Product Card ---
interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => onClick(product.id)}>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-olive text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            Nouveau
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white text-stone-500 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100">
          <Heart size={18} />
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-semibold text-olive uppercase tracking-wide">{product.category}</span>
          <div className="flex items-center text-amber-500 text-xs">
            <Star size={12} fill="currentColor" />
            <span className="ml-1 text-stone-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 
          className="font-serif text-lg font-bold text-stone-800 mb-1 cursor-pointer hover:text-primary"
          onClick={() => onClick(product.id)}
        >
          {product.name}
        </h3>
        <p className="text-sm text-stone-500 mb-3 italic">Par {product.artisanName}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{product.price.toLocaleString()} FCFA</span>
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
            <ShoppingBag size={16} className="mr-1" />
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Section Title ---
export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8 text-center">
    {subtitle && <span className="text-olive font-medium text-sm uppercase tracking-wider block mb-2">{subtitle}</span>}
    <h2 className="text-3xl font-serif font-bold text-stone-800 relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full"></span>
    </h2>
  </div>
);
