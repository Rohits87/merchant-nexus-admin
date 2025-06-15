
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useMerchants } from '@/hooks/useMerchants';
import { useToast } from '@/hooks/use-toast';

interface MerchantsListProps {
  onMerchantSelect: (merchantId: string) => void;
  onNewMerchant: () => void;
}

export const MerchantsList: React.FC<MerchantsListProps> = ({ onMerchantSelect, onNewMerchant }) => {
  const { data: merchants, isLoading, error } = useMerchants();
  const { toast } = useToast();

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load merchants",
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
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {merchants?.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{merchant.merchant_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{merchant.merchant_code}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {merchant.email_address && (
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{merchant.email_address}</span>
                        </div>
                      )}
                      {merchant.mobile_number && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{merchant.mobile_number}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {merchant.city && merchant.country && (
                      <div className="flex items-center space-x-1 text-sm">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{merchant.city}, {merchant.country}</span>
                      </div>
                    )}
                  </TableCell>
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
