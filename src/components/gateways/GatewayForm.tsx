
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GatewayFormProps {
  activeTab: string;
}

export const GatewayForm: React.FC<GatewayFormProps> = ({ activeTab }) => {
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

  const renderDetailsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Configure technical contact details for the gateway</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Technical Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="technicalContact">Technical Contact Name</Label>
              <Input
                id="technicalContact"
                value={formData.technicalContact}
                onChange={(e) => handleInputChange('technicalContact', e.target.value)}
                placeholder="Technical contact name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technicalPhone">Technical Phone</Label>
              <Input
                id="technicalPhone"
                value={formData.technicalPhone}
                onChange={(e) => handleInputChange('technicalPhone', e.target.value)}
                placeholder="+1-555-123-4567"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="technicalEmail">Technical Email</Label>
            <Input
              id="technicalEmail"
              type="email"
              value={formData.technicalEmail}
              onChange={(e) => handleInputChange('technicalEmail', e.target.value)}
              placeholder="tech@gateway.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Gateway Logo URL (Optional)</Label>
          <Input
            id="logo"
            value={formData.logo}
            onChange={(e) => handleInputChange('logo', e.target.value)}
            placeholder="https://gateway.com/logo.png"
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderTechnicalInfoTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Technical Configuration</CardTitle>
        <CardDescription>Configure API endpoints and security settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">API Endpoints</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authEndpoint">Authorization Endpoint</Label>
              <Input
                id="authEndpoint"
                value={formData.authEndpoint}
                onChange={(e) => handleInputChange('authEndpoint', e.target.value)}
                placeholder="https://api.gateway.com/v1/authorize"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="captureEndpoint">Capture Endpoint</Label>
              <Input
                id="captureEndpoint"
                value={formData.captureEndpoint}
                onChange={(e) => handleInputChange('captureEndpoint', e.target.value)}
                placeholder="https://api.gateway.com/v1/capture"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="refundEndpoint">Refund Endpoint</Label>
              <Input
                id="refundEndpoint"
                value={formData.refundEndpoint}
                onChange={(e) => handleInputChange('refundEndpoint', e.target.value)}
                placeholder="https://api.gateway.com/v1/refund"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reconcileEndpoint">Reconciliation Endpoint</Label>
              <Input
                id="reconcileEndpoint"
                value={formData.reconcileEndpoint}
                onChange={(e) => handleInputChange('reconcileEndpoint', e.target.value)}
                placeholder="https://api.gateway.com/v1/reconcile"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Security Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                placeholder="Enter API key"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secretKey">Secret Key</Label>
              <Input
                id="secretKey"
                type="password"
                value={formData.secretKey}
                onChange={(e) => handleInputChange('secretKey', e.target.value)}
                placeholder="Enter secret key"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              value={formData.webhookUrl}
              onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
              placeholder="https://your-app.com/webhook"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'details':
        return renderDetailsTab();
      case 'technical-info':
        return renderTechnicalInfoTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Gateway</Button>
      </div>
    </div>
  );
};
