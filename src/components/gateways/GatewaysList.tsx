
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Globe, CreditCard, Smartphone, Wallet, Loader2 } from 'lucide-react';
import { useGateways } from '@/hooks/useGateways';
import { useToast } from '@/hooks/use-toast';

interface GatewaysListProps {
  onGatewaySelect: (gatewayId: string) => void;
  onNewGateway: () => void;
}

export const GatewaysList: React.FC<GatewaysListProps> = ({ onGatewaySelect, onNewGateway }) => {
  const { data: gateways, isLoading, error } = useGateways();
  const { toast } = useToast();

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load gateways",
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

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'credit_card':
      case 'debit_card':
        return <CreditCard className="w-3 h-3" />;
      case 'upi':
        return <Smartphone className="w-3 h-3" />;
      case 'wallet':
      case 'bnpl':
        return <Wallet className="w-3 h-3" />;
      default:
        return <Globe className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Gateways</h2>
          <p className="text-gray-600">Manage payment gateway integrations and configurations</p>
        </div>
        <Button onClick={onNewGateway}>Add New Gateway</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gateway</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Supported Methods</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gateways?.map((gateway) => (
                <TableRow key={gateway.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{gateway.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{gateway.code}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {gateway.supported_methods?.map((method) => (
                        <div key={method} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                          {getMethodIcon(method)}
                          <span>{method.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {gateway.sla_timeout}s timeout
                  </TableCell>
                  <TableCell>
                    <Badge variant={gateway.status === 'active' ? 'default' : 'secondary'}>
                      {gateway.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onGatewaySelect(gateway.id)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => onGatewaySelect(gateway.id)}
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
