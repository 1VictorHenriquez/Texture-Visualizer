
import React from 'react';
import { Product, FilterValues } from '../types';
import { FILTER_OPTIONS } from '../constants';
import { ProductCard } from './ProductCard';

interface FilterPanelProps {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

const FilterSelect: React.FC<{
  label: string;
  name: keyof FilterValues;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, name, value, options, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
    >
      <option value="all">All</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  products,
  selectedProduct,
  onSelectProduct,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">
        Step 1: Find Your Style
      </h2>
      <div className="space-y-4 mb-4">
        <FilterSelect label="Design" name="design" value={filters.design} options={FILTER_OPTIONS.design} onChange={handleFilterChange} />
        <FilterSelect label="Color" name="color" value={filters.color} options={FILTER_OPTIONS.color} onChange={handleFilterChange} />
        <FilterSelect label="Type" name="type" value={filters.type} options={FILTER_OPTIONS.type} onChange={handleFilterChange} />
        <FilterSelect label="Category" name="category" value={filters.category} options={FILTER_OPTIONS.category} onChange={handleFilterChange} />
        <FilterSelect label="Texture" name="texture" value={filters.texture} options={FILTER_OPTIONS.texture} onChange={handleFilterChange} />
      </div>

      <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProduct?.id === product.id}
                onSelect={() => onSelectProduct(product)}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No products match your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};
