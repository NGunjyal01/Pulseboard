// src/components/dashboard/CreateDashboard/Step3ConfigureCharts.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react';
import ChartConfigForm from './ChartConfigForm';

const Step3ConfigureCharts = ({ dashboardData, setDashboardData, onBack, onCreate, onCancel }) => {
  const addChart = () => {
    const newChart = {
      id: `chart-${Date.now()}`,
      title: `Chart ${dashboardData.charts.length + 1}`,
      type: "bar",
    };
    setDashboardData(prev => ({
      ...prev,
      charts: [...prev.charts, newChart],
    }));
  };

  const updateChart = (chartId, updates) => {
    setDashboardData(prev => ({
      ...prev,
      charts: prev.charts.map(chart => 
        chart.id === chartId ? { ...chart, ...updates } : chart
      ),
    }));
  };

  const removeChart = (chartId) => {
    setDashboardData(prev => ({
      ...prev,
      charts: prev.charts.filter(chart => chart.id !== chartId),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📈 Configure Charts</CardTitle>
        <CardDescription>Set up your charts using the available data fields</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Available Fields Reference */}
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Available Fields:</p>
          <div className="flex flex-wrap gap-1">
            {dashboardData.dataFields.map(field => (
              <Badge key={field} variant="outline">
                {field}
              </Badge>
            ))}
          </div>
        </div>

        {/* Charts Configuration */}
        <div className="space-y-4">
          {dashboardData.charts.map(chart => (
            <ChartConfigForm
              key={chart.id}
              config={chart}
              columnOptions={dashboardData.dataFields}
              onUpdate={updateChart}
              onRemove={removeChart}
            />
          ))}

          <Button onClick={addChart} variant="outline" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Chart
          </Button>
        </div>

        {/* Dashboard Summary */}
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Dashboard Summary</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Title:</strong> {dashboardData.title}
            </p>
            <p>
              <strong>Data Source:</strong> {dashboardData.dataSource}
            </p>
            <p>
              <strong>Charts:</strong> {dashboardData.charts.length} configured
            </p>
            <p>
              <strong>Collaborators:</strong> {dashboardData.collaborators.length} invited
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onCreate} disabled={dashboardData.charts.length === 0}>
              Create Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export default Step3ConfigureCharts;