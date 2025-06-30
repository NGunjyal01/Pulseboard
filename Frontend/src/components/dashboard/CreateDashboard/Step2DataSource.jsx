
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Link, Database, Eye } from 'lucide-react';
import { sampleDatasets } from './constants';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Step2DataSource = ({ dashboardData, setDashboardData, onBack, onNext, onCancel }) => {
  const handleDataSourceChange = (source) => {
    setDashboardData(prev => ({
      ...prev,
      dataSource: source,
      parsedData: null,
      dataFields: [],
      csvFile: null,
      apiUrl: "",
      selectedDataset: "",
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setDashboardData(prev => ({ ...prev, csvFile: file }));
      setTimeout(() => {
        const mockFields = ["date", "sales", "profit", "customers", "region"];
        setDashboardData(prev => ({
          ...prev,
          dataFields: mockFields,
          parsedData: {
            fields: mockFields,
            preview: [
              { date: "2024-01", sales: 15000, profit: 3000, customers: 45, region: "East" },
              { date: "2024-02", sales: 18000, profit: 3600, customers: 52, region: "West" },
              { date: "2024-03", sales: 16500, profit: 3300, customers: 48, region: "North" },
            ],
          },
        }));
      }, 1000);
    }
  };

  const handleApiPreview = () => {
    if (dashboardData.apiUrl) {
      setTimeout(() => {
        const mockFields = ["timestamp", "value", "category", "status"];
        setDashboardData(prev => ({
          ...prev,
          dataFields: mockFields,
          parsedData: {
            fields: mockFields,
            preview: [
              { timestamp: "2024-01-01", value: 100, category: "A", status: "active" },
              { timestamp: "2024-01-02", value: 150, category: "B", status: "active" },
              { timestamp: "2024-01-03", value: 120, category: "A", status: "inactive" },
            ],
          },
        }));
      }, 1500);
    }
  };

  const handleSimulatedData = (datasetKey) => {
    const dataset = sampleDatasets[datasetKey];
    if (dataset) {
      setDashboardData(prev => ({
        ...prev,
        selectedDataset: datasetKey,
        dataFields: dataset.fields,
        parsedData: {
          fields: dataset.fields,
          preview: dataset.preview,
        },
      }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Choose Data Source</CardTitle>
        <CardDescription>Select and configure your data source</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CSV Upload */}
          <div
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              dashboardData.dataSource === "csv"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
            }`}
            onClick={() => handleDataSourceChange("csv")}
          >
            <Upload className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-medium mb-2">CSV Upload</h3>
            <p className="text-sm text-muted-foreground">Upload and parse your CSV file</p>
          </div>

          {/* API Connection */}
          <div
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              dashboardData.dataSource === "api"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
            }`}
            onClick={() => handleDataSourceChange("api")}
          >
            <Link className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-medium mb-2">API Connection</h3>
            <p className="text-sm text-muted-foreground">Fetch data from external API</p>
          </div>

          {/* Simulated Data */}
          <div
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              dashboardData.dataSource === "simulated"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
            }`}
            onClick={() => handleDataSourceChange("simulated")}
          >
            <Database className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-medium mb-2">Simulated Data</h3>
            <p className="text-sm text-muted-foreground">Auto-generate sample datasets</p>
          </div>
        </div>

        {/* Data Source Configuration */}
        {dashboardData.dataSource === "csv" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <Input id="csv-file" type="file" accept=".csv" onChange={handleFileUpload} className="mt-2" />
            </div>
            {dashboardData.csvFile && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  ✅ File uploaded: {dashboardData.csvFile.name}
                </p>
              </div>
            )}
          </div>
        )}

        {dashboardData.dataSource === "api" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-url">API Endpoint URL</Label>
              <Input
                id="api-url"
                placeholder="https://api.example.com/data"
                value={dashboardData.apiUrl}
                onChange={e => setDashboardData(prev => ({ ...prev, apiUrl: e.target.value }))}
              />
            </div>
            <Button onClick={handleApiPreview} disabled={!dashboardData.apiUrl}>
              <Eye className="h-4 w-4 mr-2" />
              Fetch Preview
            </Button>
          </div>
        )}

        {dashboardData.dataSource === "simulated" && (
          <div className="space-y-4">
            <Label>Select Sample Dataset</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(sampleDatasets).map(([key, dataset]) => (
                <div
                  key={key}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    dashboardData.selectedDataset === key
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
                  }`}
                  onClick={() => handleSimulatedData(key)}
                >
                  <h4 className="font-medium">{dataset.name}</h4>
                  <p className="text-sm text-muted-foreground">Fields: {dataset.fields.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Preview */}
        {dashboardData.parsedData && (
          <div className="space-y-3">
            <Label>Data Preview</Label>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-3">
                <p className="text-sm font-medium">Available Fields:</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {dashboardData.dataFields.map(field => (
                    <Badge key={field} variant="secondary">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm">
                  <div className="grid grid-cols-4 gap-2 font-medium mb-2">
                    {dashboardData.dataFields.slice(0, 4).map(field => (
                      <div key={field} className="truncate">
                        {field}
                      </div>
                    ))}
                  </div>
                  {dashboardData.parsedData.preview.slice(0, 3).map((row, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-2 py-1 text-muted-foreground">
                      {dashboardData.dataFields.slice(0, 4).map(field => (
                        <div key={field} className="truncate">
                          {row[field]}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onNext} disabled={!dashboardData.parsedData}>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step2DataSource;