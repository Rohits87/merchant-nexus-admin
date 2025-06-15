
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Landmark, Mail, Phone, MapPin, CreditCard, Loader2 } from 'lucide-react';
import { useAcquirers } from '@/hooks/useAcquirers';
import { useToast } from '@/hooks/use-toast';

interface AcquirersListProps {
  onAcquirerSelect: (acquirerId: string) => void;
  onNewAcquirer: () => void;
}

export const AcquirersList: React.FC<AcquirersListProps> = ({ onAcquirerSelect, onNewAcquirer }) => {
  const { data: acquirers, isLoading, error } = useAcquirers();
  const { toast } = useToast();

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load acquirers",
      variant: "destructive",
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
              {acquirers?.map((acquirer) => (
                <TableRow key={acquirer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Landmark className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{acquirer.bank_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{acquirer.acquirer_code}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <CreditCard className="w-3 h-3 text-gray-400" />
                      <span>{acquirer.bin_ranges.join(', ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {acquirer.country && acquirer.currency && (
                      <div className="flex items-center space-x-1 text-sm">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{acquirer.country} - {acquirer.currency}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {acquirer.support_email && (
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{acquirer.support_email}</span>
                        </div>
                      )}
                      {acquirer.support_phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{acquirer.support_phone}</span>
                        </div>
                      )}
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
