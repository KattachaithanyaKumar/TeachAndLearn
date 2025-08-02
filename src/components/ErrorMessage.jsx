import React from 'react';

const ErrorMessage = ({ message, onRetry, className = "" }) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div className="mb-4">
        <svg 
          className="w-12 h-12 text-red-500 mx-auto mb-2" 
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
      <p className="text-red-600 mb-4 font-medium">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
