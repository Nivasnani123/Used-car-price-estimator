export interface CarData {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Excellent';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
  transmission: 'Manual' | 'Automatic';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon';
  engineSize: number;
  previousOwners: number;
}

export interface PredictionResult {
  predictedPrice: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  algorithm: string;
  confidence: number;
}

export interface ModelMetrics {
  rmse: number;
  r2: number;
  mae: number;
  crossValidationScore: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface ModelPerformance {
  algorithm: string;
  metrics: ModelMetrics;
  featureImportance: FeatureImportance[];
}