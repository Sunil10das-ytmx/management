import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  hoverEffect = true, 
  padding = 'p-8',
  bgColor = 'bg-white',
  borderColor = 'border-gray-100',
  rounded = 'rounded-3xl',
  shadow = 'shadow-lg',
  hoverShadow = 'hover:shadow-2xl',
  hoverScale = 'hover:scale-105',
  transition = 'transition-all duration-500',
  ...props 
}) {
  return (
    <div 
      className={`relative ${bgColor} ${rounded} ${shadow} border ${borderColor} ${padding} ${transition} ${
        hoverEffect ? `${hoverShadow} ${hoverScale} transform` : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Card.Header component
Card.Header = function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card.Title component
Card.Title = function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300 ${className}`} {...props}>
      {children}
    </h3>
  );
};

// Card.Content component
Card.Content = function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card.Footer component
Card.Footer = function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`mt-6 pt-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card.Icon component
Card.Icon = function CardIcon({ 
  icon: Icon, 
  color = 'from-blue-500 to-indigo-600',
  className = '',
  ...props 
}) {
  return (
    <div className={`relative w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg ${className}`} {...props}>
      <Icon className="h-8 w-8 text-white" />
    </div>
  );
};
