// src/pages/CreateDashboardPage.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import ProgressIndicator from '@/components/dashboard/CreateDashboard/ProgessIndicator';
import Step1BasicInfo from '@/components/dashboard/CreateDashboard/Step1BasicInfo';
import Step2DataSource from '@/components/dashboard/CreateDashboard/Step2DataSource';
import Step3ConfigureCharts from '@/components/dashboard/CreateDashboard/Step3ConfigureCharts';

const CreateDashboardPage = () => {
  const [step, setStep] = useState(1);
  const [dashboardData, setDashboardData] = useState({
    title: "",
    description: "",
    collaborators: [],
    dataSource: "",
    csvFile: null,
    apiUrl: "",
    selectedDataset: "",
    parsedData: null,
    dataFields: [],
    charts: [],
  });

  const handleNext = () => step < 3 && setStep(step + 1);
  const handleBack = () => step > 1 && setStep(step - 1);
  const handleCancel = () => (window.location.href = "/dashboards");
  const handleCreate = () => {
    console.log("Creating dashboard:", dashboardData);
    window.location.href = "/dashboards";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
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
            dashboardData={dashboardData}
            setDashboardData={setDashboardData}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        )}
        
        {step === 2 && (
          <Step2DataSource
            dashboardData={dashboardData}
            setDashboardData={setDashboardData}
            onBack={handleBack}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        )}
        
        {step === 3 && (
          <Step3ConfigureCharts
            dashboardData={dashboardData}
            setDashboardData={setDashboardData}
            onBack={handleBack}
            onCreate={handleCreate}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default CreateDashboardPage;