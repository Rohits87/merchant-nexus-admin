
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Edit, ArrowLeft } from 'lucide-react';
import { useMerchant } from '@/hooks/useMerchants';
import { useToast } from '@/hooks/use-toast';

interface MerchantFormProps {
  id?: string;
  onEdit?: () => void;
  onBack?: () => void;
}

export const MerchantForm: React.FC<MerchantFormProps> = ({ id, onEdit, onBack }) => {
  const [activeTab, setActiveTab] = useState('institution');
  const { data: merchant, isLoading, error } = useMerchant(id || '');
  const { toast } = useToast();

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load merchant details",
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

  if (!merchant) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Merchant not found</p>
      </div>
    );
  }

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
              <TableCell>{merchant.merchant_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Merchant Code</TableCell>
              <TableCell>{merchant.merchant_code}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Business Name</TableCell>
              <TableCell>{merchant.merchant_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Business Type</TableCell>
              <TableCell>{merchant.business_type || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Description</TableCell>
              <TableCell>{merchant.description || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Status</TableCell>
              <TableCell>
                <Badge variant={merchant.status === 'active' ? 'default' : 'secondary'}>
                  {merchant.status}
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Language</TableCell>
              <TableCell>{merchant.language || 'N/A'}</TableCell>
            </TableRow>
            {merchant.web_address && (
              <TableRow>
                <TableCell className="font-medium">Website URL</TableCell>
                <TableCell>
                  <a href={merchant.web_address} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {merchant.web_address}
                  </a>
                </TableCell>
              </TableRow>
            )}
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
              <TableCell>{merchant.address_line1 || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Address Line 2</TableCell>
              <TableCell>{merchant.address_line2 || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Address Line 3</TableCell>
              <TableCell>{merchant.address_line3 || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">City</TableCell>
              <TableCell>{merchant.city || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">State/Province</TableCell>
              <TableCell>{merchant.state || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Country</TableCell>
              <TableCell>{merchant.country || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Zip/Postal Code</TableCell>
              <TableCell>{merchant.zip_code || 'N/A'}</TableCell>
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
                <TableCell>{merchant.contact_name || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mobile Number</TableCell>
                <TableCell>{merchant.mobile_number || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fax Number</TableCell>
                <TableCell>{merchant.fax_number || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email Address</TableCell>
                <TableCell>
                  {merchant.email_address ? (
                    <a href={`mailto:${merchant.email_address}`} className="text-blue-600 hover:underline">
                      {merchant.email_address}
                    </a>
                  ) : 'N/A'}
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
                <TableCell>{merchant.technical_contact_name || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Technical Phone Number</TableCell>
                <TableCell>{merchant.technical_phone_number || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Technical Email Address</TableCell>
                <TableCell>
                  {merchant.technical_email_address ? (
                    <a href={`mailto:${merchant.technical_email_address}`} className="text-blue-600 hover:underline">
                      {merchant.technical_email_address}
                    </a>
                  ) : 'N/A'}
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
              <TableCell className="font-mono text-sm">{merchant.data_encryption_key || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Return URL</TableCell>
              <TableCell>
                {merchant.return_url ? (
                  <a href={merchant.return_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {merchant.return_url}
                  </a>
                ) : 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Callback URL</TableCell>
              <TableCell>
                {merchant.callback_url ? (
                  <a href={merchant.callback_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {merchant.callback_url}
                  </a>
                ) : 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Payment Methods</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {merchant.payment_methods && merchant.payment_methods.length > 0 ? (
                    merchant.payment_methods.map((method) => (
                      <Badge key={method} variant="outline" className="text-xs">
                        {method.replace('_', ' ')}
                      </Badge>
                    ))
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Payment Page Theme</TableCell>
              <TableCell>{merchant.theme || 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {onBack && (
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
        </div>
      )}

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
        {onEdit && (
          <Button onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
        <Button variant="outline">Export</Button>
      </div>
    </div>
  );
};
