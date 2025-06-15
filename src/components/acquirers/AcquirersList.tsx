
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>BIN Ranges</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAcquirers.map((acquirer) => (
                <TableRow key={acquirer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Landmark className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{acquirer.bankName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{acquirer.acquirerCode}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <CreditCard className="w-3 h-3 text-gray-400" />
                      <span>{acquirer.binRanges.join(', ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{acquirer.country} - {acquirer.currency}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>{acquirer.supportEmail}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{acquirer.supportPhone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={acquirer.status === 'active' ? 'default' : 'secondary'}>
                      {acquirer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
