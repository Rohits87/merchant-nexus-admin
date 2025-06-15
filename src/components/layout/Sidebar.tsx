import React, { useState } from 'react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings,
  Building,
  Landmark,
  Globe,
  ArrowRightLeft,
  FileText,
  ArrowDown,
  ArrowUp,
  Plus,
} from 'lucide-react';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string, parentId?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSectionChange,
}) => {
  // Control collapse for groups
  const [openMerchants, setOpenMerchants] = useState<boolean>(true);
  const [openPG, setOpenPG] = useState<boolean>(true);

  // Helper for active state
  const isSubActive = (ids: string[]) => ids.some(id => currentSection === id);

  return (
    <SidebarProvider>
      <div className="relative min-h-screen">
        {/* Sidebar collapse trigger (top-left) */}
        <SidebarTrigger className="absolute top-2 right-[-1.5rem] z-20" />

        <ShadcnSidebar className="bg-white border-r border-gray-200 shadow-sm w-64">
          <SidebarContent>
            {/* TOP LOGO */}
            <div className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">PaymentHub</h1>
                  <p className="text-sm text-gray-500">Admin Portal</p>
                </div>
              </div>
            </div>

            {/* SIDEBAR MAIN MENU */}
            <SidebarMenu className="pt-2">
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentSection === 'dashboard'}
                  onClick={() => onSectionChange('dashboard')}
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Merchants Group */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isSubActive(['all-merchants', 'pricing-configuration', 'terminal-configuration', 'merchant-form-new'])}
                  onClick={() => setOpenMerchants((o) => !o)}
                >
                  <Building className="w-5 h-5" />
                  <span>Merchants</span>
                  {openMerchants ? (
                    <ArrowUp className="w-4 h-4 ml-auto" />
                  ) : (
                    <ArrowDown className="w-4 h-4 ml-auto" />
                  )}
                </SidebarMenuButton>
                {openMerchants && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={currentSection === 'all-merchants'}
                        onClick={() => onSectionChange('all-merchants', 'merchants')}
                      >
                        All Merchants
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={currentSection === 'pricing-configuration'}
                        onClick={() => onSectionChange('pricing-configuration', 'merchants')}
                      >
                        Pricing Configuration
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={currentSection === 'terminal-configuration'}
                        onClick={() => onSectionChange('terminal-configuration', 'merchants')}
                      >
                        Terminal Configuration
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {/* Add New Merchant */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={currentSection === 'merchant-form-new'}
                        onClick={() => onSectionChange('merchant-form-new', 'merchants')}
                        className="text-green-700 font-semibold"
                      >
                        <Plus className="w-4 h-4 mr-1" /> New Merchant
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* PG Config Group */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isSubActive(['acquirer-banks', 'payment-gateways', 'gateway-form-new'])}
                  onClick={() => setOpenPG((o) => !o)}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>PG Config</span>
                  {openPG ? (
                    <ArrowUp className="w-4 h-4 ml-auto" />
                  ) : (
                    <ArrowDown className="w-4 h-4 ml-auto" />
                  )}
                </SidebarMenuButton>
                {openPG && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={currentSection === 'acquirer-banks'}
                        onClick={() => onSectionChange('acquirer-banks', 'pg-config')}
                      >
                        <Landmark className="w-4 h-4 mr-1" />
                        Acquirer Banks
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={currentSection === 'payment-gateways'}
                        onClick={() => onSectionChange('payment-gateways', 'pg-config')}
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        Payment Gateways
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {/* Add New PG/Gateway */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={currentSection === 'gateway-form-new'}
                        onClick={() => onSectionChange('gateway-form-new', 'pg-config')}
                        className="text-green-700 font-semibold"
                      >
                        <Plus className="w-4 h-4 mr-1" /> New Gateway
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* Other sections */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentSection === 'gateway-mapping'}
                  onClick={() => onSectionChange('gateway-mapping')}
                >
                  <ArrowRightLeft className="w-5 h-5" />
                  <span>Gateway Mapping</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentSection === 'users'}
                  onClick={() => onSectionChange('users')}
                >
                  <Users className="w-5 h-5" />
                  <span>Users & Access</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentSection === 'audit-logs'}
                  onClick={() => onSectionChange('audit-logs')}
                >
                  <FileText className="w-5 h-5" />
                  <span>Audit Logs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentSection === 'settings'}
                  onClick={() => onSectionChange('settings')}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </ShadcnSidebar>
      </div>
    </SidebarProvider>
  );
};
