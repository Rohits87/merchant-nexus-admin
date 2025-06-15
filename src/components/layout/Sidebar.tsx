
import React from 'react';
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
  FileText
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  group?: string;
  subItems?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  {
    id: 'merchants', label: 'Merchants', icon: Building,
    subItems: [
      { id: 'all-merchants', label: 'All Merchants' },
      { id: 'pricing-configuration', label: 'Pricing Configuration' },
      { id: 'terminal-configuration', label: 'Terminal Configuration' },
    ]
  },
  {
    id: 'pg-config', label: 'PG Config', icon: BarChart3,
    subItems: [
      { id: 'acquirer-banks', label: 'Acquirer Banks', icon: Landmark },
      { id: 'payment-gateways', label: 'Payment Gateways', icon: Globe },
    ]
  },
  { id: 'gateway-mapping', label: 'Gateway Mapping', icon: ArrowRightLeft },
  { id: 'users', label: 'Users & Access', icon: Users },
  { id: 'audit-logs', label: 'Audit Logs', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string, parentId?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSectionChange
}) => {
  // Helper to determine if parent is active (if currentSection matches any subItem)
  const isParentActive = (item: SidebarItem) => {
    if (item.id === currentSection) return true;
    if (item.subItems) {
      return !!item.subItems.find(sub => sub.id === currentSection);
    }
    return false;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
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
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isParentActive(item);
            return (
              <li key={item.id}>
                {/* Main Nav Item */}
                <div>
                  <button
                    onClick={() => {
                      if (item.subItems && item.id !== 'pg-config') {
                        // Expand/collapse handled by subItems below
                        return;
                      }
                      if (!item.subItems) {
                        onSectionChange(item.id);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      active
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {Icon && <Icon className={`w-5 h-5 ${active ? 'text-blue-700' : 'text-gray-400'}`} />}
                    <span className="font-medium">{item.label}</span>
                  </button>
                </div>
                {/* Submenus (for Merchants and PG Config) */}
                {item.subItems && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {item.subItems.map(sub => {
                      // highlight if currentSection matches sub.id
                      const subActive = currentSection === sub.id;
                      const SubIcon = sub.icon;
                      return (
                        <li key={sub.id}>
                          <button
                            onClick={() => onSectionChange(sub.id, item.id)}
                            className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded text-left transition-colors text-sm ${
                              subActive
                                ? 'bg-blue-100 text-blue-800 font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {SubIcon && <SubIcon className="w-4 h-4 mr-1" />}
                            <span>{sub.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  );
};
