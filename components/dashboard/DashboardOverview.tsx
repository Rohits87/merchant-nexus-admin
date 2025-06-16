'use client'

import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building, CreditCard, TrendingUp, Users } from 'lucide-react';

const mockData = [
  { name: 'Jan', transactions: 4000, revenue: 240000 },
  { name: 'Feb', transactions: 3000, revenue: 180000 },
  { name: 'Mar', transactions: 5000, revenue: 300000 },
  { name: 'Apr', transactions: 4500, revenue: 270000 },
  { name: 'May', transactions: 6000, revenue: 360000 },
  { name: 'Jun', transactions: 5500, revenue: 330000 },
];

export const DashboardOverview: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold text-dark mb-1">Dashboard</h2>
          <p className="text-muted">Overview of your payment service provider metrics</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Total Merchants</h6>
                  <h2 className="card-title mb-1 fw-bold">45</h2>
                  <small className="text-success">+12% from last month</small>
                </div>
                <div className="bg-primary bg-opacity-10 rounded p-2">
                  <Building size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Active Users</h6>
                  <h2 className="card-title mb-1 fw-bold">1,234</h2>
                  <small className="text-success">+8% from last month</small>
                </div>
                <div className="bg-info bg-opacity-10 rounded p-2">
                  <Users size={24} className="text-info" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Monthly Transactions</h6>
                  <h2 className="card-title mb-1 fw-bold">5,500</h2>
                  <small className="text-success">+22% from last month</small>
                </div>
                <div className="bg-warning bg-opacity-10 rounded p-2">
                  <CreditCard size={24} className="text-warning" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Revenue</h6>
                  <h2 className="card-title mb-1 fw-bold">$330,000</h2>
                  <small className="text-success">+15% from last month</small>
                </div>
                <div className="bg-success bg-opacity-10 rounded p-2">
                  <TrendingUp size={24} className="text-success" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Transaction Overview</h5>
            </div>
            <div className="card-body">
              <div style={{ width: '100%', height: '350px' }}>
                <ResponsiveContainer>
                  <BarChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="transactions" fill="#0d6efd" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};