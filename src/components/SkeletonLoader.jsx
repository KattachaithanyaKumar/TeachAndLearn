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

      case 'testimonial':
        return (
          <div className="min-w-[300px] bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 ${shimmerClass} rounded-full`}></div>
              <div>
                <div className={`h-4 ${shimmerClass} rounded w-24 mb-2`}></div>
                <div className={`h-3 ${shimmerClass} rounded w-16`}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`h-4 ${shimmerClass} rounded w-full`}></div>
              <div className={`h-4 ${shimmerClass} rounded w-full`}></div>
              <div className={`h-4 ${shimmerClass} rounded w-3/4`}></div>
            </div>
            <div className="flex gap-1 mt-4">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className={`w-4 h-4 ${shimmerClass} rounded-full`}></div>
              ))}
            </div>
          </div>
        );

      case 'aboutus':
        return (
          <div className="flex flex-col md:flex-row gap-16 w-full max-w-7xl items-center animate-pulse">
            <div className="flex-shrink-0">
              <div className={`w-[300px] md:w-[480px] h-[400px] md:h-[600px] ${shimmerClass} rounded-lg`}></div>
            </div>
            <div className="max-w-xl text-center md:text-left z-10">
              <div className={`h-4 ${shimmerClass} rounded w-24 mb-4`}></div>
              <div className={`h-12 ${shimmerClass} rounded w-full mb-6`}></div>
              <div className={`h-4 ${shimmerClass} rounded w-full mb-2`}></div>
              <div className={`h-4 ${shimmerClass} rounded w-3/4 mb-6`}></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="border border-amber-300 bg-amber-50 rounded-lg flex items-center gap-3 px-4 py-3 shadow-sm">
                    <div className={`w-5 h-5 ${shimmerClass} rounded-full`}></div>
                    <div className={`h-4 ${shimmerClass} rounded flex-1`}></div>
                  </div>
                ))}
              </div>
              <div className={`h-12 ${shimmerClass} rounded w-32`}></div>
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
