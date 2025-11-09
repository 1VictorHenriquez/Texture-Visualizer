
import React from 'react';
import { Product } from '../types';

interface ControlPanelProps {
  selectedProduct: Product | null;
  isReady: boolean;
  isLoading: boolean;
  onVisualize: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ selectedProduct, isReady, isLoading, onVisualize }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex-grow flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">
          Step 3: Get Ready
        </h2>
        {selectedProduct ? (
          <div className="bg-gray-700/50 p-3 rounded-lg flex items-center space-x-3">
            <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-16 h-16 object-cover rounded-md" />
            <div>
              <p className="text-sm text-gray-400">Selected Product:</p>
              <h3 className="font-bold text-lg text-white">{selectedProduct.name}</h3>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Select a product from the catalog to begin.</p>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <button
          onClick={onVisualize}
          disabled={!isReady || isLoading}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Visualizing...
            </>
          ) : (
            'Visualize with AI'
          )}
        </button>
      </div>
    </div>
  );
};
