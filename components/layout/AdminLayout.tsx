'use client'

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
  topNavItems?: Array<{ id: string; label: string; }>;
  activeTopNav?: string;
  onTopNavChange?: (nav: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentSection,
  onSectionChange,
  topNavItems,
  activeTopNav,
  onTopNavChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay d-md-none"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <Sidebar 
          currentSection={currentSection}
          onSectionChange={onSectionChange}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      
      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Mobile header */}
        <div className="d-md-none bg-white border-bottom p-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="bi bi-list"></i>
            Menu
          </button>
        </div>

        {/* Top navigation */}
        {topNavItems && (
          <TopNavigation 
            items={topNavItems}
            activeItem={activeTopNav}
            onItemChange={onTopNavChange}
          />
        )}
        
        {/* Page content */}
        <main className="flex-grow-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};