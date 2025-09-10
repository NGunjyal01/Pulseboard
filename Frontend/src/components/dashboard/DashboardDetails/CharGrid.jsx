import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDashboardStore from "@/store/useDashboardStore";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot, ReferenceArea} from "recharts";

const ChartGrid = () => {

    const { dashboardDetails,fetched } = useDashboardStore();
    if(!fetched)  return;
    const { dataSource,charts } = dashboardDetails;
    let data;
    if(dataSource.type==='csv') data = dataSource.csvConfig.parsedData;
    else if(dataSource.type==='api') data = dataSource.apiConfig.responseSnapshot;
    else data = dataSource.simulatedConfig.sampleData;

    return (
    <div className="grid grid-cols-1 gap-4">
      {charts.map((chart, index) => {
      return (
        <Card key={index} className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">{chart.title}</CardTitle>
          </CardHeader>
          <CardContent className="h-80 min-h-[300px]">
            {chart.type === "line" && (
              <ResponsiveContainer width={"100%"} height="100%">
                  <LineChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={chart.dataMapping.xAxis} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {chart.values?.map((val, i) => <Line key={i} type="monotone" dataKey={val} stroke="#8884d8" strokeWidth={2} dot={false}/>)}
                  </LineChart>
              </ResponsiveContainer>
            )}

            {chart.type === "bar" && (
              <ResponsiveContainer width={'100%'} height={'100%'}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={chart.dataMapping.xAxis} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {chart.values?.map((val, i) => <Bar key={i} dataKey={val} fill="#82ca9d" barSize={20}/>)}
                  </BarChart>
              </ResponsiveContainer>
            )}

            {chart.type === "area" && (
              <ResponsiveContainer width={'100%'} height={'100%'}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={chart.dataMapping.xAxis} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {chart.values?.map((val, i) => <Area key={i} type="monotone" dataKey={val} stroke="#8884d8" fill="#8884d8" fillOpacity={0.3}/>)}
                  </AreaChart>
              </ResponsiveContainer>
            )}

            {chart.type === "composed" && (
              <ResponsiveContainer width={'100%'} height={'100%'}>
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={chart.dataMapping.xAxis} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {chart.composedConfig?.map((cfg, i) => {
                        if (cfg.viewType === "line")
                        return <Line key={i} type="monotone" dataKey={cfg.value} stroke="#8884d8" strokeWidth={2} dot={false}/>
                        if (cfg.viewType === "bar")
                        return <Bar key={i} dataKey={cfg.value} fill="#82ca9d" barSize={15}/>
                        if (cfg.viewType === "area")
                        return <Area key={i} type="monotone" dataKey={cfg.value} stroke="#ffc658" fill="#ffc658" fillOpacity={0.3}/>
                        return null;
                    })}
                  </ComposedChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>)}
      )}
    </div>
    )
}

export default ChartGrid