import React from 'react';

const RouteFallback: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 gap-4 animate-pulse">
      <div className="h-10 w-48 bg-gray-200 rounded" />
      <div className="h-4 w-72 bg-gray-200 rounded" />
      <div className="h-4 w-64 bg-gray-200 rounded" />
      <div className="h-4 w-80 bg-gray-200 rounded" />
    </div>
  );
};

export default RouteFallback;
