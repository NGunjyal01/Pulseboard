import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Loader2 } from 'lucide-react';
import ChartConfigForm from './ChartConfigForm';
import useCreateDashboardStore from '@/store/useCreateDashboardStore';
import { useNavigate } from 'react-router';
import CancelButton from './CancelButton';

const Step3ConfigureCharts = () => {
  const navigate = useNavigate();
  const {dashboardData,setDashboardData,handleBack:onBack,handleCreate,loading} = useCreateDashboardStore();

  const addChart = () => {
    const newChart = {
      id: `chart-${Date.now()}`,
      title: `Chart ${dashboardData.charts.length + 1}`,
      type: "line",
      dataMapping:{
        xAxis:'',
        yAxis:'',
      },
      xAxis: "",
      values: [],
      series: []
    };
    setDashboardData({
      charts: [...dashboardData.charts, newChart],
    });
  };

  const updateChart = (chartId, updates) => {
    setDashboardData({
      charts: dashboardData.charts.map(chart =>
        chart.id === chartId ? { ...chart, ...updates } : chart
      )
    });
  };

  const removeChart = (chartId) => {
    setDashboardData({
      charts: dashboardData.charts.filter(chart => chart.id !== chartId),
    });
  };

  const isChartsValid = dashboardData.charts.length > 0 &&
    dashboardData.charts.every(chart => {
      if (["line", "bar", "area"].includes(chart.type)) {
        return chart.dataMapping.xAxis && chart.values && chart.values.length > 0;
      }
      if (chart.type === "composed") {
        return chart.dataMapping.xAxis && chart.composedConfig && chart.composedConfig.length > 0 &&
              chart.composedConfig.every(series => series.value && series.viewType);
      }
      return false; // Invalid chart type
  });

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

          <Button onClick={addChart} variant="outline" className="w-full bg-transparent cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Add Chart
          </Button>
        </div>

        {/* Dashboard Summary */}
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Dashboard Summary</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Title:</strong> {dashboardData.title}</p>
            <p><strong>Data Source:</strong> {dashboardData.dataSource}</p>
            <p><strong>Charts:</strong> {dashboardData.charts.length} configured</p>
            <p><strong>Collaborators:</strong> {dashboardData.collaborators.length} invited</p>
          </div>
        </div>

        <div className="flex justify-between">
          <CancelButton title={'cancel'}/>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button 
              onClick={()=>handleCreate(navigate)} 
              disabled={!isChartsValid || loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Processing..." : "Create Dashboard"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3ConfigureCharts;
