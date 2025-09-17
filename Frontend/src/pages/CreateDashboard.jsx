import ProgressIndicator from '@/components/dashboard/CreateDashboard/ProgessIndicator';
import Step1BasicInfo from '@/components/dashboard/CreateDashboard/Step1BasicInfo';
import Step2DataSource from '@/components/dashboard/CreateDashboard/Step2DataSource';
import Step3ConfigureCharts from '@/components/dashboard/CreateDashboard/Step3ConfigureCharts';
import useCreateDashboardStore from '@/store/useCreateDashboardStore';
import CancelButton from "@/components/dashboard/CreateDashboard/CancelButton";

const CreateDashboardPage = () => {
  const {step} = useCreateDashboardStore();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <CancelButton title={'dashboard'}/> 
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">Create New Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <ProgressIndicator step={step} />
        {step === 1 && ( <Step1BasicInfo/> )}
        {step === 2 && ( <Step2DataSource/> )}
        {step === 3 && ( <Step3ConfigureCharts/>)}
      </div>
    </div>
  );
};

export default CreateDashboardPage;