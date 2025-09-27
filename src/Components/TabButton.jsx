import React from 'react';

const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-medium text-sm flex items-center space-x-2 ${
      active 
        ? 'text-green-600 border-b-2 border-green-600' 
        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{children}</span>
  </button>
);

export default TabButton;
