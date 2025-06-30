// src/components/dashboard/CreateDashboard/ProgressIndicator.jsx
import React from 'react';

const ProgressIndicator = ({ step }) => {
    const steps = [
        { step: 1, label: "Basic Info" },
        { step: 2, label: "Data Source" },
        { step: 3, label: "Configure Charts" },
    ];

    return (
    <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
        {steps.map(({ step: stepNumber, label }) => (
            <div key={stepNumber} className="flex items-center">
            <div className="flex flex-col items-center">
                <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
                >
                {stepNumber}
                </div>
                <span className="text-xs mt-1 text-muted-foreground">{label}</span>
            </div>
            {stepNumber < 3 && (
                <div
                className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}
                />
            )}
            </div>
        ))}
        </div>
    </div>
    );
};

export default ProgressIndicator;