
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onSelect }) => {
  const baseClasses = "bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-indigo-500/30";
  const selectedClasses = isSelected ? "ring-2 ring-offset-2 ring-offset-gray-800 ring-indigo-500" : "ring-1 ring-transparent";

  return (
    <div className={`${baseClasses} ${selectedClasses}`} onClick={onSelect}>
      <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold text-md text-white truncate">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.design} - {product.color}</p>
      </div>
    </div>
  );
};
