import React, { useState } from 'react';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import InfoPanel from './components/InfoPanel';
import { predictDiabetesRisk } from './utils/predictionModel';

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

function App() {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (data: PredictionData) => {
    setLoading(true);
    try {
      const result = await predictDiabetesRisk(data);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Risk Assessment</h2>
                <p className="text-gray-600">
                  Enter your health parameters below to assess your diabetes risk using our AI-powered prediction model.
                </p>
              </div>
              
              <PredictionForm onPredict={handlePredict} loading={loading} />
            </div>

            {/* Results Section */}
            {prediction && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Results</h2>
                  <p className="text-gray-600">
                    Based on your health parameters, here's your diabetes risk assessment:
                  </p>
                </div>
                
                <PredictionResult prediction={prediction} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <InfoPanel />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2025 DiabetesPredict. For educational purposes only.</p>
            <p className="mt-1">Always consult healthcare professionals for medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;