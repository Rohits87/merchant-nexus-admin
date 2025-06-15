
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { MerchantsList } from '@/components/merchants/MerchantsList';
import { MerchantForm } from '@/components/merchants/MerchantForm';
import { AcquirersList } from '@/components/acquirers/AcquirersList';
import { AcquirerForm } from '@/components/acquirers/AcquirerForm';
import { GatewaysList } from '@/components/gateways/GatewaysList';
import { GatewayForm } from '@/components/gateways/GatewayForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  section: string;
  isForm?: boolean;
  formActiveTab?: string;
}

const Index = () => {
  const [openTabs, setOpenTabs] = useState<TabItem[]>([
    { id: 'dashboard', label: 'Dashboard', section: 'dashboard' }
  ]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeTopNav, setActiveTopNav] = useState('overview');

  const getSectionLabel = (section: string) => {
    const labels: Record<string, string> = {
      'dashboard': 'Dashboard',
      'merchants': 'Merchants',
      'acquirer-banks': 'Acquirer Banks',
      'payment-gateways': 'Payment Gateways',
      'gateway-mapping': 'Gateway Mapping',
      'users': 'Users & Access',
      'audit-logs': 'Audit Logs',
      'settings': 'Settings'
    };
    return labels[section] || section;
  };

  const handleSectionChange = (section: string) => {
    const existingTab = openTabs.find(tab => tab.section === section && !tab.isForm);
    
    if (existingTab) {
      setActiveTab(existingTab.id);
    } else {
      const newTab: TabItem = {
        id: section,
        label: getSectionLabel(section),
        section: section
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(newTab.id);
    }
    setActiveTopNav('overview');
  };

  const handleMerchantSelect = (merchantId: string) => {
    const tabId = `merchant-form-${merchantId}`;
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: `Merchant ${merchantId}`,
        section: 'merchants',
        isForm: true,
        formActiveTab: activeTopNav
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleNewMerchant = () => {
    const tabId = 'merchant-form-new';
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: 'New Merchant',
        section: 'merchants',
        isForm: true,
        formActiveTab: activeTopNav
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleAcquirerSelect = (acquirerId: string) => {
    const tabId = `acquirer-form-${acquirerId}`;
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: `Acquirer ${acquirerId}`,
        section: 'acquirer-banks',
        isForm: true,
        formActiveTab: activeTopNav
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleNewAcquirer = () => {
    const tabId = 'acquirer-form-new';
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: 'New Acquirer',
        section: 'acquirer-banks',
        isForm: true,
        formActiveTab: activeTopNav
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleGatewaySelect = (gatewayId: string) => {
    const tabId = `gateway-form-${gatewayId}`;
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: `Gateway ${gatewayId}`,
        section: 'payment-gateways',
        isForm: true,
        formActiveTab: activeTopNav
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleNewGateway = () => {
    const tabId = 'gateway-form-new';
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: 'New Gateway',
        section: 'payment-gateways',
        isForm: true,
        formActiveTab: activeTopNav
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const closeTab = (tabId: string) => {
    const newTabs = openTabs.filter(tab => tab.id !== tabId);
    setOpenTabs(newTabs);
    
    if (activeTab === tabId) {
      const newActiveTab = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : 'dashboard';
      setActiveTab(newActiveTab);
    }
  };

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

  const getCurrentTab = () => {
    return openTabs.find(tab => tab.id === activeTab);
  };

  const getTopNavItems = () => {
    const currentTab = getCurrentTab();
    if (!currentTab?.isForm) return undefined;

    if (currentTab.section === 'merchants') {
      return merchantTopNavItems;
    }
    if (currentTab.section === 'acquirer-banks') {
      return acquirerTopNavItems;
    }
    if (currentTab.section === 'payment-gateways') {
      return gatewayTopNavItems;
    }
    return undefined;
  };

  const renderTabContent = (tab: TabItem) => {
    switch (tab.section) {
      case 'dashboard':
        return <DashboardOverview />;
      
      case 'merchants':
        if (tab.isForm) {
          return <MerchantForm activeTab={activeTopNav} />;
        }
        return (
          <MerchantsList 
            onMerchantSelect={handleMerchantSelect}
            onNewMerchant={handleNewMerchant}
          />
        );
      
      case 'acquirer-banks':
        if (tab.isForm) {
          return <AcquirerForm activeTab={activeTopNav} />;
        }
        return (
          <AcquirersList 
            onAcquirerSelect={handleAcquirerSelect}
            onNewAcquirer={handleNewAcquirer}
          />
        );
      
      case 'payment-gateways':
        if (tab.isForm) {
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
                {tab.label}
              </h3>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <AdminLayout
      currentSection={getCurrentTab()?.section || 'dashboard'}
      onSectionChange={handleSectionChange}
      topNavItems={getTopNavItems()}
      activeTopNav={activeTopNav}
      onTopNavChange={setActiveTopNav}
    >
      <div className="h-full flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start h-auto p-1 bg-white border-b rounded-none">
            {openTabs.map((tab) => (
              <div key={tab.id} className="flex items-center">
                <TabsTrigger 
                  value={tab.id}
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-b-2 border-transparent data-[state=active]:border-blue-700 rounded-none px-4 py-2"
                >
                  {tab.label}
                </TabsTrigger>
                {tab.id !== 'dashboard' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    className="ml-1 p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </TabsList>
          
          {openTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="flex-1 mt-0">
              {renderTabContent(tab)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Index;
