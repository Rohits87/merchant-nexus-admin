
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MerchantFormProps {
  activeTab: string;
}

export const MerchantForm: React.FC<MerchantFormProps> = ({ activeTab }) => {
  const [formData, setFormData] = useState({
    // Institution data
    merchantId: '',
    merchantName: '',
    businessType: '',
    merchantCode: '',
    description: '',
    enableStatus: 'active',
    webAddress: '',
    language: 'english',
    
    // Address data
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    
    // Contact data
    contactName: '',
    mobileNumber: '',
    faxNumber: '',
    emailAddress: '',
    technicalContactName: '',
    technicalPhoneNumber: '',
    technicalEmailAddress: '',
    
    // Configuration data
    dataEncryptionKey: '',
    returnUrl: '',
    callbackUrl: '',
    paymentMethods: [] as string[],
    theme: 'default'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: checked 
        ? [...prev.paymentMethods, method]
        : prev.paymentMethods.filter(m => m !== method)
    }));
  };

  const renderInstitutionTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Merchant Information</CardTitle>
        <CardDescription>Configure basic merchant details for onboarding</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="merchantId">Merchant ID</Label>
            <Input
              id="merchantId"
              value={formData.merchantId}
              onChange={(e) => handleInputChange('merchantId', e.target.value)}
              placeholder="MERCH001"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="merchantCode">Merchant Code</Label>
            <Input
              id="merchantCode"
              value={formData.merchantCode}
              onChange={(e) => handleInputChange('merchantCode', e.target.value)}
              placeholder="TECH001"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchantName">Business Name</Label>
          <Input
            id="merchantName"
            value={formData.merchantName}
            onChange={(e) => handleInputChange('merchantName', e.target.value)}
            placeholder="Tech Solutions Ltd"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of the business"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="enableStatus">Status</Label>
            <Select value={formData.enableStatus} onValueChange={(value) => handleInputChange('enableStatus', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="webAddress">Website URL</Label>
          <Input
            id="webAddress"
            value={formData.webAddress}
            onChange={(e) => handleInputChange('webAddress', e.target.value)}
            placeholder="https://example.com"
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderAddressTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Business Address</CardTitle>
        <CardDescription>Configure merchant address details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input
              id="addressLine1"
              value={formData.addressLine1}
              onChange={(e) => handleInputChange('addressLine1', e.target.value)}
              placeholder="Street address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              value={formData.addressLine2}
              onChange={(e) => handleInputChange('addressLine2', e.target.value)}
              placeholder="Apartment, suite, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine3">Address Line 3</Label>
            <Input
              id="addressLine3"
              value={formData.addressLine3}
              onChange={(e) => handleInputChange('addressLine3', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="State or Province"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="zipCode">Zip/Postal Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="Zip code"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContactTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Configure primary and technical contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Primary Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                placeholder="Contact person name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                placeholder="Mobile number"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="faxNumber">Fax Number</Label>
              <Input
                id="faxNumber"
                value={formData.faxNumber}
                onChange={(e) => handleInputChange('faxNumber', e.target.value)}
                placeholder="Fax number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                placeholder="contact@business.com"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Technical Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="technicalContactName">Technical Contact Name</Label>
              <Input
                id="technicalContactName"
                value={formData.technicalContactName}
                onChange={(e) => handleInputChange('technicalContactName', e.target.value)}
                placeholder="Technical contact name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technicalPhoneNumber">Technical Phone Number</Label>
              <Input
                id="technicalPhoneNumber"
                value={formData.technicalPhoneNumber}
                onChange={(e) => handleInputChange('technicalPhoneNumber', e.target.value)}
                placeholder="Technical phone number"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="technicalEmailAddress">Technical Email Address</Label>
            <Input
              id="technicalEmailAddress"
              type="email"
              value={formData.technicalEmailAddress}
              onChange={(e) => handleInputChange('technicalEmailAddress', e.target.value)}
              placeholder="tech@business.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderConfigurationTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Payment Configuration</CardTitle>
        <CardDescription>Configure payment features and settings for the merchant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dataEncryptionKey">Data Encryption Key</Label>
            <Input
              id="dataEncryptionKey"
              value={formData.dataEncryptionKey}
              onChange={(e) => handleInputChange('dataEncryptionKey', e.target.value)}
              placeholder="Encryption key"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="returnUrl">Return URL</Label>
              <Input
                id="returnUrl"
                value={formData.returnUrl}
                onChange={(e) => handleInputChange('returnUrl', e.target.value)}
                placeholder="https://merchant.com/return"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="callbackUrl">Callback URL</Label>
              <Input
                id="callbackUrl"
                value={formData.callbackUrl}
                onChange={(e) => handleInputChange('callbackUrl', e.target.value)}
                placeholder="https://merchant.com/callback"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet', 'BNPL'].map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id={method}
                  checked={formData.paymentMethods.includes(method)}
                  onChange={(e) => handlePaymentMethodChange(method, e.target.checked)}
                  className="rounded" 
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="theme">Payment Page Theme</Label>
          <Select value={formData.theme} onValueChange={(value) => handleInputChange('theme', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="branded">Branded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'institution':
        return renderInstitutionTab();
      case 'address':
        return renderAddressTab();
      case 'contact':
        return renderContactTab();
      case 'configuration':
        return renderConfigurationTab();
      default:
        return renderInstitutionTab();
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Merchant</Button>
      </div>
    </div>
  );
};
