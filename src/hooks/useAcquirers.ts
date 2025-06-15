
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Acquirer {
  id: string;
  bank_name: string;
  acquirer_code: string;
  bin_ranges: string[];
  country?: string;
  currency?: string;
  support_email?: string;
  support_phone?: string;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: string;
  updated_at: string;
}

export const useAcquirers = () => {
  return useQuery({
    queryKey: ['acquirers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('acquirers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Acquirer[];
    },
  });
};

export const useAcquirer = (id: string) => {
  return useQuery({
    queryKey: ['acquirer', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('acquirers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Acquirer;
    },
    enabled: !!id,
  });
};

export const useCreateAcquirer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (acquirer: Omit<Acquirer, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('acquirers')
        .insert(acquirer)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['acquirers'] });
    },
  });
};

export const useUpdateAcquirer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Acquirer> & { id: string }) => {
      const { data, error } = await supabase
        .from('acquirers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['acquirers'] });
      queryClient.invalidateQueries({ queryKey: ['acquirer', data.id] });
    },
  });
};
