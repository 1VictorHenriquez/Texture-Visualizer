
import React from 'react';

interface ResultViewerProps {
  isLoading: boolean;
  generatedImageUrl: string | null;
  error: string | null;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ isLoading, generatedImageUrl, error }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">
        Step 4: AI Visualization
      </h2>
      <div className="flex-grow flex items-center justify-center bg-black/20 rounded-lg border-2 border-indigo-800/50 p-4 aspect-video min-h-0">
        {isLoading && (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-lg font-semibold text-gray-300">Generating your vision...</p>
            <p className="text-sm text-gray-400">This may take a moment. The AI is working its magic!</p>
          </div>
        )}
        {error && !isLoading && (
          <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-bold">An Error Occurred</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {!isLoading && !error && generatedImageUrl && (
          <img src={generatedImageUrl} alt="AI visualization result" className="w-full h-full object-contain rounded-md" />
        )}
        {!isLoading && !error && !generatedImageUrl && (
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold">Your Result Awaits</h3>
            <p className="max-w-md mx-auto mt-2">
              Complete steps 1-3, then click "Visualize with AI" to see how our products transform your space.
            </p>
          </div>
        )}
      </div>
       <p className="text-xs text-gray-500 mt-3 text-center">
        * Please note: The AI-generated image is a high-quality simulation and should be used for inspiration. Actual results may vary.
      </p>
    </div>
  );
};
