'use client'

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
    <div className="bg-white border-bottom">
      <div className="container-fluid px-4 py-3">
        <ul className="nav nav-tabs border-0">
          {items.map((item) => {
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id} className="nav-item">
                <button
                  onClick={() => onItemChange?.(item.id)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none' }}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};