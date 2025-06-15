
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { InstitutionsList } from '@/components/institutions/InstitutionsList';
import { InstitutionForm } from '@/components/institutions/InstitutionForm';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [activeTopNav, setActiveTopNav] = useState('institution');
  const [showInstitutionForm, setShowInstitutionForm] = useState(false);

  const institutionTopNavItems = [
    { id: 'institution', label: 'Institution' },
    { id: 'address', label: 'Address' },
    { id: 'contact', label: 'Contact' },
    { id: 'configuration', label: 'Configuration' }
  ];

  const handleInstitutionSelect = (institutionId: string) => {
    console.log('Selected institution:', institutionId);
    setShowInstitutionForm(true);
  };

  const handleNewInstitution = () => {
    setShowInstitutionForm(true);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'institutions':
        if (showInstitutionForm) {
          return <InstitutionForm activeTab={activeTopNav} />;
        }
        return (
          <InstitutionsList 
            onInstitutionSelect={handleInstitutionSelect}
            onNewInstitution={handleNewInstitution}
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
        setShowInstitutionForm(false);
      }}
      topNavItems={currentSection === 'institutions' && showInstitutionForm ? institutionTopNavItems : undefined}
      activeTopNav={activeTopNav}
      onTopNavChange={setActiveTopNav}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Index;
