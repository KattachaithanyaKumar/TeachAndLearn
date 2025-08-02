import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Loading...', 
  className = '',
  showText = true,
  color = 'orange'
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const colorClasses = {
    orange: 'border-orange-200 border-t-orange-500',
    blue: 'border-blue-200 border-t-blue-500',
    green: 'border-green-200 border-t-green-500',
    gray: 'border-gray-200 border-t-gray-500'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin`}
      ></div>
      {showText && text && (
        <p className="mt-4 text-gray-600 text-sm font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
