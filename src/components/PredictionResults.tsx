import React from 'react';
import { PredictionResult } from '../types/car';
import { TrendingUp, Target, BarChart3 } from 'lucide-react';

interface PredictionResultsProps {
  results: PredictionResult[];
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ results }) => {
  if (results.length === 0) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAlgorithmColor = (algorithm: string) => {
    switch (algorithm) {
      case 'Random Forest': return 'bg-blue-100 text-blue-800';
      case 'Gradient Boosting': return 'bg-green-100 text-green-800';
      case 'XGBoost': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-green-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Price Predictions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlgorithmColor(result.algorithm)}`}>
                {result.algorithm}
              </span>
              <div className="flex items-center gap-1">
                <Target size={16} className={getConfidenceColor(result.confidence)} />
                <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                  {(result.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {formatCurrency(result.predictedPrice)}
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                Confidence Interval
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Low: {formatCurrency(result.confidenceInterval.lower)}
                </span>
                <span className="text-gray-600">
                  High: {formatCurrency(result.confidenceInterval.upper)}
                </span>
              </div>
              
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="text-blue-600" size={20} />
          <h3 className="font-semibold text-blue-800">Model Comparison</h3>
        </div>
        <div className="text-sm text-blue-700">
          <p className="mb-1">
            <strong>Best Performance:</strong> {results.reduce((best, current) => 
              current.confidence > best.confidence ? current : best
            ).algorithm}
          </p>
          <p>
            <strong>Average Prediction:</strong> {formatCurrency(
              results.reduce((sum, result) => sum + result.predictedPrice, 0) / results.length
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;