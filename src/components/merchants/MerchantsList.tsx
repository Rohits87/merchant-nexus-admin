
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

const mockMerchants = [
  {
    id: '100',
    name: 'FAB BANK',
    email: 'admin@bankfab.com',
    phone: '0553105754',
    location: 'Abu Dhabi, UAE',
    status: 'active',
    lastLogin: '2024-06-14'
  },
  {
    id: '101',
    name: 'ADCB Bank',
    email: 'admin@adcb.com',
    phone: '0501234567',
    location: 'Dubai, UAE',
    status: 'active',
    lastLogin: '2024-06-13'
  },
  {
    id: '102',
    name: 'Emirates NBD',
    email: 'admin@emiratesnbd.com',
    phone: '0507654321',
    location: 'Dubai, UAE',
    status: 'inactive',
    lastLogin: '2024-06-10'
  }
];

interface MerchantsListProps {
  onMerchantSelect: (merchantId: string) => void;
  onNewMerchant: () => void;
}

export const MerchantsList: React.FC<MerchantsListProps> = ({ onMerchantSelect, onNewMerchant }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Merchants</h2>
          <p className="text-gray-600">Manage your merchant accounts and configurations</p>
        </div>
        <Button onClick={onNewMerchant}>Add New Merchant</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMerchants.map((merchant) => (
          <Card key={merchant.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{merchant.name}</CardTitle>
                </div>
                <Badge variant={merchant.status === 'active' ? 'default' : 'secondary'}>
                  {merchant.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{merchant.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{merchant.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{merchant.location}</span>
              </div>
              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500">Last login: {merchant.lastLogin}</p>
                <div className="flex space-x-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onMerchantSelect(merchant.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => onMerchantSelect(merchant.id)}
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
