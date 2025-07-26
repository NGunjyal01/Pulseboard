import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, X } from 'lucide-react';
import { chartTypes } from './constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const ChartConfigForm = ({ config, columnOptions, onUpdate, onRemove }) => {
    const [selectedValues,setSelectedValues] = useState(config.values || []);
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
    
    const handleValueSelect = (value) => {
        if (!selectedValues.includes(value)) {
        const updatedValues = [...selectedValues, value]
        setSelectedValues(updatedValues)
        onUpdate(config.id, { values: updatedValues })
        }
    }

    const handleRemoveValue = (value) => {
        const updatedValues = selectedValues.filter(v => v !== value)
        setSelectedValues(updatedValues)
        onUpdate(config.id, { values: updatedValues })
    }
    return (
    <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            {chartType && <chartType.icon className="h-5 w-5" />}
            <h4 className="font-medium">{config.title || "Untitled Chart"}</h4>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onRemove(config.id)} className={"cursor-pointer"}>
            <Trash2 className="h-4 w-4" />
        </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className='space-y-2'>
            <Label>Chart Title</Label>
            <Input
            value={config.title}
            onChange={e => onUpdate(config.id, { title: e.target.value })}
            placeholder="Enter chart title"
            />
        </div>

        <div className='space-y-2'>
            <Label>Chart Type</Label>
            <Select value={config.type} onValueChange={type => onUpdate(config.id, { type })}>
            <SelectTrigger className="cursor-pointer">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {chartTypes.map(type => (
                <SelectItem key={type.id} value={type.id} className="cursor-pointer">
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
            <div className="space-y-4">
            {/* X-Axis Field */}
            <div className="space-y-2">
                <Label>X-Axis Field</Label>
                <Select value={config.xAxis} onValueChange={xAxis => onUpdate(config.id, { xAxis })}>
                <SelectTrigger className={`cursor-pointer ${!config.xAxis ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select X-axis field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions.map(field => (
                    <SelectItem key={field} value={field} className="cursor-pointer">
                        {field}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>

            {/* Value Fields */}
            <div className="space-y-2">
                <Label>Value Fields</Label>
                <Select value="" onValueChange={handleValueSelect}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select value field" />
                    </SelectTrigger>
                    <SelectContent>
                        {validColumnOptions
                        .filter(field => !selectedValues.includes(field))
                        .map(field => (
                            <SelectItem key={field} value={field}>
                            {field}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Selected Value Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                {selectedValues.map((value) => (
                    <Badge key={value} variant="secondary" className="flex items-center gap-1 pr-1">
                    {value}
                    <button type="button" onClick={() => handleRemoveValue(value)} className="ml-1 hover:text-red-500 cursor-pointer">
                        <X className="h-3.5 w-3.5" />
                    </button>
                    </Badge>
                ))}
                </div>
            </div>
            </div>
        )}

        {/* Composed Chart */}
        {config.type === "composed" && (
            <>
            <div className="space-y-2">
                <Label>X-Axis Field (Shared)</Label>
                <Select value={config.xAxis} onValueChange={xAxis => onUpdate(config.id, { xAxis })}>
                <SelectTrigger className={`cursor-pointer ${!config.xAxis ? 'border-red-500' : ''}`}>
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
                <Button size="sm" variant="outline" onClick={addSeries} className="cursor-pointer">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Series
                </Button>
                </div>
                {config.series?.map((series, index) => (
                <div key={index} className="border rounded p-3 my-2 w-[70%]">
                    <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Series {index + 1}</span>
                    <Button size="sm" variant="ghost" onClick={() => removeSeries(index)} className="cursor-pointer">
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
                    {/* <Input
                        placeholder="Color (hex)"
                        value={series.color}
                        onChange={e => updateSeries(index, { color: e.target.value })}
                    /> */}
                    </div>
                </div>
                ))}
            </div>
            </>
        )}

        {/* Pie, Radar Charts */}
        {/* {["pie", "radar"].includes(config.type) && (
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
        )} */}
        </div>
    </div>
    );
};
export default ChartConfigForm;