
import React from 'react';
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
  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        currentSection={currentSection}
        onSectionChange={onSectionChange}
      />
      <div className="flex-1 flex flex-col min-w-0">
        {topNavItems && (
          <TopNavigation 
            items={topNavItems}
            activeItem={activeTopNav}
            onItemChange={onTopNavChange}
          />
        )}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
