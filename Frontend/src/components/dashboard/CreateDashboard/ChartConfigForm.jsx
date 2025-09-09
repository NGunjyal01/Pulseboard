import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, X } from 'lucide-react';
import { chartTypes } from './constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const ChartConfigForm = ({ config, columnOptions, onUpdate, onRemove }) => {
    const [selectedValues, setSelectedValues] = useState(config.values || []);
    const chartType = chartTypes.find(t => t.id === config.type);
    const validColumnOptions = columnOptions.filter(opt => opt && opt.trim() !== "");
    console.log(config)

    useEffect(() => {
        if (config.type === "composed" && !config.composedConfig) {
            onUpdate(config.id, { composedConfig: [] });
        }
    }, [config.type, config.id, config.composedConfig, onUpdate]);

    const addComposedSeries = () => {
        const newSeries = {
            value: "",
            viewType: "line",
        };
        onUpdate(config.id, {
            composedConfig: [...(config.composedConfig || []), newSeries],
        });
    };

    const updateComposedSeries = (index, updates) => {
        const newSeries = [...(config.composedConfig || [])];
        newSeries[index] = { ...newSeries[index], ...updates };
        onUpdate(config.id, { composedConfig: newSeries });
    };

    const removeComposedSeries = (index) => {
        const newSeries = [...(config.composedConfig || [])];
        newSeries.splice(index, 1);
        onUpdate(config.id, { composedConfig: newSeries });
    };

    const handleValueSelect = (value) => {
        if (!selectedValues.includes(value)) {
            const updatedValues = [...selectedValues, value];
            setSelectedValues(updatedValues);
            onUpdate(config.id, { values: updatedValues });
        }
    };

    const handleRemoveValue = (value) => {
        const updatedValues = selectedValues.filter((v) => v !== value);
        setSelectedValues(updatedValues);
        onUpdate(config.id, { values: updatedValues });
    };

    const handleChartTypeChange = (type) => {
        setSelectedValues([]); // reset values state

        if (type === "composed") {
            onUpdate(config.id, {
            type,
            'dataMapping.xAxis': undefined,
            values: [],
            composedConfig: [],
            });
        } else {
            onUpdate(config.id, {
            type,
            'dataMapping.xAxis': undefined,
            values: [],
            composedConfig: undefined,
            });
        }
    };

    return (
    <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            {chartType && <chartType.icon className="h-5 w-5" />}
            <h4 className="font-medium">{config.title || "Untitled Chart"}</h4>
        </div>
        <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(config.id)}
            className={"cursor-pointer"}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label>Chart Title</Label>
            <Input
            value={config.title}
            onChange={(e) => onUpdate(config.id, { title: e.target.value })}
            placeholder="Enter chart title"
            />
        </div>

        <div className="space-y-2">
            <Label>Chart Type</Label>
            <Select value={config.type} onValueChange={handleChartTypeChange}>
            <SelectTrigger className="cursor-pointer">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {chartTypes.map((type) => (
                <SelectItem
                    key={type.id}
                    value={type.id}
                    className="cursor-pointer"
                >
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
                <Select value={config.dataMapping.xAxis || ""}
                  onValueChange={(xAxis) => onUpdate(config.id, { dataMapping: {...config.dataMapping,xAxis: xAxis}})}
                >
                <SelectTrigger className={`cursor-pointer`}>
                    <SelectValue placeholder="Select X-axis field" />
                </SelectTrigger>
                <SelectContent>
                    {validColumnOptions
                    .filter((field) => !selectedValues.includes(field)) // exclude chosen values
                    .map((field) => (
                        <SelectItem
                        key={field}
                        value={field}
                        className="cursor-pointer"
                        >
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
                    .filter(
                        (field) =>
                        !selectedValues.includes(field) &&
                        field !== config.dataMapping.xAxis // exclude xAxis
                    )
                    .map((field) => (
                        <SelectItem key={field} value={field}>
                        {field}
                        </SelectItem>
                    ))}
                </SelectContent>
                </Select>

                {/* Selected Value Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                {selectedValues.map((value) => (
                    <Badge
                    key={value}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1"
                    >
                    {value}
                    <button
                        type="button"
                        onClick={() => handleRemoveValue(value)}
                        className="ml-1 hover:text-red-500 cursor-pointer"
                    >
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
            <Select value={config.dataMapping.xAxis || ""}
                onValueChange={(xAxis) => onUpdate(config.id, { dataMapping: { ...config.dataMapping, xAxis: xAxis }})}
            >
                <SelectTrigger
                className={`cursor-pointer`}
                >
                <SelectValue placeholder="Select shared X-axis field" />
                </SelectTrigger>
                <SelectContent>
                {validColumnOptions.map((field) => (
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
                <Button
                size="sm"
                variant="outline"
                onClick={addComposedSeries}
                className="cursor-pointer"
                >
                <Plus className="h-4 w-4 mr-1" />
                Add Series
                </Button>
            </div>

            {config.composedConfig?.map((series, index) => (
                <div key={index} className="border rounded p-3 my-2 w-[70%]">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Series {index + 1}</span>
                    <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeComposedSeries(index)}
                    className="cursor-pointer"
                    >
                    <X className="h-3 w-3" />
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {/* Series type */}
                    <Select
                    value={series.viewType}
                    onValueChange={(viewType) => updateComposedSeries(index, { viewType })}
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

                    {/* Series value field with duplicate + xAxis filter */}
                    <Select
                    value={series.value}
                    onValueChange={value => updateComposedSeries(index, { value })}
                    >
                    <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                        {validColumnOptions
                        // remove xAxis if selected
                        .filter(field => !config.dataMapping.xAxis || field !== config.dataMapping.xAxis)
                        // remove already selected by other series
                        .filter(field => !config.composedConfig?.some((s, i) => i !== index && s.value === field))
                        .map(field => (
                            <SelectItem key={field} value={field}>
                            {field}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>

                </div>
                </div>
            ))}
            </div>
        </>
        )}

        </div>
    </div>
    );
};

export default ChartConfigForm;