import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Link, Database, Eye, Loader2 } from 'lucide-react';
import { sampleDatasets } from './constants';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateDashboardStore from "@/store/useCreateDashboardStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CancelButton from "./CancelButton";

const Step2DataSource = () => {
  const {dashboardData,setDashboardData,step,setStep,loading,handleDataSourceChange,
    handleApiPreview,handleFileUpload,handleSimulatedData,handleBack:onBack
  } = useCreateDashboardStore();
  const handleNext = () => step < 3 && setStep(step + 1);

  const handleRemoveCsvFile = ()=>{
    setDashboardData({csvFileName:'', dataFields:[] , parsedData:null})
  }
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
                ? "border-primary bg-primary/10 dark:bg-blue-900/20"
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
                ? "border-primary bg-primary/10 dark:bg-blue-900/20"
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
                ? "border-primary bg-primary/10 dark:bg-blue-900/20"
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
            {!dashboardData.csvFileName && <div>
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <Input id="csv-file" type="file" accept=".csv" onChange={handleFileUpload} className="mt-2 cursor-pointer"/>
            </div>}
            {dashboardData.csvFileName && (
              <div className="flex items-center gap-10 p-3 rounded-lg">
                <p className="text-sm font-medium dark:text-green-200">
                  ✅ File uploaded: {dashboardData.csvFileName}
                </p>
                <Button variant={"destructive"} className={'cursor-pointer'} onClick={handleRemoveCsvFile}> Remove </Button>
              </div>
            )}
          </div>
        )}

        {dashboardData.dataSource === "api" && (
          <div className="space-y-4">
            {/* API Endpoint */}
            <div className="space-y-3">
              <Label htmlFor="api-url">API Endpoint URL</Label>
              <Input
                id="api-url"
                placeholder="https://api.example.com/data"
                value={dashboardData.apiUrl}
                onChange={e => setDashboardData({ apiUrl: e.target.value })}
              />
            </div>

            {/* Method */}
            <div className="flex items-center gap-5">
              <Label>HTTP Method</Label>
              <Select
                value={dashboardData.apiMethod || "GET"}
                onValueChange={(value) => setDashboardData({ apiMethod: value })}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET" className={"cursor-pointer"}>GET</SelectItem>
                  <SelectItem value="POST" className={"cursor-pointer"}>POST</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Params (Query Params) */}
            <div className="space-y-3">
              <Label>Query Params (JSON format) (optional)</Label>
              <Input
                placeholder='e.g. {"userId": 1}'
                value={dashboardData.apiParams || ""}
                onChange={e => setDashboardData({ apiParams: e.target.value })}
              />
            </div>

            {/* Body (for POST requests) */}
            {dashboardData.apiMethod === "POST" && (
              <div className="space-y-3">
                <Label>Request Body (JSON format) (optional)</Label>
                <Input
                  placeholder='e.g. {"key": "value"}'
                  value={dashboardData.apiBody || ""}
                  onChange={e => setDashboardData({ apiBody: e.target.value })}
                />
              </div>
            )}

            {/* Data Path */}
            <div className="space-y-3">
              <Label>Data Path (optional)</Label>
              <Input
                placeholder='e.g. "data.records"'
                value={dashboardData.apiDataPath}
                onChange={e => setDashboardData({ apiDataPath: e.target.value })}
              />
            </div>

            {/* Fetch Preview */}
            <Button
              onClick={handleApiPreview}
              disabled={!dashboardData.apiUrl}
              className="cursor-pointer"
            >
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
                      ? "border-primary bg-primary/10"
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
                  {dashboardData.parsedData.slice(0,5).map((row, idx) => (
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
          <CancelButton title={'cancel'}/>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack} className={"cursor-pointer"}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!dashboardData.parsedData || loading} className={'cursor-pointer'}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Processing..." : "Next"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step2DataSource;