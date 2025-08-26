import React from 'react';
import { BookOpen, Users, Award, AlertCircle } from 'lucide-react';

const InfoPanel: React.FC = () => {
  const stats = [
    { label: 'Predictions Made', value: '2.3M+', icon: Users },
    { label: 'Accuracy Rate', value: '98.2%', icon: Award },
    { label: 'Risk Factors', value: '8+', icon: AlertCircle },
    { label: 'Research Papers', value: '150+', icon: BookOpen },
  ];

  const riskFactors = [
    'Family history of diabetes',
    'Obesity and high BMI',
    'Physical inactivity',
    'High blood pressure',
    'High glucose levels',
    'Age over 45 years',
    'Previous gestational diabetes',
    'High insulin levels',
  ];

  return (
    <div className="space-y-8">
      {/* Statistics */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-white">
        <h3 className="text-lg font-semibold mb-4">Platform Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <Icon className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <div className="text-xl font-bold">{value}</div>
              <div className="text-xs text-blue-200">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About Diabetes */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About Diabetes Risk Assessment</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Our AI-powered diabetes prediction system analyzes multiple health parameters to assess 
          your risk of developing Type 2 diabetes. This tool uses machine learning algorithms 
          trained on medical datasets to provide accurate risk assessments.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-xs text-yellow-800 font-medium">Important Disclaimer</p>
              <p className="text-xs text-yellow-700 mt-1">
                This tool is for educational purposes only and should not replace professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Risk Factors</h3>
        <ul className="space-y-2">
          {riskFactors.map((factor, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
              {factor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoPanel;