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

interface PredictionResult {
  risk: number;
  category: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  confidence: number;
  factors: string[];
  recommendations: string[];
}

export const predictDiabetesRisk = async (data: PredictionData): Promise<PredictionResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simplified risk calculation based on medical knowledge
  let riskScore = 0;
  const factors: string[] = [];
  
  // Glucose level assessment
  if (data.glucose > 140) {
    riskScore += 0.3;
    factors.push(`Elevated glucose level (${data.glucose} mg/dL) - Normal: <100 mg/dL`);
  } else if (data.glucose > 100) {
    riskScore += 0.15;
    factors.push(`Pre-diabetic glucose level (${data.glucose} mg/dL)`);
  }

  // BMI assessment
  if (data.bmi > 30) {
    riskScore += 0.25;
    factors.push(`Obesity (BMI: ${data.bmi}) - Increases insulin resistance`);
  } else if (data.bmi > 25) {
    riskScore += 0.1;
    factors.push(`Overweight (BMI: ${data.bmi}) - Moderate risk factor`);
  }

  // Age assessment
  if (data.age > 65) {
    riskScore += 0.2;
    factors.push(`Advanced age (${data.age} years) - Higher risk after 65`);
  } else if (data.age > 45) {
    riskScore += 0.1;
    factors.push(`Age ${data.age} years - Risk increases after 45`);
  }

  // Blood pressure assessment
  if (data.bloodPressure > 140) {
    riskScore += 0.15;
    factors.push(`High blood pressure (${data.bloodPressure} mmHg) - Often linked with diabetes`);
  }

  // Family history (diabetes pedigree function)
  if (data.diabetesPedigreeFunction > 0.5) {
    riskScore += 0.1;
    factors.push(`Strong family history of diabetes - Genetic predisposition`);
  }

  // Insulin level assessment
  if (data.insulin > 200) {
    riskScore += 0.1;
    factors.push(`High insulin levels (${data.insulin} μU/mL) - May indicate insulin resistance`);
  }

  // Pregnancies (for women)
  if (data.pregnancies > 0) {
    riskScore += data.pregnancies * 0.02;
    if (data.pregnancies > 4) {
      factors.push(`Multiple pregnancies (${data.pregnancies}) - Increased risk with each pregnancy`);
    }
  }

  // Ensure risk is between 0 and 1
  riskScore = Math.min(Math.max(riskScore, 0), 1);

  // Determine category
  let category: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  if (riskScore < 0.3) {
    category = 'Low Risk';
  } else if (riskScore < 0.6) {
    category = 'Moderate Risk';
  } else {
    category = 'High Risk';
  }

  // Generate recommendations based on risk factors
  const recommendations = generateRecommendations(data, factors);

  // Add some factors if none detected
  if (factors.length === 0) {
    factors.push('All major risk factors are within normal ranges');
  }

  return {
    risk: riskScore,
    category,
    confidence: 0.85 + Math.random() * 0.13, // 85-98% confidence
    factors,
    recommendations,
  };
};

const generateRecommendations = (data: PredictionData, factors: string[]): string[] => {
  const recommendations: string[] = [];

  if (data.glucose > 100) {
    recommendations.push('Monitor blood glucose levels regularly and consider dietary changes to reduce sugar intake');
  }

  if (data.bmi > 25) {
    recommendations.push('Maintain a healthy weight through balanced diet and regular exercise');
  }

  if (data.bloodPressure > 120) {
    recommendations.push('Monitor blood pressure and limit sodium intake');
  }

  if (data.age > 45) {
    recommendations.push('Schedule regular health checkups and diabetes screening');
  }

  // Default recommendations
  recommendations.push('Follow a balanced diet rich in vegetables, lean proteins, and whole grains');
  recommendations.push('Engage in at least 150 minutes of moderate-intensity exercise per week');
  recommendations.push('Maintain regular sleep schedule and manage stress levels');

  if (factors.length > 2) {
    recommendations.push('Consult with a healthcare provider for personalized diabetes prevention plan');
  }

  return recommendations.slice(0, 4); // Return max 4 recommendations
};