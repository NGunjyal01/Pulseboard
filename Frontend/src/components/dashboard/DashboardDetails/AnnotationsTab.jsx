import { useMemo } from "react";
import { StickyNote, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import useDashboardStore from "@/store/useDashboardStore"
import { useDashboardSocket } from "@/hooks/useDashboardSocket";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Label } from "@/components/ui/label";

const AnnotationsTab = () => {
    const colorOptions = [
        { name: "Blue", value: "#3b82f6" },
        { name: "Red", value: "#ef4444" },
        { name: "Green", value: "#10b981" },
        { name: "Yellow", value: "#f59e0b" },
        { name: "Purple", value: "#8b5cf6" },
        { name: "Pink", value: "#ec4899" },
    ]
    
    const { dashboardId, annotations, dashboardDetails, dataSample } = useDashboardStore();
    const { charts } = dashboardDetails;
    const { sendAnnotation } = useDashboardSocket(dashboardId);
    const [isAnnotationDialogOpen, setIsAnnotationDialogOpen] = useState(false)
    const [newAnnotation, setNewAnnotation] = useState({
        type: undefined,
        chartId: "",
        x: undefined,
        y: undefined,
        x1: undefined,
        x2: undefined,
        y1: undefined,
        y2: undefined,
        label: "",
        color: "#3b82f6",
    })

    // Get selected chart data
    const selectedChart = useMemo(() => 
        charts.find(c => c._id === newAnnotation.chartId),
        [newAnnotation.chartId, charts]
    );

    // Get unique X axis values
    const xAxisValues = useMemo(() => {
        if (!selectedChart?.dataMapping?.xAxis || !dataSample.length) return [];
        const xAxisField = selectedChart.dataMapping.xAxis;
        
        return Array.from(new Set(dataSample.map(item => item[xAxisField])))
            .filter(value => value !== undefined && value !== null)
            .sort();
    }, [selectedChart, dataSample]);

    // Get available Y-axis fields for the selected chart
    const yAxisFields = useMemo(() => {
        if (!selectedChart) return [];
        
        if (selectedChart.type === "composed" && selectedChart.composedConfig) {
            // For composed charts, get values from composedConfig
            return selectedChart.composedConfig.map(config => config.value);
        } else if (selectedChart.values) {
            // For other chart types, get values from values array
            return selectedChart.values;
        }
        
        return [];
    }, [selectedChart]);

    // Get min and max values for Y-axis fields
    const yAxisRanges = useMemo(() => {
        if (!selectedChart || !dataSample.length || !yAxisFields.length) return {};
        
        const ranges = {};
        
        yAxisFields.forEach(field => {
            const values = dataSample
                .map(item => item[field])
                .filter(value => value !== undefined && value !== null && !isNaN(value));
            
            if (values.length > 0) {
                ranges[field] = {
                    min: Math.min(...values),
                    max: Math.max(...values)
                };
            }
        });
        
        return ranges;
    }, [selectedChart, dataSample, yAxisFields]);

    // Check if Y values are within valid range
    const isYValueValid = (value) => {
        if (value === undefined || value === null || value === "") return true;
        if (Object.keys(yAxisRanges).length === 0) return true;
        
        const numValue = Number(value);
        const overallMin = Math.min(...Object.values(yAxisRanges).map(r => r.min));
        const overallMax = Math.max(...Object.values(yAxisRanges).map(r => r.max));
        
        return numValue >= overallMin && numValue <= overallMax;
    };

    const handleTypeChange = (type) => {
        setNewAnnotation((prev) => ({
            ...prev,
            type: type || undefined,
            // Reset position fields when type changes
            x: undefined,
            y: undefined,
            x1: undefined,
            x2: undefined,
            y1: undefined,
            y2: undefined,
        }))
    }

    const handleChartChange = (chartId) => {
        setNewAnnotation((prev) => ({
            ...prev,
            chartId: chartId || "",
            // Reset all position fields when chart changes
            x: undefined,
            y: undefined,
            x1: undefined,
            x2: undefined,
            y1: undefined,
            y2: undefined,
        }))
    }

    const handleAddAnnotation = () => {
        if (!newAnnotation.type || !newAnnotation.chartId) return;
        
        // Validate Y values are within range
        const yValid = isYValueValid(newAnnotation.y);
        const y1Valid = isYValueValid(newAnnotation.y1);
        const y2Valid = isYValueValid(newAnnotation.y2);
        
        if (!yValid || !y1Valid || !y2Valid) return;
        
        let isValid = false;
        switch (newAnnotation.type) {
            case "line":
                isValid = (newAnnotation.x !== undefined && newAnnotation.y === undefined) ||
                         (newAnnotation.y !== undefined && newAnnotation.x === undefined);
                break;
            case "point":
                isValid = newAnnotation.x !== undefined && newAnnotation.y !== undefined;
                break;
            case "area":
                isValid = newAnnotation.x1 !== undefined || newAnnotation.x2 !== undefined ||
                         newAnnotation.y1 !== undefined || newAnnotation.y2 !== undefined;
                break;
        }

        if (!isValid) return;

        // Prepare annotation data for server
        const annotation = {
            id: Date.now().toString(),
            type: newAnnotation.type,
            chartId: newAnnotation.chartId,
            // Store actual values
            ...(newAnnotation.x !== undefined && { x: newAnnotation.x }),
            ...(newAnnotation.y !== undefined && { y: Number(newAnnotation.y) }),
            ...(newAnnotation.x1 !== undefined && { x1: newAnnotation.x1 }),
            ...(newAnnotation.x2 !== undefined && { x2: newAnnotation.x2 }),
            ...(newAnnotation.y1 !== undefined && { y1: Number(newAnnotation.y1) }),
            ...(newAnnotation.y2 !== undefined && { y2: Number(newAnnotation.y2) }),
            label: newAnnotation.label,
            color: newAnnotation.color || "#3b82f6",
        };

        sendAnnotation(annotation);

        // Reset form
        setNewAnnotation({
            type: undefined,
            chartId: "",
            x: undefined,
            y: undefined,
            x1: undefined,
            x2: undefined,
            y1: undefined,
            y2: undefined,
            label: "",
            color: "#3b82f6",
        });
        setIsAnnotationDialogOpen(false);
    }

    // Helper function to get filtered X values for X2 (greater than X1)
    const getFilteredX2Values = useMemo(() => {
        if (!newAnnotation.x1) return xAxisValues;
        
        const x1Index = xAxisValues.findIndex(val => val.toString() === newAnnotation.x1);
        return xAxisValues.slice(x1Index + 1); // Only values after X1
    }, [xAxisValues, newAnnotation.x1]);

    // Helper function to validate Y2 > Y1
    const isY2Valid = newAnnotation.y2 === undefined || 
                     newAnnotation.y1 === undefined || 
                     Number(newAnnotation.y2) > Number(newAnnotation.y1);

    // Check if Y values are out of range
    const isYOutOfRange = !isYValueValid(newAnnotation.y);
    const isY1OutOfRange = !isYValueValid(newAnnotation.y1);
    const isY2OutOfRange = !isYValueValid(newAnnotation.y2);

    // Get overall Y range for display
    const overallYRange = useMemo(() => {
        if (Object.keys(yAxisRanges).length === 0) return null;
        
        const overallMin = Math.min(...Object.values(yAxisRanges).map(r => r.min));
        const overallMax = Math.max(...Object.values(yAxisRanges).map(r => r.max));
        
        return { min: overallMin, max: overallMax };
    }, [yAxisRanges]);

    return (
        <>
            <div className="space-y-4">
                {/* Existing annotations display */}
                {annotations.map((annotation) => {
                    const {_id,color,label,type,chartId,position} = annotation;
                    const {x,y,x1,x2,y1,y2} = position;
                    return(
                    <div key={_id} className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                <span className="font-medium text-sm">
                                    {label || `${type} annotation`}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                    {charts.find((c) => c._id === chartId)?.title}
                                </Badge>
                            </div>
                            <Button variant="ghost" size="sm" className={'cursor-pointer'}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {type === "line" && <>Line at {x !== undefined ? `X: ${x}` : `Y: ${y}`}</>}
                            {type === "point" && <>Point at ({x}, {y})</>}
                            {type === "area" && (<>Area:{" "}
                                    {[
                                        x1 !== undefined && `X1: ${x1}`,
                                        x2 !== undefined && `X2: ${x2}`,
                                        y1 !== undefined && `Y1: ${y1}`,
                                        y2 !== undefined && `Y2: ${y2}`,
                                    ].filter(Boolean).join(", ")}
                                </>
                            )}
                        </p>
                    </div>
                )})}
            </div>

            <Dialog open={isAnnotationDialogOpen} onOpenChange={setIsAnnotationDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                        <StickyNote className="h-4 w-4 mr-2" />
                        Add Annotation
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Annotation</DialogTitle>
                        <DialogDescription>Add a visual annotation to highlight important data points</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        {/* Annotation Type */}
                        <div>
                            <Label className="block text-sm font-medium text-muted-foreground">
                                Annotation Type *
                            </Label>
                            <Select value={newAnnotation.type || ""} onValueChange={handleTypeChange}>
                                <SelectTrigger className="mt-2 w-full cursor-pointer">
                                    <SelectValue placeholder="Select annotation type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="line" className="cursor-pointer">Line</SelectItem>
                                    <SelectItem value="point" className="cursor-pointer">Point</SelectItem>
                                    <SelectItem value="area" className="cursor-pointer">Area</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Select Chart */}
                        <div>
                            <Label className="block text-sm font-medium text-muted-foreground">Select Chart *</Label>
                            <Select 
                                value={newAnnotation.chartId} 
                                onValueChange={handleChartChange}
                            >
                                <SelectTrigger className="mt-2 w-full cursor-pointer">
                                    <SelectValue placeholder="Choose a chart" />
                                </SelectTrigger>
                                <SelectContent>
                                    {charts.map((chart) => (
                                        <SelectItem key={chart._id} value={chart._id} className="cursor-pointer">
                                            {chart.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Dynamic Position Fields */}
                        {newAnnotation.type && newAnnotation.chartId && (
                            <div>
                                <Label className="block text-sm font-medium text-muted-foreground mb-2">Position *</Label>

                                {/* LINE Annotation */}
                                {newAnnotation.type === "line" && (
                                    <div className="space-y-3">
                                        <p className="text-xs text-muted-foreground">Choose either X or Y coordinate (not both)</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {/* X Coordinate Dropdown */}
                                            <div>
                                                <Label className="block text-xs font-medium text-muted-foreground">X coordinate</Label>
                                                <Select
                                                    value={newAnnotation.x?.toString() || ""}
                                                    onValueChange={(value) => {
                                                        setNewAnnotation(prev => ({
                                                            ...prev,
                                                            x: value === "reset" ? undefined : value,
                                                            y: undefined
                                                        }))
                                                    }}
                                                    disabled={newAnnotation.y !== undefined}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select X value" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="reset" className="cursor-pointer text-muted-foreground">
                                                            -- Clear selection --
                                                        </SelectItem>
                                                        {xAxisValues.map((value, index) => (
                                                            <SelectItem key={index} value={value.toString()} className="cursor-pointer">
                                                                {value.toString()}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Y Coordinate Number Input */}
                                            <div>
                                                <Label className="block text-xs font-medium text-muted-foreground">Y coordinate</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter Y value"
                                                        value={newAnnotation.y || ""}
                                                        onChange={(e) => {
                                                            const value = e.target.value ? Number(e.target.value) : undefined;
                                                            setNewAnnotation(prev => ({
                                                                ...prev,
                                                                y: value,
                                                                x: undefined
                                                            }));
                                                        }}
                                                        className="flex-1"
                                                        disabled={newAnnotation.x !== undefined}
                                                        step="any"
                                                        min={overallYRange ? overallYRange.min : undefined}
                                                        max={overallYRange ? overallYRange.max : undefined}
                                                    />
                                                    {newAnnotation.y !== undefined && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setNewAnnotation(prev => ({ ...prev, y: undefined }))}
                                                            className="h-10"
                                                        >
                                                            ×
                                                        </Button>
                                                    )}
                                                </div>
                                                {isYOutOfRange && (
                                                    <p className="text-xs text-red-500 mt-1">
                                                        Y value is out of range. Valid range: {overallYRange?.min.toFixed(2)} to {overallYRange?.max.toFixed(2)}
                                                    </p>
                                                )}
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Available Y fields: {yAxisFields.join(", ")}
                                                    {overallYRange && (
                                                        <span className="block">Range: {overallYRange.min.toFixed(2)} to {overallYRange.max.toFixed(2)}</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* POINT Annotation */}
                                {newAnnotation.type === "point" && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {/* X Coordinate Dropdown */}
                                        <div>
                                            <Label className="block text-xs font-medium text-muted-foreground">X coordinate</Label>
                                            <Select
                                                value={newAnnotation.x?.toString() || ""}
                                                onValueChange={(value) => {
                                                    setNewAnnotation(prev => ({
                                                        ...prev,
                                                        x: value === "reset" ? undefined : value
                                                    }))
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select X value" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="reset" className="cursor-pointer text-muted-foreground">
                                                        -- Clear selection --
                                                    </SelectItem>
                                                    {xAxisValues.map((value, index) => (
                                                        <SelectItem key={index} value={value.toString()} className="cursor-pointer">
                                                            {value.toString()}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Y Coordinate Number Input */}
                                        <div>
                                            <Label className="block text-xs font-medium text-muted-foreground">Y coordinate</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Enter Y value"
                                                    value={newAnnotation.y || ""}
                                                    onChange={(e) => {
                                                        const value = e.target.value ? Number(e.target.value) : undefined;
                                                        setNewAnnotation(prev => ({ ...prev, y: value }));
                                                    }}
                                                    className="flex-1"
                                                    step="any"
                                                    min={overallYRange ? overallYRange.min : undefined}
                                                    max={overallYRange ? overallYRange.max : undefined}
                                                />
                                                {newAnnotation.y !== undefined && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setNewAnnotation(prev => ({ ...prev, y: undefined }))}
                                                        className="h-10"
                                                    >
                                                        ×
                                                    </Button>
                                                )}
                                            </div>
                                            {isYOutOfRange && (
                                                <p className="text-xs text-red-500 mt-1">
                                                    Y value is out of range. Valid range: {overallYRange?.min.toFixed(2)} to {overallYRange?.max.toFixed(2)}
                                                </p>
                                            )}
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Available Y fields: {yAxisFields.join(", ")}
                                                {overallYRange && (
                                                    <span className="block">Range: {overallYRange.min.toFixed(2)} to {overallYRange.max.toFixed(2)}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* AREA Annotation */}
                                {newAnnotation.type === "area" && (
                                    <div className="space-y-3">
                                        <p className="text-xs text-muted-foreground">
                                            Provide at least one coordinate (x1, x2, y1, or y2)
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {/* X1 Dropdown */}
                                            <div>
                                                <Label className="block text-xs font-medium text-muted-foreground">X1 (start)</Label>
                                                <Select
                                                    value={newAnnotation.x1?.toString() || ""}
                                                    onValueChange={(value) => {
                                                        setNewAnnotation(prev => ({ 
                                                            ...prev, 
                                                            x1: value === "reset" ? undefined : value,
                                                            x2: undefined // Reset X2 when X1 changes
                                                        }));
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select X1" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="reset" className="cursor-pointer text-muted-foreground">
                                                            -- Clear selection --
                                                        </SelectItem>
                                                        {xAxisValues.map((value, index) => (
                                                            <SelectItem key={index} value={value.toString()} className="cursor-pointer">
                                                                {value.toString()}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* X2 Dropdown */}
                                            <div>
                                                <Label className="block text-xs font-medium text-muted-foreground">X2 (end)</Label>
                                                <Select
                                                    value={newAnnotation.x2?.toString() || ""}
                                                    onValueChange={(value) => {
                                                        setNewAnnotation(prev => ({ 
                                                            ...prev, 
                                                            x2: value === "reset" ? undefined : value 
                                                        }));
                                                    }}
                                                    disabled={!newAnnotation.x1}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={newAnnotation.x1 ? "Select X2" : "Select X1 first"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="reset" className="cursor-pointer text-muted-foreground">
                                                            -- Clear selection --
                                                        </SelectItem>
                                                        {getFilteredX2Values.map((value, index) => (
                                                            <SelectItem key={index} value={value.toString()} className="cursor-pointer">
                                                                {value.toString()}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {newAnnotation.x2 && newAnnotation.x1 && newAnnotation.x2 <= newAnnotation.x1 && (
                                                    <p className="text-xs text-red-500 mt-1">
                                                        X2 must be greater than X1
                                                    </p>
                                                )}
                                            </div>

                                            {/* Y1 Number Input */}
                                            <div>
                                                <Label className="block text-xs font-medium text-muted-foreground">Y1 (start)</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="number"
                                                        placeholder="Y start value"
                                                        value={newAnnotation.y1 || ""}
                                                        onChange={(e) => {
                                                            const value = e.target.value ? Number(e.target.value) : undefined;
                                                            setNewAnnotation(prev => ({ 
                                                                ...prev, 
                                                                y1: value,
                                                                y2: undefined // Reset Y2 when Y1 changes
                                                            }));
                                                        }}
                                                        className="flex-1"
                                                        step="any"
                                                        min={overallYRange ? overallYRange.min : undefined}
                                                        max={overallYRange ? overallYRange.max : undefined}
                                                    />
                                                    {newAnnotation.y1 !== undefined && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setNewAnnotation(prev => ({ ...prev, y1: undefined }))}
                                                            className="h-10"
                                                        >
                                                            ×
                                                        </Button>
                                                    )}
                                                </div>
                                                {isY1OutOfRange && (
                                                    <p className="text-xs text-red-500 mt-1">
                                                        Y1 value is out of range. Valid range: {overallYRange?.min.toFixed(2)} to {overallYRange?.max.toFixed(2)}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Y2 Number Input */}
                                            <div>
                                                <Label className="block text-xs font-medium text-muted-foreground">Y2 (end)</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="number"
                                                        placeholder={newAnnotation.y1 ? "Y end value" : "Set Y1 first"}
                                                        value={newAnnotation.y2 || ""}
                                                        onChange={(e) => {
                                                            const value = e.target.value ? Number(e.target.value) : undefined;
                                                            setNewAnnotation(prev => ({ ...prev, y2: value }));
                                                        }}
                                                        className="flex-1"
                                                        disabled={!newAnnotation.y1}
                                                        step="any"
                                                        min={overallYRange ? overallYRange.min : undefined}
                                                        max={overallYRange ? overallYRange.max : undefined}
                                                    />
                                                    {newAnnotation.y2 !== undefined && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setNewAnnotation(prev => ({ ...prev, y2: undefined }))}
                                                            className="h-10"
                                                        >
                                                            ×
                                                        </Button>
                                                    )}
                                                </div>
                                                {isY2OutOfRange && (
                                                    <p className="text-xs text-red-500 mt-1">
                                                        Y2 value is out of range. Valid range: {overallYRange?.min.toFixed(2)} to {overallYRange?.max.toFixed(2)}
                                                    </p>
                                                )}
                                                {!isY2Valid && (
                                                    <p className="text-xs text-red-500 mt-1">
                                                        Y2 must be greater than Y1
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Available Y fields: {yAxisFields.join(", ")}
                                            {overallYRange && (
                                                <span className="block">Range: {overallYRange.min.toFixed(2)} to {overallYRange.max.toFixed(2)}</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Label */}
                        <div>
                            <Label className="block text-sm font-medium text-muted-foreground">Label (optional)</Label>
                            <Input
                                placeholder="Enter annotation label"
                                value={newAnnotation.label}
                                onChange={(e) => setNewAnnotation(prev => ({ ...prev, label: e.target.value }))}
                                className="mt-2"
                            />
                        </div>

                        {/* Color */}
                        <div>
                            <Label className="block text-sm font-medium text-muted-foreground">Color (optional)</Label>
                            <div className="flex gap-2 mt-2">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        className={`w-8 h-8 rounded-full border-2 ${
                                            newAnnotation.color === color.value
                                            ? "border-gray-400 ring-2 ring-offset-2 ring-gray-300"
                                            : "border-gray-200"
                                        }`}
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => setNewAnnotation(prev => ({ ...prev, color: color.value }))}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Validation Helper */}
                        {newAnnotation.type && (
                            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                                <strong>Validation:</strong>{" "}
                                {newAnnotation.type === "line" && "Provide exactly one of X or Y coordinate"}
                                {newAnnotation.type === "point" && "Both X and Y coordinates are required"}
                                {newAnnotation.type === "area" && "At least one coordinate (X1, X2, Y1, or Y2) is required"}
                                {(isYOutOfRange || isY1OutOfRange || isY2OutOfRange) && (
                                    <span className="block text-red-500 mt-1">Some Y values are out of range</span>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setIsAnnotationDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleAddAnnotation} 
                                disabled={
                                    !newAnnotation.type || 
                                    !newAnnotation.chartId || 
                                    isYOutOfRange || 
                                    isY1OutOfRange || 
                                    isY2OutOfRange
                                }
                            >
                                Add Annotation
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AnnotationsTab;