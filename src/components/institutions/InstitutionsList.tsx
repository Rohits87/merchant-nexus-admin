
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

const mockInstitutions = [
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

interface InstitutionsListProps {
  onInstitutionSelect: (institutionId: string) => void;
  onNewInstitution: () => void;
}

export const InstitutionsList: React.FC<InstitutionsListProps> = ({ onInstitutionSelect, onNewInstitution }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Institutions</h2>
          <p className="text-gray-600">Manage your financial institutions and configurations</p>
        </div>
        <Button onClick={onNewInstitution}>Add New Institution</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInstitutions.map((institution) => (
          <Card key={institution.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{institution.name}</CardTitle>
                </div>
                <Badge variant={institution.status === 'active' ? 'default' : 'secondary'}>
                  {institution.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{institution.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{institution.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{institution.location}</span>
              </div>
              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500">Last login: {institution.lastLogin}</p>
                <div className="flex space-x-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onInstitutionSelect(institution.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => onInstitutionSelect(institution.id)}
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
