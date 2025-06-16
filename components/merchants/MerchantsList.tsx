'use client'

import React from 'react';
import { Button, Chip, CircularProgress } from '@mui/material';
import { Building, Mail, Phone, MapPin } from 'lucide-react';
import { useMerchants } from '@/hooks/useMerchants';

interface MerchantsListProps {
  onMerchantSelect: (merchantId: string) => void;
  onMerchantEdit: (merchantId: string) => void;
  onNewMerchant: () => void;
}

export const MerchantsList: React.FC<MerchantsListProps> = ({ 
  onMerchantSelect, 
  onMerchantEdit, 
  onNewMerchant 
}) => {
  const { data: merchants, isLoading, error } = useMerchants();

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>Failed to load merchants. Please try again later.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold text-dark mb-1">Merchants</h2>
              <p className="text-muted">Manage merchant onboarding and configurations</p>
            </div>
            <Button 
              variant="contained" 
              onClick={onNewMerchant}
              className="btn-primary"
            >
              Add New Merchant
            </Button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Merchant</th>
                  <th>Code</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {merchants?.map((merchant) => (
                  <tr key={merchant.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded p-2 me-2">
                          <Building size={16} className="text-primary" />
                        </div>
                        <span className="fw-medium">{merchant.merchant_name}</span>
                      </div>
                    </td>
                    <td className="text-muted">{merchant.merchant_code}</td>
                    <td>
                      <div className="small">
                        {merchant.email_address && (
                          <div className="d-flex align-items-center mb-1">
                            <Mail size={12} className="text-muted me-1" />
                            <span>{merchant.email_address}</span>
                          </div>
                        )}
                        {merchant.mobile_number && (
                          <div className="d-flex align-items-center">
                            <Phone size={12} className="text-muted me-1" />
                            <span>{merchant.mobile_number}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      {merchant.city && merchant.country && (
                        <div className="d-flex align-items-center small">
                          <MapPin size={12} className="text-muted me-1" />
                          <span>{merchant.city}, {merchant.country}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <Chip 
                        label={merchant.status}
                        color={merchant.status === 'active' ? 'success' : 'default'}
                        size="small"
                        variant="outlined"
                      />
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button 
                          size="small" 
                          variant="outlined"
                          onClick={() => onMerchantSelect(merchant.id)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="small"
                          variant="contained"
                          onClick={() => onMerchantEdit(merchant.id)}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};