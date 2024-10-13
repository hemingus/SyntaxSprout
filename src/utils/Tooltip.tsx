import React, { useState } from 'react';

interface TooltipProps {
  text: string | null;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap bg-sky-950 text-white text-lg px-2 py-1 rounded shadow-lg opacity-90">
          {text}
        </div>
      )}
    </div>
  );
}

export default Tooltip;