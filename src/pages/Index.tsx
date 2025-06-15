
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { MerchantsList } from '@/components/merchants/MerchantsList';
import { AcquirersList } from '@/components/acquirers/AcquirersList';
import { GatewaysList } from '@/components/gateways/GatewaysList';
import { MerchantForm } from '@/components/merchants/MerchantForm';
import { AcquirerForm } from '@/components/acquirers/AcquirerForm';
import { GatewayForm } from '@/components/gateways/GatewayForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  section: string;
  isForm?: boolean;
  entityId?: string;
}

const sectionLabels: Record<string, string> = {
  'dashboard': 'Dashboard',
  'all-merchants': 'All Merchants',
  'pricing-configuration': 'Pricing Configuration',
  'terminal-configuration': 'Terminal Configuration',
  'acquirer-banks': 'Acquirer Banks',
  'payment-gateways': 'Payment Gateways',
  'gateway-mapping': 'Gateway Mapping',
  'users': 'Users & Access',
  'audit-logs': 'Audit Logs',
  'settings': 'Settings'
};

const Index = () => {
  const [openTabs, setOpenTabs] = useState<TabItem[]>([
    { id: 'dashboard', label: 'Dashboard', section: 'dashboard' }
  ]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeTopNav, setActiveTopNav] = useState('overview');

  const handleSectionChange = (section: string) => {
    console.log('Section change requested:', section);
    
    const tabId = section;
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: sectionLabels[section] || section,
        section: section
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
    setActiveTopNav('overview');
  };

  const handleMerchantSelect = (merchantId: string) => {
    console.log('Merchant selected:', merchantId);
    const tabId = `merchant-form-${merchantId}`;
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: `Merchant ${merchantId}`,
        section: 'all-merchants',
        isForm: true,
        entityId: merchantId
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleNewMerchant = () => {
    console.log('New merchant requested');
    const tabId = 'merchant-form-new';
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: 'New Merchant',
        section: 'all-merchants',
        isForm: true
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleAcquirerSelect = (acquirerId: string) => {
    console.log('Acquirer selected:', acquirerId);
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
        entityId: acquirerId
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleNewAcquirer = () => {
    console.log('New acquirer requested');
    const tabId = 'acquirer-form-new';
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: 'New Acquirer',
        section: 'acquirer-banks',
        isForm: true
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleGatewaySelect = (gatewayId: string) => {
    console.log('Gateway selected:', gatewayId);
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
        entityId: gatewayId
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const handleNewGateway = () => {
    console.log('New gateway requested');
    const tabId = 'gateway-form-new';
    const existingTab = openTabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
    } else {
      const newTab: TabItem = {
        id: tabId,
        label: 'New Gateway',
        section: 'payment-gateways',
        isForm: true
      };
      setOpenTabs(prev => [...prev, newTab]);
      setActiveTab(tabId);
    }
  };

  const getCurrentTab = () => {
    return openTabs.find(tab => tab.id === activeTab);
  };

  const getTopNavItems = () => {
    const currentTab = getCurrentTab();
    if (!currentTab) return undefined;
    
    switch (currentTab.section) {
      case 'acquirer-banks':
        return [
          { id: 'overview', label: 'Overview' },
          { id: 'details', label: 'Details' },
          { id: 'technical-info', label: 'Technical Info' }
        ];
      case 'payment-gateways':
        return [
          { id: 'overview', label: 'Overview' },
          { id: 'details', label: 'Details' },
          { id: 'technical-info', label: 'Technical Info' }
        ];
      default:
        return undefined;
    }
  };

  const renderTabContent = (tab: TabItem) => {
    console.log('Rendering tab content for:', tab.section, tab.id, tab);
    
    try {
      switch (tab.section) {
        case 'dashboard':
          return <DashboardOverview />;
          
        case 'all-merchants':
          if (tab.id === 'merchant-form-new') {
            return <MerchantForm />;
          }
          if (tab.id.startsWith('merchant-form-') && tab.entityId) {
            return <MerchantForm merchantId={tab.entityId} />;
          }
          return (
            <MerchantsList 
              onMerchantSelect={handleMerchantSelect}
              onNewMerchant={handleNewMerchant}
            />
          );
          
        case 'acquirer-banks':
          if (tab.id === 'acquirer-form-new') {
            return <AcquirerForm />;
          }
          if (tab.id.startsWith('acquirer-form-') && tab.entityId) {
            return <AcquirerForm acquirerId={tab.entityId} />;
          }
          return (
            <AcquirersList 
              onAcquirerSelect={handleAcquirerSelect}
              onNewAcquirer={handleNewAcquirer}
            />
          );
          
        case 'payment-gateways':
          if (tab.id === 'gateway-form-new') {
            return <GatewayForm />;
          }
          if (tab.id.startsWith('gateway-form-') && tab.entityId) {
            return <GatewayForm gatewayId={tab.entityId} />;
          }
          return (
            <GatewaysList 
              onGatewaySelect={handleGatewaySelect}
              onNewGateway={handleNewGateway}
            />
          );

        case 'pricing-configuration':
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Pricing Configuration</h2>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <p className="text-gray-600">Configure pricing settings for merchants here.</p>
              </div>
            </div>
          );
          
        case 'terminal-configuration':
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Terminal Configuration</h2>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <p className="text-gray-600">Configure terminal and POS settings here.</p>
              </div>
            </div>
          );
          
        case 'gateway-mapping':
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Gateway-Acquirer Mapping</h2>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <p className="text-gray-600">Configure routing rules between gateways and acquirers here.</p>
              </div>
            </div>
          );
          
        case 'users':
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Users & Access Control</h2>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <p className="text-gray-600">Manage user roles and permissions here.</p>
              </div>
            </div>
          );
          
        case 'audit-logs':
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <p className="text-gray-600">View system activity and change history here.</p>
              </div>
            </div>
          );
          
        case 'settings':
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <p className="text-gray-600">System settings and configuration options.</p>
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
    } catch (error) {
      console.error('Error rendering tab content:', error);
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Error Loading Content
            </h3>
            <p className="text-gray-600">There was an error loading this section. Please try again.</p>
          </div>
        </div>
      );
    }
  };

  const handleTabClose = (tabId: string) => {
    if (tabId === 'dashboard') return;
    
    const newTabs = openTabs.filter(t => t.id !== tabId);
    setOpenTabs(newTabs);
    
    if (activeTab === tabId) {
      const newActiveTab = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : 'dashboard';
      setActiveTab(newActiveTab);
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
      <div className="h-full flex flex-col -m-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start h-auto p-1 bg-white border-b rounded-none m-0">
            {openTabs.map((tab) => (
              <div key={tab.id} className="flex items-center">
                <TabsTrigger 
                  value={tab.id}
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-b-2 border-transparent data-[state=active]:border-blue-700 rounded-none px-4 py-3"
                >
                  {tab.label}
                </TabsTrigger>
                {tab.id !== 'dashboard' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabClose(tab.id);
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
            <TabsContent key={tab.id} value={tab.id} className="flex-1 mt-0 p-6">
              {renderTabContent(tab)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Index;
