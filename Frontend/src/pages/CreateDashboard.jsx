// src/pages/CreateDashboardPage.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import ProgressIndicator from '@/components/dashboard/CreateDashboard/ProgessIndicator';
import Step1BasicInfo from '@/components/dashboard/CreateDashboard/Step1BasicInfo';
import Step2DataSource from '@/components/dashboard/CreateDashboard/Step2DataSource';
import Step3ConfigureCharts from '@/components/dashboard/CreateDashboard/Step3ConfigureCharts';
import { useNavigate } from 'react-router';
import useDashboardStore from '@/store/useDashboardStore';

const CreateDashboardPage = () => {
  const navigate = useNavigate();
  const {resetDashboardData,step,setStep} = useDashboardStore();

  const handleBack = () => step > 1 && setStep(step - 1);
  const handleCancel = () => {
    resetDashboardData();
    navigate('/dashboards');
  }
  const handleCreate = () => {
    // console.log("Creating dashboard:", dashboardData);
    // window.location.href = "/dashboards";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <Button size="sm" onClick={handleCancel} className={"absolute lg:py-5"}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboards
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">Create New Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <ProgressIndicator step={step} />
        
        {step === 1 && (
          <Step1BasicInfo
            onCancel={handleCancel}
          />
        )}
        
        {step === 2 && (
          <Step2DataSource
            onBack={handleBack}
            onCancel={handleCancel}
          />
        )}
        
        {step === 3 && (
          <Step3ConfigureCharts
            onBack={handleBack}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default CreateDashboardPage;