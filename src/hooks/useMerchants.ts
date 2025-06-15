
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type PaymentMethod = Database['public']['Enums']['payment_method'];

export interface Merchant {
  id: string;
  merchant_id: string;
  merchant_code: string;
  merchant_name: string;
  business_type?: string;
  description?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  web_address?: string;
  language?: string;
  address_line1?: string;
  address_line2?: string;
  address_line3?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  contact_name?: string;
  mobile_number?: string;
  fax_number?: string;
  email_address?: string;
  technical_contact_name?: string;
  technical_phone_number?: string;
  technical_email_address?: string;
  data_encryption_key?: string;
  return_url?: string;
  callback_url?: string;
  payment_methods?: PaymentMethod[] | null;
  theme?: string;
  created_at: string;
  updated_at: string;
}

export const useMerchants = () => {
  return useQuery({
    queryKey: ['merchants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Merchant[];
    },
  });
};

export const useMerchant = (id: string) => {
  return useQuery({
    queryKey: ['merchant', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Merchant;
    },
    enabled: !!id,
  });
};

export const useCreateMerchant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (merchant: Omit<Merchant, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('merchants')
        .insert(merchant)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchants'] });
    },
  });
};

export const useUpdateMerchant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Merchant> & { id: string }) => {
      const { data, error } = await supabase
        .from('merchants')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['merchants'] });
      queryClient.invalidateQueries({ queryKey: ['merchant', data.id] });
    },
  });
};
