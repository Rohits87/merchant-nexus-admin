
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { MerchantsList } from '@/components/merchants/MerchantsList';
import { MerchantForm } from '@/components/merchants/MerchantForm';
import { AcquirersList } from '@/components/acquirers/AcquirersList';
import { AcquirerForm } from '@/components/acquirers/AcquirerForm';
import { GatewaysList } from '@/components/gateways/GatewaysList';
import { GatewayForm } from '@/components/gateways/GatewayForm';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [activeTopNav, setActiveTopNav] = useState('overview');
  const [showMerchantForm, setShowMerchantForm] = useState(false);
  const [showAcquirerForm, setShowAcquirerForm] = useState(false);
  const [showGatewayForm, setShowGatewayForm] = useState(false);

  const merchantTopNavItems = [
    { id: 'institution', label: 'Institution' },
    { id: 'address', label: 'Address' },
    { id: 'contact', label: 'Contact' },
    { id: 'configuration', label: 'Configuration' }
  ];

  const acquirerTopNavItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'technical-info', label: 'Technical Info' }
  ];

  const gatewayTopNavItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'technical-info', label: 'Technical Info' }
  ];

  const handleMerchantSelect = (merchantId: string) => {
    console.log('Selected merchant:', merchantId);
    setShowMerchantForm(true);
  };

  const handleNewMerchant = () => {
    setShowMerchantForm(true);
  };

  const handleAcquirerSelect = (acquirerId: string) => {
    console.log('Selected acquirer:', acquirerId);
    setShowAcquirerForm(true);
  };

  const handleNewAcquirer = () => {
    setShowAcquirerForm(true);
  };

  const handleGatewaySelect = (gatewayId: string) => {
    console.log('Selected gateway:', gatewayId);
    setShowGatewayForm(true);
  };

  const handleNewGateway = () => {
    setShowGatewayForm(true);
  };

  const getTopNavItems = () => {
    if (currentSection === 'merchants' && showMerchantForm) {
      return merchantTopNavItems;
    }
    if (currentSection === 'acquirer-banks' && showAcquirerForm) {
      return acquirerTopNavItems;
    }
    if (currentSection === 'payment-gateways' && showGatewayForm) {
      return gatewayTopNavItems;
    }
    return undefined;
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
      
      case 'acquirer-banks':
        if (showAcquirerForm) {
          return <AcquirerForm activeTab={activeTopNav} />;
        }
        return (
          <AcquirersList 
            onAcquirerSelect={handleAcquirerSelect}
            onNewAcquirer={handleNewAcquirer}
          />
        );
      
      case 'payment-gateways':
        if (showGatewayForm) {
          return <GatewayForm activeTab={activeTopNav} />;
        }
        return (
          <GatewaysList 
            onGatewaySelect={handleGatewaySelect}
            onNewGateway={handleNewGateway}
          />
        );
      
      case 'gateway-mapping':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gateway-Acquirer Mapping</h3>
              <p className="text-gray-600">Configure routing rules between gateways and acquirers</p>
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Users & Access Control</h3>
              <p className="text-gray-600">Manage user roles and permissions</p>
            </div>
          </div>
        );
      
      case 'audit-logs':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Audit Logs</h3>
              <p className="text-gray-600">View system activity and change history</p>
            </div>
          </div>
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
        setShowAcquirerForm(false);
        setShowGatewayForm(false);
        setActiveTopNav('overview');
      }}
      topNavItems={getTopNavItems()}
      activeTopNav={activeTopNav}
      onTopNavChange={setActiveTopNav}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Index;
