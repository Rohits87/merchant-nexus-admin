
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AcquirerFormProps {
  activeTab: string;
}

export const AcquirerForm: React.FC<AcquirerFormProps> = ({ activeTab }) => {
  const [formData, setFormData] = useState({
    bankName: '',
    acquirerCode: '',
    binRanges: '',
    country: '',
    currency: '',
    supportEmail: '',
    supportPhone: '',
    status: 'active',
    description: '',
    slaResponse: '',
    timeoutValue: '',
    technicalContact: '',
    technicalEmail: '',
    technicalPhone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderOverviewTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Acquirer Bank Information</CardTitle>
        <CardDescription>Configure basic acquirer bank details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              placeholder="Emirates NBD"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="acquirerCode">Acquirer Code</Label>
            <Input
              id="acquirerCode"
              value={formData.acquirerCode}
              onChange={(e) => handleInputChange('acquirerCode', e.target.value)}
              placeholder="ENBD"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of the acquirer bank"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="binRanges">BIN Ranges</Label>
          <Input
            id="binRanges"
            value={formData.binRanges}
            onChange={(e) => handleInputChange('binRanges', e.target.value)}
            placeholder="400000-499999, 520000-529999"
          />
          <p className="text-sm text-gray-500">Separate multiple ranges with commas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UAE">UAE</SelectItem>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="SA">Saudi Arabia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AED">AED</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="SAR">SAR</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
        </div>
      </CardContent>
    </Card>
  );

  const renderDetailsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Contact & Support Information</CardTitle>
        <CardDescription>Configure support and contact details for the acquirer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Support Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={formData.supportEmail}
                onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                placeholder="support@bank.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportPhone">Support Phone</Label>
              <Input
                id="supportPhone"
                value={formData.supportPhone}
                onChange={(e) => handleInputChange('supportPhone', e.target.value)}
                placeholder="+971-4-123-4567"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Technical Contact</h3>
          <div className="grid grid-cols-1 md:grid-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="technicalContact">Technical Contact Name</Label>
              <Input
                id="technicalContact"
                value={formData.technicalContact}
                onChange={(e) => handleInputChange('technicalContact', e.target.value)}
                placeholder="Technical contact name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="technicalEmail">Technical Email</Label>
              <Input
                id="technicalEmail"
                type="email"
                value={formData.technicalEmail}
                onChange={(e) => handleInputChange('technicalEmail', e.target.value)}
                placeholder="tech@bank.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technicalPhone">Technical Phone</Label>
              <Input
                id="technicalPhone"
                value={formData.technicalPhone}
                onChange={(e) => handleInputChange('technicalPhone', e.target.value)}
                placeholder="+971-4-123-4567"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTechnicalInfoTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Technical Configuration</CardTitle>
        <CardDescription>Configure technical settings and SLA parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="slaResponse">SLA Response Time (seconds)</Label>
            <Input
              id="slaResponse"
              type="number"
              value={formData.slaResponse}
              onChange={(e) => handleInputChange('slaResponse', e.target.value)}
              placeholder="30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeoutValue">Timeout Value (seconds)</Label>
            <Input
              id="timeoutValue"
              type="number"
              value={formData.timeoutValue}
              onChange={(e) => handleInputChange('timeoutValue', e.target.value)}
              placeholder="60"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Supported Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Authorization', 'Capture', 'Refund', 'Void', 'Recurring', 'Tokenization'].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <input type="checkbox" id={feature} className="rounded" />
                <Label htmlFor={feature}>{feature}</Label>
              </div>
            ))}
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
        <Button>Save Acquirer</Button>
      </div>
    </div>
  );
};
