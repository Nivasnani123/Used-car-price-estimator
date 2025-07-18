import React from 'react';
import { ModelPerformance as ModelPerformanceType } from '../types/car';
import { BarChart, Award, TrendingUp, Target } from 'lucide-react';

interface ModelPerformanceProps {
  performance: ModelPerformanceType[];
}

const ModelPerformance: React.FC<ModelPerformanceProps> = ({ performance }) => {
  const getMetricColor = (value: number, metric: string) => {
    if (metric === 'r2' || metric === 'crossValidationScore') {
      if (value >= 0.9) return 'text-green-600';
      if (value >= 0.8) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (value <= 2000) return 'text-green-600';
      if (value <= 3000) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const formatMetric = (value: number, metric: string) => {
    if (metric === 'r2' || metric === 'crossValidationScore') {
      return (value * 100).toFixed(1) + '%';
    }
    return value.toLocaleString();
  };

  const getAlgorithmColor = (algorithm: string) => {
    switch (algorithm) {
      case 'Random Forest': return 'bg-blue-500';
      case 'Gradient Boosting': return 'bg-green-500';
      case 'XGBoost': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Model Performance</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {performance.map((model, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${getAlgorithmColor(model.algorithm)}`} />
                  <span className="font-medium text-gray-800">{model.algorithm}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-600">R² Score</span>
                    </div>
                    <div className={`text-xl font-bold ${getMetricColor(model.metrics.r2, 'r2')}`}>
                      {formatMetric(model.metrics.r2, 'r2')}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-600">RMSE</span>
                    </div>
                    <div className={`text-xl font-bold ${getMetricColor(model.metrics.rmse, 'rmse')}`}>
                      {formatMetric(model.metrics.rmse, 'rmse')}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Award size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-600">MAE</span>
                    </div>
                    <div className={`text-xl font-bold ${getMetricColor(model.metrics.mae, 'mae')}`}>
                      {formatMetric(model.metrics.mae, 'mae')}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BarChart size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-600">CV Score</span>
                    </div>
                    <div className={`text-xl font-bold ${getMetricColor(model.metrics.crossValidationScore, 'crossValidationScore')}`}>
                      {formatMetric(model.metrics.crossValidationScore, 'crossValidationScore')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Importance */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Feature Importance</h3>
          <div className="space-y-3">
            {performance[0]?.featureImportance.map((feature, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{feature.feature}</span>
                <div className="flex items-center gap-2 flex-1 ml-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${feature.importance * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {(feature.importance * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Award className="text-yellow-500" size={20} />
          <h3 className="font-semibold text-gray-800">Best Performing Model</h3>
        </div>
        <div className="text-sm text-gray-700">
          <p className="mb-1">
            <strong>Algorithm:</strong> {performance.reduce((best, current) => 
              current.metrics.r2 > best.metrics.r2 ? current : best
            ).algorithm}
          </p>
          <p>
            <strong>R² Score:</strong> {formatMetric(performance.reduce((best, current) => 
              current.metrics.r2 > best.metrics.r2 ? current : best
            ).metrics.r2, 'r2')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;