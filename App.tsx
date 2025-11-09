
import React, { useState, useMemo, useEffect } from 'react';
import { FilterPanel } from './components/FilterPanel';
import { ImageUploader } from './components/ImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { ResultViewer } from './components/ResultViewer';
import { Product, FilterValues } from './types';
import { MOCK_PRODUCTS } from './constants';
import { generateVisualisation } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    design: 'all',
    color: 'all',
    type: 'all',
    category: 'all',
    texture: 'all',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [userImagePreviewUrl, setUserImagePreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userImageFile) {
      const url = URL.createObjectURL(userImageFile);
      setUserImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setUserImagePreviewUrl(null);
  }, [userImageFile]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      return (
        (filters.design === 'all' || product.design === filters.design) &&
        (filters.color === 'all' || product.color === filters.color) &&
        (filters.type === 'all' || product.type === filters.type) &&
        (filters.category === 'all' || product.category === filters.category) &&
        (filters.texture === 'all' || product.texture === filters.texture)
      );
    });
  }, [filters]);

  const handleVisualizeClick = async () => {
    if (!selectedProduct || !userImageFile) {
      setError("Please select a product and upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const base64Image = await fileToBase64(userImageFile);
      const mimeType = userImageFile.type;
      
      const resultBase64 = await generateVisualisation(base64Image, mimeType, selectedProduct);
      
      setGeneratedImageUrl(`data:${mimeType};base64,${resultBase64}`);
    } catch (err) {
      console.error("Visualization failed:", err);
      setError("Sorry, we couldn't generate the visualization. The AI might be busy. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Texturelle AI Visualizer
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          See our products in your space, instantly.
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
        <aside className="lg:col-span-3 xl:col-span-2">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            products={filteredProducts}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />
        </aside>

        <div className="lg:col-span-9 xl:col-span-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 flex flex-col gap-6">
            <ImageUploader 
              userImageFile={userImageFile}
              onFileChange={setUserImageFile} 
              previewUrl={userImagePreviewUrl} 
            />
            <ControlPanel
              selectedProduct={selectedProduct}
              isReady={!!selectedProduct && !!userImageFile}
              isLoading={isLoading}
              onVisualize={handleVisualizeClick}
            />
          </div>

          <div className="xl:col-span-2">
            <ResultViewer
              isLoading={isLoading}
              generatedImageUrl={generatedImageUrl}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
