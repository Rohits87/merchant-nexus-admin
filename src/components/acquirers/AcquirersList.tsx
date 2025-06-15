
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Landmark, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const mockAcquirers = [
  {
    id: '1',
    bankName: 'Emirates NBD',
    acquirerCode: 'ENBD',
    binRanges: ['400000-499999', '520000-529999'],
    country: 'UAE',
    currency: 'AED',
    supportEmail: 'support@emiratesnbd.com',
    supportPhone: '+971-4-123-4567',
    status: 'active'
  },
  {
    id: '2',
    bankName: 'ADCB Bank',
    acquirerCode: 'ADCB',
    binRanges: ['450000-459999'],
    country: 'UAE',
    currency: 'AED',
    supportEmail: 'support@adcb.com',
    supportPhone: '+971-2-123-4567',
    status: 'active'
  },
  {
    id: '3',
    bankName: 'FAB Bank',
    acquirerCode: 'FAB',
    binRanges: ['480000-489999'],
    country: 'UAE',
    currency: 'AED',
    supportEmail: 'support@bankfab.com',
    supportPhone: '+971-4-987-6543',
    status: 'inactive'
  }
];

interface AcquirersListProps {
  onAcquirerSelect: (acquirerId: string) => void;
  onNewAcquirer: () => void;
}

export const AcquirersList: React.FC<AcquirersListProps> = ({ onAcquirerSelect, onNewAcquirer }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Acquirer Banks</h2>
          <p className="text-gray-600">Manage acquiring bank partnerships and configurations</p>
        </div>
        <Button onClick={onNewAcquirer}>Add New Acquirer</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAcquirers.map((acquirer) => (
          <Card key={acquirer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Landmark className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-lg">{acquirer.bankName}</CardTitle>
                </div>
                <Badge variant={acquirer.status === 'active' ? 'default' : 'secondary'}>
                  {acquirer.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Code: {acquirer.acquirerCode}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>BIN: {acquirer.binRanges.join(', ')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{acquirer.country} - {acquirer.currency}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{acquirer.supportEmail}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{acquirer.supportPhone}</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onAcquirerSelect(acquirer.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => onAcquirerSelect(acquirer.id)}
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
