import React, { useState } from 'react';
import { Calculator, Heart, Activity } from 'lucide-react';

interface PredictionData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

interface PredictionFormProps {
  onPredict: (data: PredictionData) => void;
  loading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict, loading }) => {
  const [formData, setFormData] = useState<PredictionData>({
    pregnancies: 0,
    glucose: 120,
    bloodPressure: 80,
    skinThickness: 20,
    insulin: 80,
    bmi: 25,
    diabetesPedigreeFunction: 0.5,
    age: 30,
  });

  const handleChange = (field: keyof PredictionData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const formFields = [
    { key: 'pregnancies', label: 'Number of Pregnancies', min: 0, max: 20, step: 1, icon: Heart },
    { key: 'glucose', label: 'Glucose Level (mg/dL)', min: 0, max: 300, step: 1, icon: Activity },
    { key: 'bloodPressure', label: 'Blood Pressure (mmHg)', min: 0, max: 200, step: 1, icon: Activity },
    { key: 'skinThickness', label: 'Skin Thickness (mm)', min: 0, max: 100, step: 1, icon: Calculator },
    { key: 'insulin', label: 'Insulin Level (μU/mL)', min: 0, max: 900, step: 1, icon: Activity },
    { key: 'bmi', label: 'BMI (kg/m²)', min: 0, max: 70, step: 0.1, icon: Calculator },
    { key: 'diabetesPedigreeFunction', label: 'Diabetes Pedigree Function', min: 0, max: 3, step: 0.01, icon: Heart },
    { key: 'age', label: 'Age (years)', min: 0, max: 120, step: 1, icon: Calculator },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map(({ key, label, min, max, step, icon: Icon }) => (
          <div key={key} className="space-y-2">
            <label htmlFor={key} className="flex items-center text-sm font-medium text-gray-700 gap-2">
              <Icon className="w-4 h-4 text-blue-500" />
              {label}
            </label>
            <input
              type="number"
              id={key}
              min={min}
              max={max}
              step={step}
              value={formData[key as keyof PredictionData]}
              onChange={(e) => handleChange(key as keyof PredictionData, parseFloat(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>
        ))}
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Analyzing...
          </div>
        ) : (
          'Predict Diabetes Risk'
        )}
      </button>
    </form>
  );
};

export default PredictionForm;