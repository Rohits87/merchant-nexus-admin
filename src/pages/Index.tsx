
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { MerchantsList } from '@/components/merchants/MerchantsList';
import { MerchantForm } from '@/components/merchants/MerchantForm';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [activeTopNav, setActiveTopNav] = useState('institution');
  const [showMerchantForm, setShowMerchantForm] = useState(false);

  const merchantTopNavItems = [
    { id: 'institution', label: 'Institution' },
    { id: 'address', label: 'Address' },
    { id: 'contact', label: 'Contact' },
    { id: 'configuration', label: 'Configuration' }
  ];

  const handleMerchantSelect = (merchantId: string) => {
    console.log('Selected merchant:', merchantId);
    setShowMerchantForm(true);
  };

  const handleNewMerchant = () => {
    setShowMerchantForm(true);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'merchants':
        if (showMerchantForm) {
          return <MerchantForm activeTab={activeTopNav} />;
        }
        return (
          <MerchantsList 
            onMerchantSelect={handleMerchantSelect}
            onNewMerchant={handleNewMerchant}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
              </h3>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <AdminLayout
      currentSection={currentSection}
      onSectionChange={(section) => {
        setCurrentSection(section);
        setShowMerchantForm(false);
      }}
      topNavItems={currentSection === 'merchants' && showMerchantForm ? merchantTopNavItems : undefined}
      activeTopNav={activeTopNav}
      onTopNavChange={setActiveTopNav}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Index;
