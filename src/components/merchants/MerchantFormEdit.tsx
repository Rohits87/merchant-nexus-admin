
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { useCreateMerchant, useUpdateMerchant, useMerchant, Merchant } from '@/hooks/useMerchants';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type PaymentMethod = Database['public']['Enums']['payment_method'];

interface MerchantFormEditProps {
  merchantId?: string;
  onBack: () => void;
  onSave?: (merchant: Merchant) => void;
}

interface MerchantFormData {
  merchant_id: string;
  merchant_code: string;
  merchant_name: string;
  business_type: string;
  description: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  web_address: string;
  language: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  contact_name: string;
  mobile_number: string;
  fax_number: string;
  email_address: string;
  technical_contact_name: string;
  technical_phone_number: string;
  technical_email_address: string;
  data_encryption_key: string;
  return_url: string;
  callback_url: string;
  payment_methods: PaymentMethod[];
  theme: string;
}

const paymentMethodOptions: { value: PaymentMethod; label: string }[] = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'upi', label: 'UPI' },
  { value: 'wallet', label: 'Digital Wallet' },
  { value: 'net_banking', label: 'Net Banking' },
  { value: 'bnpl', label: 'Buy Now Pay Later' },
];

export const MerchantFormEdit: React.FC<MerchantFormEditProps> = ({ 
  merchantId, 
  onBack, 
  onSave 
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<PaymentMethod[]>([]);
  
  const { data: existingMerchant, isLoading: loadingMerchant } = useMerchant(merchantId || '');
  const createMerchant = useCreateMerchant();
  const updateMerchant = useUpdateMerchant();
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<MerchantFormData>({
    defaultValues: {
      status: 'pending',
      language: 'English',
      theme: 'Default',
      payment_methods: [],
    }
  });

  const isEditing = !!merchantId && merchantId !== 'new';

  useEffect(() => {
    if (existingMerchant && isEditing) {
      reset({
        merchant_id: existingMerchant.merchant_id,
        merchant_code: existingMerchant.merchant_code,
        merchant_name: existingMerchant.merchant_name,
        business_type: existingMerchant.business_type || '',
        description: existingMerchant.description || '',
        status: existingMerchant.status,
        web_address: existingMerchant.web_address || '',
        language: existingMerchant.language || 'English',
        address_line1: existingMerchant.address_line1 || '',
        address_line2: existingMerchant.address_line2 || '',
        address_line3: existingMerchant.address_line3 || '',
        city: existingMerchant.city || '',
        state: existingMerchant.state || '',
        country: existingMerchant.country || '',
        zip_code: existingMerchant.zip_code || '',
        contact_name: existingMerchant.contact_name || '',
        mobile_number: existingMerchant.mobile_number || '',
        fax_number: existingMerchant.fax_number || '',
        email_address: existingMerchant.email_address || '',
        technical_contact_name: existingMerchant.technical_contact_name || '',
        technical_phone_number: existingMerchant.technical_phone_number || '',
        technical_email_address: existingMerchant.technical_email_address || '',
        data_encryption_key: existingMerchant.data_encryption_key || '',
        return_url: existingMerchant.return_url || '',
        callback_url: existingMerchant.callback_url || '',
        payment_methods: existingMerchant.payment_methods || [],
        theme: existingMerchant.theme || 'Default',
      });
      setSelectedPaymentMethods(existingMerchant.payment_methods || []);
    }
  }, [existingMerchant, isEditing, reset]);

  const onSubmit = async (data: MerchantFormData) => {
    try {
      const merchantData = {
        ...data,
        payment_methods: selectedPaymentMethods,
      };

      if (isEditing) {
        const result = await updateMerchant.mutateAsync({
          id: merchantId!,
          ...merchantData,
        });
        toast({
          title: "Success",
          description: "Merchant updated successfully",
        });
        onSave?.(result);
      } else {
        const result = await createMerchant.mutateAsync(merchantData);
        toast({
          title: "Success",
          description: "Merchant created successfully",
        });
        onSave?.(result);
      }
      onBack();
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing ? "Failed to update merchant" : "Failed to create merchant",
        variant: "destructive",
      });
    }
  };

  const handlePaymentMethodChange = (method: PaymentMethod, checked: boolean) => {
    if (checked) {
      setSelectedPaymentMethods(prev => [...prev, method]);
    } else {
      setSelectedPaymentMethods(prev => prev.filter(m => m !== method));
    }
  };

  if (loadingMerchant && isEditing) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Merchant' : 'Add New Merchant'}
          </h2>
          <p className="text-gray-600">
            {isEditing ? 'Update merchant information' : 'Create a new merchant profile'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic merchant details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="merchant_id">Merchant ID *</Label>
                    <Input
                      id="merchant_id"
                      {...register('merchant_id', { required: 'Merchant ID is required' })}
                      error={errors.merchant_id?.message}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="merchant_code">Merchant Code *</Label>
                    <Input
                      id="merchant_code"
                      {...register('merchant_code', { required: 'Merchant Code is required' })}
                      error={errors.merchant_code?.message}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="merchant_name">Business Name *</Label>
                  <Input
                    id="merchant_name"
                    {...register('merchant_name', { required: 'Business Name is required' })}
                    error={errors.merchant_name?.message}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business_type">Business Type</Label>
                    <Input
                      id="business_type"
                      {...register('business_type')}
                      placeholder="e.g., E-commerce, Retail"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={(value) => setValue('status', value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Brief description of the business"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="web_address">Website URL</Label>
                    <Input
                      id="web_address"
                      {...register('web_address')}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select onValueChange={(value) => setValue('language', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Arabic">Arabic</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Address</CardTitle>
                <CardDescription>Complete address information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address_line1">Address Line 1</Label>
                  <Input id="address_line1" {...register('address_line1')} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address_line2">Address Line 2</Label>
                  <Input id="address_line2" {...register('address_line2')} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address_line3">Address Line 3</Label>
                  <Input id="address_line3" {...register('address_line3')} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register('city')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" {...register('state')} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" {...register('country')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip_code">Zip/Postal Code</Label>
                    <Input id="zip_code" {...register('zip_code')} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Primary and technical contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Primary Contact</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact_name">Contact Name</Label>
                      <Input id="contact_name" {...register('contact_name')} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile_number">Mobile Number</Label>
                        <Input id="mobile_number" {...register('mobile_number')} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fax_number">Fax Number</Label>
                        <Input id="fax_number" {...register('fax_number')} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email_address">Email Address</Label>
                      <Input 
                        id="email_address" 
                        type="email" 
                        {...register('email_address')} 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Technical Contact</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="technical_contact_name">Technical Contact Name</Label>
                      <Input id="technical_contact_name" {...register('technical_contact_name')} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="technical_phone_number">Technical Phone Number</Label>
                      <Input id="technical_phone_number" {...register('technical_phone_number')} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="technical_email_address">Technical Email Address</Label>
                      <Input 
                        id="technical_email_address" 
                        type="email" 
                        {...register('technical_email_address')} 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Configuration</CardTitle>
                <CardDescription>Payment methods and technical settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Payment Methods</Label>
                  <p className="text-sm text-gray-600 mb-4">Select the payment methods this merchant will accept</p>
                  <div className="grid grid-cols-2 gap-4">
                    {paymentMethodOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={selectedPaymentMethods.includes(option.value)}
                          onCheckedChange={(checked) => 
                            handlePaymentMethodChange(option.value, checked as boolean)
                          }
                        />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    ))}
                  </div>
                  {selectedPaymentMethods.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Selected methods:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedPaymentMethods.map((method) => (
                          <Badge key={method} variant="secondary">
                            {paymentMethodOptions.find(opt => opt.value === method)?.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="data_encryption_key">Data Encryption Key</Label>
                    <Input 
                      id="data_encryption_key" 
                      {...register('data_encryption_key')}
                      placeholder="Enter encryption key"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="return_url">Return URL</Label>
                    <Input 
                      id="return_url" 
                      {...register('return_url')}
                      placeholder="https://merchant.com/return"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="callback_url">Callback URL</Label>
                    <Input 
                      id="callback_url" 
                      {...register('callback_url')}
                      placeholder="https://merchant.com/callback"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Payment Page Theme</Label>
                    <Select onValueChange={(value) => setValue('theme', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Default">Default</SelectItem>
                        <SelectItem value="Blue">Blue</SelectItem>
                        <SelectItem value="Green">Green</SelectItem>
                        <SelectItem value="Dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Update Merchant' : 'Create Merchant'}
          </Button>
        </div>
      </form>
    </div>
  );
};
