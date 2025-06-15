
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
    institutionId: '',
    institutionName: '',
    description: '',
    institutionUserId: '',
    userRole: '',
    enableStatus: 'active',
    webAddress: '',
    dataEncryptionKey: '',
    language: 'english',
    numberOfUsersAllowed: '',
    
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
    technicalEmailAddress: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderInstitutionTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Institution Information</CardTitle>
        <CardDescription>Configure basic institution details and settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="institutionId">Institution ID</Label>
            <Input
              id="institutionId"
              value={formData.institutionId}
              onChange={(e) => handleInputChange('institutionId', e.target.value)}
              placeholder="100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="institutionName">Institution Name</Label>
            <Input
              id="institutionName"
              value={formData.institutionName}
              onChange={(e) => handleInputChange('institutionName', e.target.value)}
              placeholder="FAB BANK"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="FAB BANK"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="institutionUserId">Institution User ID</Label>
            <Input
              id="institutionUserId"
              value={formData.institutionUserId}
              onChange={(e) => handleInputChange('institutionUserId', e.target.value)}
              placeholder="FABUSER"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userRole">User Role</Label>
            <Select value={formData.userRole} onValueChange={(value) => handleInputChange('userRole', value)}>
              <SelectTrigger>
                <SelectValue placeholder="INSTITUTION ADMIN" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">INSTITUTION ADMIN</SelectItem>
                <SelectItem value="user">USER</SelectItem>
                <SelectItem value="viewer">VIEWER</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="enableStatus">Enable Status</Label>
            <Select value={formData.enableStatus} onValueChange={(value) => handleInputChange('enableStatus', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="webAddress">Web Address</Label>
            <Input
              id="webAddress"
              value={formData.webAddress}
              onChange={(e) => handleInputChange('webAddress', e.target.value)}
              placeholder="https://fabpaybankortal.bankfab.com/BNKPTI"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="space-y-2">
            <Label htmlFor="numberOfUsersAllowed">Number of Users Allowed</Label>
            <Input
              id="numberOfUsersAllowed"
              value={formData.numberOfUsersAllowed}
              onChange={(e) => handleInputChange('numberOfUsersAllowed', e.target.value)}
              placeholder="100"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAddressTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Address Information</CardTitle>
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
              placeholder="Tourist Club Area"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              value={formData.addressLine2}
              onChange={(e) => handleInputChange('addressLine2', e.target.value)}
              placeholder="Salim Street"
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
              placeholder="ADNEC"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="Abu Dhabi"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger>
                <SelectValue placeholder="UAE" />
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
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="00124"
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
                placeholder="Priyanka"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                placeholder="0553105754"
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
                placeholder="2567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                placeholder="Munisha.Misapple@bankfab.com"
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
                placeholder="Admin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technicalPhoneNumber">Technical Phone Number</Label>
              <Input
                id="technicalPhoneNumber"
                value={formData.technicalPhoneNumber}
                onChange={(e) => handleInputChange('technicalPhoneNumber', e.target.value)}
                placeholder="0553105754"
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
              placeholder="Priyanka.Rajashekharam@bankfab.com"
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
        <CardDescription>Configure payment page features and settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dataEncryptionKey">Data Encryption Key</Label>
            <Input
              id="dataEncryptionKey"
              value={formData.dataEncryptionKey}
              onChange={(e) => handleInputChange('dataEncryptionKey', e.target.value)}
              placeholder="dFjL8JHmLw7_x0m"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="enablePaymentPage" className="rounded" />
            <Label htmlFor="enablePaymentPage">Enable Payment Page</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="enableRecurringPayments" className="rounded" />
            <Label htmlFor="enableRecurringPayments">Enable Recurring Payments</Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="enableRefunds" className="rounded" />
            <Label htmlFor="enableRefunds">Enable Refunds</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="enableTokenization" className="rounded" />
            <Label htmlFor="enableTokenization">Enable Tokenization</Label>
          </div>
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
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};
