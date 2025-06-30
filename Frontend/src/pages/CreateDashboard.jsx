"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const chartTypes = [
  { id: "bar", name: "Bar Chart", icon: BarChart3, description: "Compare values across categories" },
  { id: "line", name: "Line Chart", icon: LineChart, description: "Show trends over time" },
  { id: "pie", name: "Pie Chart", icon: PieChart, description: "Display proportions of a whole" },
  { id: "area", name: "Area Chart", icon: TrendingUp, description: "Visualize cumulative data" },
];

const dataSources = [
  { id: "sample", name: "Sample Data", description: "Use pre-built sample datasets" },
  { id: "csv", name: "CSV Upload", description: "Upload your own CSV file" },
  { id: "api", name: "API Connection", description: "Connect to external data sources" },
];

const CreateDashboard = () => {
  const [step, setStep] = useState(1);
  const [dashboardData, setDashboardData] = useState({
    title: "",
    description: "",
    chartType: "",
    dataSource: "",
    selectedCharts: [],
  });
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreate = () => {
    navigate("/dashboards");
  };

  const toggleChart = (chartId) => {
    setDashboardData((prev) => ({
      ...prev,
      selectedCharts: prev.selectedCharts.includes(chartId)
        ? prev.selectedCharts.filter((id) => id !== chartId)
        : [...prev.selectedCharts, chartId],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border backdrop-blur-sm">
        <div className="flex h-16 items-center px-6">
            {!isMobile && <Button size="sm" onClick={() => navigate("/dashboards")} className={'absolute lg:py-5 cursor-pointer'}> 
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboards
            </Button>}
            <h1 className="flex-1 text-center text-lg font-semibold dark:text-primary-foreground">Create New Dashboard</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Indicator */}
        <div className="flex flex-col items-center justify-center mb-8 gap-8">
            {isMobile && <div className="">
                <Button size="sm" onClick={() => navigate("/dashboards")} className={'lg:py-5 cursor-pointer'}> 
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboards
                </Button>
            </div>}
            <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                >
                    {stepNumber}
                </div>
                {stepNumber < 3 && (
                    <div
                    className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}
                    />
                )}
                </div>
            ))}
            </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Information</CardTitle>
              <CardDescription>Basic details about your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Dashboard Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Sales Performance Q4"
                  value={dashboardData.title}
                  onChange={(e) => setDashboardData({ ...dashboardData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description..."
                  value={dashboardData.description}
                  onChange={(e) => setDashboardData({ ...dashboardData, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleNext} disabled={!dashboardData.title.trim()} className={'cursor-pointer'}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Chart Types</CardTitle>
              <CardDescription>Choose chart types to include</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {chartTypes.map((chart) => {
                  const Icon = chart.icon;
                  const isSelected = dashboardData.selectedCharts.includes(chart.id);
                  return (
                    <div
                      key={chart.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary hover:bg-primary/10 dark:border-gray-700 dark:hover:border-primary"
                      }`}
                      onClick={() => toggleChart(chart.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`h-6 w-6 mt-1 ${isSelected ? "text-primary" : "text-gray-500"}`} />
                        <div>
                          <h3 className="font-medium">{chart.name}</h3>
                          <p className="text-sm text-muted-foreground">{chart.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} className={'cursor-pointer'}>Back</Button>
                <Button onClick={handleNext} disabled={dashboardData.selectedCharts.length === 0} className={'cursor-pointer'}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Data Source</CardTitle>
              <CardDescription>Select data source for your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {dataSources.map((source) => (
                  <div
                    key={source.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      dashboardData.dataSource === source.id
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary hover:bg-primary/10 dark:border-gray-700 dark:hover:border-primary"
                    }`}
                    onClick={() => setDashboardData({ ...dashboardData, dataSource: source.id })}
                  >
                    <h3 className="font-medium">{source.name}</h3>
                    <p className="text-sm text-muted-foreground">{source.description}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mb-6">
                <h4 className="font-medium mb-2">Dashboard Preview</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Title:</strong> {dashboardData.title}</p>
                  <p><strong>Charts:</strong> {dashboardData.selectedCharts.length} selected</p>
                  <p><strong>Data Source:</strong> {dataSources.find(s => s.id === dashboardData.dataSource)?.name || "Not selected"}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} className={'cursor-pointer'}>Back</Button>
                <Button onClick={handleCreate} disabled={!dashboardData.dataSource} className={'cursor-pointer'}>Create Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CreateDashboard;