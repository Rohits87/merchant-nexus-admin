import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MerchantFormProps {
  id?: string;
}

export const MerchantForm: React.FC<MerchantFormProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState('institution');

  // Mock data for demonstration
  const merchantData = {
    // Institution data
    merchantId: id || 'MERCH001',
    merchantName: 'Tech Solutions Ltd',
    businessType: 'E-commerce',
    merchantCode: 'TECH001',
    description: 'Leading technology solutions provider',
    enableStatus: 'active',
    webAddress: 'https://techsolutions.com',
    language: 'English',
    
    // Address data
    addressLine1: '123 Business Street',
    addressLine2: 'Suite 456',
    addressLine3: 'Business District',
    city: 'Dubai',
    state: 'Dubai',
    country: 'UAE',
    zipCode: '12345',
    
    // Contact data
    contactName: 'John Smith',
    mobileNumber: '+971-50-123-4567',
    faxNumber: '+971-4-123-4567',
    emailAddress: 'contact@techsolutions.com',
    technicalContactName: 'Jane Doe',
    technicalPhoneNumber: '+971-50-987-6543',
    technicalEmailAddress: 'tech@techsolutions.com',
    
    // Configuration data
    dataEncryptionKey: 'ENC_KEY_2024_001',
    returnUrl: 'https://techsolutions.com/return',
    callbackUrl: 'https://techsolutions.com/callback',
    paymentMethods: ['Credit Card', 'Debit Card', 'UPI', 'Wallet'],
    theme: 'Default'
  };

  const renderInstitutionTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Merchant Information</CardTitle>
        <CardDescription>Basic merchant details and business information</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Merchant ID</TableCell>
              <TableCell>{merchantData.merchantId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Merchant Code</TableCell>
              <TableCell>{merchantData.merchantCode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Business Name</TableCell>
              <TableCell>{merchantData.merchantName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Business Type</TableCell>
              <TableCell>{merchantData.businessType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Description</TableCell>
              <TableCell>{merchantData.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Status</TableCell>
              <TableCell>
                <Badge variant={merchantData.enableStatus === 'active' ? 'default' : 'secondary'}>
                  {merchantData.enableStatus}
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Language</TableCell>
              <TableCell>{merchantData.language}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Website URL</TableCell>
              <TableCell>
                <a href={merchantData.webAddress} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {merchantData.webAddress}
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderAddressTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Business Address</CardTitle>
        <CardDescription>Complete address details for the merchant</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Address Line 1</TableCell>
              <TableCell>{merchantData.addressLine1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Address Line 2</TableCell>
              <TableCell>{merchantData.addressLine2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Address Line 3</TableCell>
              <TableCell>{merchantData.addressLine3}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">City</TableCell>
              <TableCell>{merchantData.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">State/Province</TableCell>
              <TableCell>{merchantData.state}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Country</TableCell>
              <TableCell>{merchantData.country}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Zip/Postal Code</TableCell>
              <TableCell>{merchantData.zipCode}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderContactTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Primary and technical contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Contact</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Contact Name</TableCell>
                <TableCell>{merchantData.contactName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mobile Number</TableCell>
                <TableCell>{merchantData.mobileNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fax Number</TableCell>
                <TableCell>{merchantData.faxNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email Address</TableCell>
                <TableCell>
                  <a href={`mailto:${merchantData.emailAddress}`} className="text-blue-600 hover:underline">
                    {merchantData.emailAddress}
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Contact</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Technical Contact Name</TableCell>
                <TableCell>{merchantData.technicalContactName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Technical Phone Number</TableCell>
                <TableCell>{merchantData.technicalPhoneNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Technical Email Address</TableCell>
                <TableCell>
                  <a href={`mailto:${merchantData.technicalEmailAddress}`} className="text-blue-600 hover:underline">
                    {merchantData.technicalEmailAddress}
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  const renderConfigurationTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Payment Configuration</CardTitle>
        <CardDescription>Payment features and technical settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Data Encryption Key</TableCell>
              <TableCell className="font-mono text-sm">{merchantData.dataEncryptionKey}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Return URL</TableCell>
              <TableCell>
                <a href={merchantData.returnUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {merchantData.returnUrl}
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Callback URL</TableCell>
              <TableCell>
                <a href={merchantData.callbackUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {merchantData.callbackUrl}
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Payment Methods</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {merchantData.paymentMethods.map((method) => (
                    <Badge key={method} variant="outline" className="text-xs">
                      {method}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Payment Page Theme</TableCell>
              <TableCell>{merchantData.theme}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institution">Institution</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value="institution" className="mt-6">
          {renderInstitutionTab()}
        </TabsContent>
        <TabsContent value="address" className="mt-6">
          {renderAddressTab()}
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
          {renderContactTab()}
        </TabsContent>
        <TabsContent value="configuration" className="mt-6">
          {renderConfigurationTab()}
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Edit</Button>
        <Button>Export</Button>
      </div>
    </div>
  );
};
