import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AcquirerFormProps {
  acquirerId?: string;
}

export const AcquirerForm: React.FC<AcquirerFormProps> = ({ acquirerId }) => {
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

  return (
    <div className="space-y-6">
      {renderOverviewTab()}
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Acquirer</Button>
      </div>
    </div>
  );
};
