import React from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, Info } from 'lucide-react';

interface PredictionResultProps {
  prediction: {
    risk: number;
    category: 'Low Risk' | 'Moderate Risk' | 'High Risk';
    confidence: number;
    factors: string[];
    recommendations: string[];
  };
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const getRiskColor = (category: string) => {
    switch (category) {
      case 'Low Risk':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderate Risk':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'High Risk':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (category: string) => {
    switch (category) {
      case 'Low Risk':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'Moderate Risk':
        return <TrendingUp className="w-8 h-8 text-orange-600" />;
      case 'High Risk':
        return <AlertTriangle className="w-8 h-8 text-red-600" />;
      default:
        return <Info className="w-8 h-8 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Risk Assessment Card */}
      <div className={`p-6 rounded-lg border-2 ${getRiskColor(prediction.category)}`}>
        <div className="flex items-center gap-4 mb-4">
          {getRiskIcon(prediction.category)}
          <div>
            <h3 className="text-2xl font-bold">{prediction.category}</h3>
            <p className="text-sm opacity-75">Risk Score: {(prediction.risk * 100).toFixed(1)}%</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${
              prediction.category === 'Low Risk' ? 'bg-green-500' :
              prediction.category === 'Moderate Risk' ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${prediction.risk * 100}%` }}
          ></div>
        </div>
        
        <p className="text-sm">
          Model Confidence: {(prediction.confidence * 100).toFixed(1)}%
        </p>
      </div>

      {/* Key Risk Factors */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Key Risk Factors
        </h4>
        <ul className="space-y-2">
          {prediction.factors.map((factor, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span className="text-gray-700">{factor}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          Recommendations
        </h4>
        <ul className="space-y-3">
          {prediction.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <span className="text-blue-800">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PredictionResult;