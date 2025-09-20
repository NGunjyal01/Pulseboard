import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDashboardStore from "@/store/useDashboardStore";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot, ReferenceArea} from "recharts";

const ChartGrid = () => {

    const { dashboardDetails,fetched,dataSample:data,annotations } = useDashboardStore();
    if(!fetched)  return;
    const { charts } = dashboardDetails;

    const renderAnnotations = (chartId) => {
      const chartAnnotations = annotations.filter(a => a.chartId === chartId);
      return chartAnnotations.map((a, i) => {
        if (a.type === "line") {
          return (
            <ReferenceLine
              key={i}
              x={a.position?.x}
              y={a.position?.y}
              stroke={a.color || "red"}
              label={a.label}
              strokeDasharray="3 3"
            />
          );
        }
        if (a.type === "point") {
          return (
            <ReferenceDot
              key={i}
              x={a.position?.x}
              y={a.position?.y}
              r={6}
              fill={a.color || "blue"}
              stroke="none"
              label={a.label}
            />
          );
        }
        if (a.type === "area") {
          return (
            <ReferenceArea
              key={i}
              x1={a.position?.x1}
              x2={a.position?.x2}
              y1={a.position?.y1}
              y2={a.position?.y2}
              stroke={a.color || "green"}
              fill={a.color || "green"}
              fillOpacity={0.2}
              label={a.label}
            />
          );
        }
        return null;
      });
    };

    return (
    <div className="grid grid-cols-1 gap-4 w-full p-6">
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
                    {renderAnnotations(chart._id)}
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
                    {renderAnnotations(chart._id)}
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
                    {renderAnnotations(chart._id)}
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
                    {renderAnnotations(chart._id)}
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