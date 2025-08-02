import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const shimmerClass = 'animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer';
  
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
            <div className="bg-yellow-50 p-4 rounded-full mb-4 w-16 h-16 mx-auto">
              <div className={`w-8 h-8 ${shimmerClass} rounded mx-auto mt-2`}></div>
            </div>
            <div className={`h-6 ${shimmerClass} rounded mb-2 mx-auto w-3/4`}></div>
            <div className={`h-4 ${shimmerClass} rounded mb-2`}></div>
            <div className={`h-4 ${shimmerClass} rounded mb-2`}></div>
            <div className={`h-4 ${shimmerClass} rounded mb-4 w-2/3`}></div>
            <div className={`h-4 ${shimmerClass} rounded w-1/3 mx-auto`}></div>
          </div>
        );
      
      case 'stat':
        return (
          <div className="flex flex-col items-center justify-center p-4 animate-pulse">
            <div className={`${shimmerClass} rounded-full w-20 h-20 mb-4`}></div>
            <div className={`h-6 ${shimmerClass} rounded mb-2 w-16 mx-auto`}></div>
            <div className={`h-4 ${shimmerClass} rounded w-20 mx-auto`}></div>
          </div>
        );

      case 'approach':
        return (
          <div className="flex items-start gap-3 p-4 rounded-xl animate-pulse">
            <div className={`w-8 h-8 ${shimmerClass} rounded-full flex-shrink-0`}></div>
            <div className="flex-1">
              <div className={`h-4 ${shimmerClass} rounded w-full`}></div>
              <div className={`h-4 ${shimmerClass} rounded w-3/4 mt-2`}></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="animate-pulse">
            <div className={`h-4 ${shimmerClass} rounded w-full mb-2`}></div>
            <div className={`h-4 ${shimmerClass} rounded w-3/4`}></div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
