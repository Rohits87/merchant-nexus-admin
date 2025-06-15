
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

const mockMerchants = [
  {
    id: '100',
    name: 'Tech Solutions Ltd',
    email: 'admin@techsolutions.com',
    phone: '0553105754',
    location: 'Abu Dhabi, UAE',
    status: 'active',
    lastLogin: '2024-06-14',
    merchantCode: 'TECH001'
  },
  {
    id: '101',
    name: 'E-Commerce Store',
    email: 'admin@ecommerce.com',
    phone: '0501234567',
    location: 'Dubai, UAE',
    status: 'active',
    lastLogin: '2024-06-13',
    merchantCode: 'ECOM001'
  },
  {
    id: '102',
    name: 'Retail Chain',
    email: 'admin@retailchain.com',
    phone: '0507654321',
    location: 'Dubai, UAE',
    status: 'inactive',
    lastLogin: '2024-06-10',
    merchantCode: 'RETAIL001'
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
          <p className="text-gray-600">Manage merchant onboarding and configurations</p>
        </div>
        <Button onClick={onNewMerchant}>Add New Merchant</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMerchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{merchant.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{merchant.merchantCode}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>{merchant.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{merchant.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{merchant.location}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{merchant.lastLogin}</TableCell>
                  <TableCell>
                    <Badge variant={merchant.status === 'active' ? 'default' : 'secondary'}>
                      {merchant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
