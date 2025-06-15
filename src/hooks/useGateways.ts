
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type PaymentMethod = Database['public']['Enums']['payment_method'];

export interface Gateway {
  id: string;
  name: string;
  code: string;
  supported_methods: PaymentMethod[] | null;
  auth_endpoint?: string;
  capture_endpoint?: string;
  refund_endpoint?: string;
  status: 'active' | 'inactive' | 'maintenance';
  sla_timeout?: number;
  created_at: string;
  updated_at: string;
}

export const useGateways = () => {
  return useQuery({
    queryKey: ['gateways'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gateways')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Gateway[];
    },
  });
};

export const useGateway = (id: string) => {
  return useQuery({
    queryKey: ['gateway', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gateways')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Gateway;
    },
    enabled: !!id,
  });
};

export const useCreateGateway = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (gateway: Omit<Gateway, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('gateways')
        .insert(gateway)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gateways'] });
    },
  });
};

export const useUpdateGateway = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Gateway> & { id: string }) => {
      const { data, error } = await supabase
        .from('gateways')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['gateways'] });
      queryClient.invalidateQueries({ queryKey: ['gateway', data.id] });
    },
  });
};
