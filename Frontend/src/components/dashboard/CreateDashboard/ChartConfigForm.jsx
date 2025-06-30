// src/components/dashboard/CreateDashboard/ChartConfigForm.jsx
import React from 'react';
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, X } from 'lucide-react';
import { chartTypes } from './constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ChartConfigForm = ({ config, columnOptions, onUpdate, onRemove }) => {
    const chartType = chartTypes.find(t => t.id === config.type);
    const validColumnOptions = columnOptions.filter(opt => opt && opt.trim() !== "");

    const addSeries = () => {
        const newSeries = {
            type: "line",
            dataKey: validColumnOptions[0] || "",
            color: "#8884d8",
        };
        onUpdate(config.id, {
            series: [...(config.series || []), newSeries],
        });
    };

    const updateSeries = (index, updates) => {
        const newSeries = [...(config.series || [])];
        newSeries[index] = { ...newSeries[index], ...updates };
        onUpdate(config.id, { series: newSeries });
        };

        const removeSeries = (index) => {
        const newSeries = [...(config.series || [])];
        newSeries.splice(index, 1);
        onUpdate(config.id, { series: newSeries });
    };

    return (
    <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            {chartType && <chartType.icon className="h-5 w-5" />}
            <h4 className="font-medium">{config.title || "Untitled Chart"}</h4>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onRemove(config.id)}>
            <Trash2 className="h-4 w-4" />
        </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <Label>Chart Title</Label>
            <Input
            value={config.title}
            onChange={e => onUpdate(config.id, { title: e.target.value })}
            placeholder="Enter chart title"
            />
        </div>

        <div>
            <Label>Chart Type</Label>
            <Select value={config.type} onValueChange={type => onUpdate(config.id, { type })}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {chartTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                    {type.name}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
        </div>

        {/* Dynamic fields based on chart type */}
        <div className="space-y-4">
        {/* Line, Bar, Area Charts */}
        {["line", "bar", "area"].includes(config.type) && (
            <>
            <div>
                <Label>X-Axis Field</Label>
                <Select value={config.xAxis} onValueChange={xAxis => onUpdate(config.id, { xAxis })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select X-axis field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Y-Axis Fields (Multiple allowed)</Label>
                <Select
                value={config.yAxis?.[0] || validColumnOptions[0]}
                onValueChange={field => onUpdate(config.id, { yAxis: [field] })}
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select Y-axis field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </>
        )}

        {/* Composed Chart */}
        {config.type === "composed" && (
            <>
            <div>
                <Label>X-Axis Field (Shared)</Label>
                <Select value={config.xAxis} onValueChange={xAxis => onUpdate(config.id, { xAxis })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select shared X-axis field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div>
                <div className="flex items-center justify-between mb-2">
                <Label>Series Configuration</Label>
                <Button size="sm" variant="outline" onClick={addSeries}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Series
                </Button>
                </div>
                {config.series?.map((series, index) => (
                <div key={index} className="border rounded p-3 space-y-2">
                    <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Series {index + 1}</span>
                    <Button size="sm" variant="ghost" onClick={() => removeSeries(index)}>
                        <X className="h-3 w-3" />
                    </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                    <Select
                        value={series.type}
                        onValueChange={type => updateSeries(index, { type })}
                    >
                        <SelectTrigger>
                        <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="line">Line</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="area">Area</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={series.dataKey} onValueChange={dataKey => updateSeries(index, { dataKey })}>
                        <SelectTrigger>
                        <SelectValue placeholder="Data field" />
                        </SelectTrigger>
                        <SelectContent>
                        {validColumnOptions.map(field => (
                            <SelectItem key={field} value={field}>
                            {field}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder="Color (hex)"
                        value={series.color}
                        onChange={e => updateSeries(index, { color: e.target.value })}
                    />
                    </div>
                </div>
                ))}
            </div>
            </>
        )}

        {/* Pie, Radar, RadialBar Charts */}
        {["pie", "radar", "radialBar"].includes(config.type) && (
            <>
            <div>
                <Label>Category Field</Label>
                <Select value={config.category} onValueChange={category => onUpdate(config.id, { category })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select category field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Metric Field (Value)</Label>
                <Select value={config.metric} onValueChange={metric => onUpdate(config.id, { metric })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select metric field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </>
        )}

        {/* Scatter Chart */}
        {config.type === "scatter" && (
        <>
            <div>
            <Label>X-Axis Field (Numeric)</Label>
            <Select 
                value={config.xAxis || "none"} 
                onValueChange={xAxis => onUpdate(config.id, { 
                xAxis: xAxis === "none" ? undefined : xAxis 
                })}
            >
                <SelectTrigger>
                <SelectValue placeholder="Select X-axis field" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {validColumnOptions.map(field => (
                    <SelectItem key={`x-${field}`} value={field}>
                    {field}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
            
            <div>
            <Label>Y-Axis Field (Numeric)</Label>
            <Select
                value={config.yAxis?.[0] || "none"}
                onValueChange={field => onUpdate(config.id, { 
                yAxis: field === "none" ? [] : [field] 
                })}
            >
                <SelectTrigger>
                <SelectValue placeholder="Select Y-axis field" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {validColumnOptions.map(field => (
                    <SelectItem key={`y-${field}`} value={field}>
                    {field}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
            
            <div>
            <Label>Group By Field (Optional)</Label>
            <Select 
                value={config.groupBy || "none"} 
                onValueChange={groupBy => onUpdate(config.id, { 
                groupBy: groupBy === "none" ? undefined : groupBy 
                })}
            >
                <SelectTrigger className="w-24">
                <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {validColumnOptions.map(field => (
                    <SelectItem key={`group-${field}`} value={field}>
                    {field}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
        </>
        )}

        {/* Funnel Chart */}
        {config.type === "funnel" && (
            <>
            <div>
                <Label>Stage Field</Label>
                <Select value={config.stage} onValueChange={stage => onUpdate(config.id, { stage })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select stage field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Value Field</Label>
                <Select value={config.value} onValueChange={value => onUpdate(config.id, { value })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select value field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </>
        )}

        {/* Treemap */}
        {config.type === "treemap" && (
            <>
            <div>
                <Label>Category/Hierarchy Field</Label>
                <Select value={config.category} onValueChange={category => onUpdate(config.id, { category })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select category field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Metric Field</Label>
                <Select value={config.metric} onValueChange={metric => onUpdate(config.id, { metric })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select metric field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </>
        )}

        {/* Sankey Chart */}
        {config.type === "sankey" && (
            <>
            <div>
                <Label>Source Field</Label>
                <Select value={config.source} onValueChange={source => onUpdate(config.id, { source })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select source field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Target Field</Label>
                <Select value={config.target} onValueChange={target => onUpdate(config.id, { target })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select target field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Value Field</Label>
                <Select value={config.value} onValueChange={value => onUpdate(config.id, { value })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select value field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field}>
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </>
        )}
        </div>
    </div>
    );
};
export default ChartConfigForm;