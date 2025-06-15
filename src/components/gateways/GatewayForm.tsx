
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GatewayFormProps {
  gatewayId?: string;
}

export const GatewayForm: React.FC<GatewayFormProps> = ({ gatewayId }) => {
  const [formData, setFormData] = useState({
    gatewayName: '',
    gatewayCode: '',
    description: '',
    status: 'active',
    supportedMethods: [] as string[],
    authEndpoint: '',
    captureEndpoint: '',
    refundEndpoint: '',
    reconcileEndpoint: '',
    logo: '',
    slaTimeout: '',
    technicalContact: '',
    technicalEmail: '',
    technicalPhone: '',
    apiKey: '',
    secretKey: '',
    webhookUrl: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMethodChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      supportedMethods: checked 
        ? [...prev.supportedMethods, method]
        : prev.supportedMethods.filter(m => m !== method)
    }));
  };

  const renderOverviewTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Gateway Information</CardTitle>
        <CardDescription>Configure basic payment gateway details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gatewayName">Gateway Name</Label>
            <Input
              id="gatewayName"
              value={formData.gatewayName}
              onChange={(e) => handleInputChange('gatewayName', e.target.value)}
              placeholder="Stripe Gateway"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gatewayCode">Gateway Code</Label>
            <Input
              id="gatewayCode"
              value={formData.gatewayCode}
              onChange={(e) => handleInputChange('gatewayCode', e.target.value)}
              placeholder="STRIPE"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of the payment gateway"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="slaTimeout">SLA Timeout (seconds)</Label>
            <Input
              id="slaTimeout"
              type="number"
              value={formData.slaTimeout}
              onChange={(e) => handleInputChange('slaTimeout', e.target.value)}
              placeholder="30"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Supported Payment Methods</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet', 'BNPL', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id={method}
                  checked={formData.supportedMethods.includes(method)}
                  onChange={(e) => handleMethodChange(method, e.target.checked)}
                  className="rounded" 
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderOverviewTab()}
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Gateway</Button>
      </div>
    </div>
  );
};
