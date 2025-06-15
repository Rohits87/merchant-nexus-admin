
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Mail, Phone, CreditCard, Smartphone, Wallet } from 'lucide-react';

const mockGateways = [
  {
    id: '1',
    name: 'Stripe Gateway',
    code: 'STRIPE',
    supportedMethods: ['Credit Card', 'Debit Card', 'Wallet'],
    endpoints: {
      auth: 'https://api.stripe.com/v1/charges',
      capture: 'https://api.stripe.com/v1/charges/:id/capture',
      refund: 'https://api.stripe.com/v1/refunds'
    },
    status: 'active',
    slaTimeout: 30
  },
  {
    id: '2',
    name: 'PayPal Gateway',
    code: 'PAYPAL',
    supportedMethods: ['Credit Card', 'PayPal', 'BNPL'],
    endpoints: {
      auth: 'https://api.paypal.com/v2/payments',
      capture: 'https://api.paypal.com/v2/payments/:id/capture',
      refund: 'https://api.paypal.com/v2/payments/:id/refund'
    },
    status: 'active',
    slaTimeout: 45
  },
  {
    id: '3',
    name: 'Local Bank Gateway',
    code: 'LBG',
    supportedMethods: ['Credit Card', 'Debit Card', 'Net Banking'],
    endpoints: {
      auth: 'https://gateway.localbank.com/auth',
      capture: 'https://gateway.localbank.com/capture',
      refund: 'https://gateway.localbank.com/refund'
    },
    status: 'inactive',
    slaTimeout: 60
  }
];

interface GatewaysListProps {
  onGatewaySelect: (gatewayId: string) => void;
  onNewGateway: () => void;
}

export const GatewaysList: React.FC<GatewaysListProps> = ({ onGatewaySelect, onNewGateway }) => {
  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'credit card':
      case 'debit card':
        return <CreditCard className="w-3 h-3" />;
      case 'upi':
        return <Smartphone className="w-3 h-3" />;
      case 'wallet':
      case 'paypal':
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGateways.map((gateway) => (
          <Card key={gateway.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <CardTitle className="text-lg">{gateway.name}</CardTitle>
                </div>
                <Badge variant={gateway.status === 'active' ? 'default' : 'secondary'}>
                  {gateway.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Code: {gateway.code}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Supported Methods:</p>
                <div className="flex flex-wrap gap-1">
                  {gateway.supportedMethods.map((method) => (
                    <div key={method} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                      {getMethodIcon(method)}
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>SLA: {gateway.slaTimeout}s timeout</p>
              </div>
              <div className="pt-3 border-t">
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
