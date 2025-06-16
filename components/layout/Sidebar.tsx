'use client'

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
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSectionChange,
  onClose
}) => {
  // Helper to determine if parent is active (if currentSection matches any subItem)
  const isParentActive = (item: SidebarItem) => {
    if (item.id === currentSection) return true;
    if (item.subItems) {
      return !!item.subItems.find(sub => sub.id === currentSection);
    }
    return false;
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.subItems && item.id !== 'pg-config') {
      // Expand/collapse handled by subItems below
      return;
    }
    if (!item.subItems) {
      onSectionChange(item.id);
      onClose?.();
    }
  };

  const handleSubItemClick = (subItem: SidebarItem, parentItem: SidebarItem) => {
    onSectionChange(subItem.id, parentItem.id);
    onClose?.();
  };

  return (
    <div className="sidebar p-3">
      {/* Logo */}
      <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
        <div className="bg-primary rounded d-flex align-items-center justify-content-center me-2" 
             style={{ width: '32px', height: '32px' }}>
          <CreditCard size={20} className="text-white" />
        </div>
        <div>
          <h5 className="mb-0 fw-bold text-dark">PaymentHub</h5>
          <small className="text-muted">Admin Portal</small>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="list-unstyled">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isParentActive(item);
            
            return (
              <li key={item.id} className="mb-1">
                {/* Main Nav Item */}
                <button
                  onClick={() => handleItemClick(item)}
                  className={`btn w-100 text-start d-flex align-items-center sidebar-item ${
                    active ? 'active' : ''
                  }`}
                  style={{ 
                    border: 'none',
                    background: 'none',
                    padding: '0.75rem',
                    borderRadius: '0.375rem'
                  }}
                >
                  {Icon && <Icon size={20} className="me-3" />}
                  <span className="fw-medium">{item.label}</span>
                </button>

                {/* Submenus */}
                {item.subItems && (
                  <ul className="list-unstyled ms-4 mt-1">
                    {item.subItems.map(sub => {
                      const subActive = currentSection === sub.id;
                      const SubIcon = sub.icon;
                      
                      return (
                        <li key={sub.id}>
                          <button
                            onClick={() => handleSubItemClick(sub, item)}
                            className={`btn w-100 text-start d-flex align-items-center sidebar-item ${
                              subActive ? 'active' : ''
                            }`}
                            style={{ 
                              border: 'none',
                              background: 'none',
                              padding: '0.5rem 0.75rem',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem'
                            }}
                          >
                            {SubIcon && <SubIcon size={16} className="me-2" />}
                            <span>{sub.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};