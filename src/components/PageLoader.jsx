import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const PageLoader = ({ 
  isLoading, 
  hasError, 
  errorMessage, 
  onRetry, 
  children,
  loadingText = "Loading...",
  fullScreen = false 
}) => {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-20'}`}>
        <LoadingSpinner 
          size="large" 
          text={loadingText}
          className="bg-white/80 backdrop-blur-sm rounded-lg"
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-20'}`}>
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="mb-4">
            <svg 
              className="w-16 h-16 text-red-500 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return children;
};

export default PageLoader;
