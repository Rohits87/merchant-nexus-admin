
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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

  const form = useForm<MerchantFormData>({
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
      const formData = {
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
      };
      form.reset(formData);
      setSelectedPaymentMethods(existingMerchant.payment_methods || []);
    }
  }, [existingMerchant, isEditing, form]);

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <FormField
                      control={form.control}
                      name="merchant_id"
                      rules={{ required: 'Merchant ID is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Merchant ID *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="merchant_code"
                      rules={{ required: 'Merchant Code is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Merchant Code *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="merchant_name"
                    rules={{ required: 'Business Name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="business_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Type</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., E-commerce, Retail" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Brief description of the business" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="web_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Arabic">Arabic</SelectItem>
                              <SelectItem value="French">French</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  <FormField
                    control={form.control}
                    name="address_line1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address_line2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address_line3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 3</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zip_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip/Postal Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      <FormField
                        control={form.control}
                        name="contact_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="mobile_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="fax_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fax Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email_address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Technical Contact</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="technical_contact_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technical Contact Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="technical_phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technical Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="technical_email_address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technical Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                    <FormField
                      control={form.control}
                      name="data_encryption_key"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Encryption Key</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter encryption key" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="return_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Return URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://merchant.com/return" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="callback_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Callback URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://merchant.com/callback" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Page Theme</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select theme" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Default">Default</SelectItem>
                              <SelectItem value="Blue">Blue</SelectItem>
                              <SelectItem value="Green">Green</SelectItem>
                              <SelectItem value="Dark">Dark</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Update Merchant' : 'Create Merchant'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
