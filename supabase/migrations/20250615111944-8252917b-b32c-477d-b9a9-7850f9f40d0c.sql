
-- Create enum types for status values
CREATE TYPE public.merchant_status AS ENUM ('active', 'inactive', 'pending', 'suspended');
CREATE TYPE public.acquirer_status AS ENUM ('active', 'inactive', 'maintenance');
CREATE TYPE public.gateway_status AS ENUM ('active', 'inactive', 'maintenance');
CREATE TYPE public.payment_method AS ENUM ('credit_card', 'debit_card', 'upi', 'wallet', 'net_banking', 'bnpl');

-- Create merchants table
CREATE TABLE public.merchants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id TEXT NOT NULL UNIQUE,
  merchant_code TEXT NOT NULL UNIQUE,
  merchant_name TEXT NOT NULL,
  business_type TEXT,
  description TEXT,
  status merchant_status NOT NULL DEFAULT 'pending',
  web_address TEXT,
  language TEXT DEFAULT 'English',
  
  -- Address information
  address_line1 TEXT,
  address_line2 TEXT,
  address_line3 TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  zip_code TEXT,
  
  -- Contact information
  contact_name TEXT,
  mobile_number TEXT,
  fax_number TEXT,
  email_address TEXT,
  technical_contact_name TEXT,
  technical_phone_number TEXT,
  technical_email_address TEXT,
  
  -- Configuration
  data_encryption_key TEXT,
  return_url TEXT,
  callback_url TEXT,
  payment_methods payment_method[] DEFAULT '{}',
  theme TEXT DEFAULT 'Default',
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create acquirers table
CREATE TABLE public.acquirers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bank_name TEXT NOT NULL,
  acquirer_code TEXT NOT NULL UNIQUE,
  bin_ranges TEXT[] DEFAULT '{}',
  country TEXT,
  currency TEXT,
  support_email TEXT,
  support_phone TEXT,
  status acquirer_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gateways table
CREATE TABLE public.gateways (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  supported_methods payment_method[] DEFAULT '{}',
  auth_endpoint TEXT,
  capture_endpoint TEXT,
  refund_endpoint TEXT,
  status gateway_status NOT NULL DEFAULT 'active',
  sla_timeout INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transactions table for tracking payment transactions
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id TEXT NOT NULL UNIQUE,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  acquirer_id UUID REFERENCES public.acquirers(id) ON DELETE SET NULL,
  gateway_id UUID REFERENCES public.gateways(id) ON DELETE SET NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'AED',
  payment_method payment_method,
  status TEXT NOT NULL DEFAULT 'pending',
  customer_email TEXT,
  customer_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acquirers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gateways ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can restrict these later based on your auth requirements)
CREATE POLICY "Allow all operations on merchants" ON public.merchants FOR ALL USING (true);
CREATE POLICY "Allow all operations on acquirers" ON public.acquirers FOR ALL USING (true);
CREATE POLICY "Allow all operations on gateways" ON public.gateways FOR ALL USING (true);
CREATE POLICY "Allow all operations on transactions" ON public.transactions FOR ALL USING (true);

-- Insert sample data for merchants
INSERT INTO public.merchants (
  merchant_id, merchant_code, merchant_name, business_type, description, status,
  web_address, address_line1, city, country, contact_name, mobile_number, email_address
) VALUES 
  ('MERCH001', 'TECH001', 'Tech Solutions Ltd', 'E-commerce', 'Leading technology solutions provider', 'active', 
   'https://techsolutions.com', '123 Business Street', 'Dubai', 'UAE', 'John Smith', '+971-50-123-4567', 'contact@techsolutions.com'),
  ('MERCH002', 'ECOM001', 'E-Commerce Store', 'Retail', 'Online retail platform', 'active',
   'https://ecommerce.com', '456 Trade Avenue', 'Dubai', 'UAE', 'Sarah Johnson', '+971-50-234-5678', 'admin@ecommerce.com'),
  ('MERCH003', 'RETAIL001', 'Retail Chain', 'Retail', 'Multi-location retail chain', 'inactive',
   'https://retailchain.com', '789 Shopping Blvd', 'Abu Dhabi', 'UAE', 'Mike Brown', '+971-50-345-6789', 'admin@retailchain.com');

-- Insert sample data for acquirers
INSERT INTO public.acquirers (
  bank_name, acquirer_code, bin_ranges, country, currency, support_email, support_phone, status
) VALUES 
  ('Emirates NBD', 'ENBD', ARRAY['400000-499999', '520000-529999'], 'UAE', 'AED', 'support@emiratesnbd.com', '+971-4-123-4567', 'active'),
  ('ADCB Bank', 'ADCB', ARRAY['450000-459999'], 'UAE', 'AED', 'support@adcb.com', '+971-2-123-4567', 'active'),
  ('FAB Bank', 'FAB', ARRAY['480000-489999'], 'UAE', 'AED', 'support@bankfab.com', '+971-4-987-6543', 'inactive');

-- Insert sample data for gateways
INSERT INTO public.gateways (
  name, code, supported_methods, auth_endpoint, capture_endpoint, refund_endpoint, status, sla_timeout
) VALUES 
  ('Stripe Gateway', 'STRIPE', ARRAY['credit_card', 'debit_card', 'wallet']::payment_method[], 
   'https://api.stripe.com/v1/charges', 'https://api.stripe.com/v1/charges/:id/capture', 'https://api.stripe.com/v1/refunds', 'active', 30),
  ('PayPal Gateway', 'PAYPAL', ARRAY['credit_card', 'wallet', 'bnpl']::payment_method[], 
   'https://api.paypal.com/v2/payments', 'https://api.paypal.com/v2/payments/:id/capture', 'https://api.paypal.com/v2/payments/:id/refund', 'active', 45),
  ('Local Bank Gateway', 'LBG', ARRAY['credit_card', 'debit_card', 'net_banking']::payment_method[], 
   'https://gateway.localbank.com/auth', 'https://gateway.localbank.com/capture', 'https://gateway.localbank.com/refund', 'inactive', 60);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER merchants_updated_at BEFORE UPDATE ON public.merchants FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER acquirers_updated_at BEFORE UPDATE ON public.acquirers FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER gateways_updated_at BEFORE UPDATE ON public.gateways FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
