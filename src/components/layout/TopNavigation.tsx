
import React from 'react';

interface TopNavigationItem {
  id: string;
  label: string;
}

interface TopNavigationProps {
  items: TopNavigationItem[];
  activeItem?: string;
  onItemChange?: (item: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  items,
  activeItem,
  onItemChange
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <nav className="flex space-x-8">
          {items.map((item) => {
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onItemChange?.(item.id)}
                className={`pb-4 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
