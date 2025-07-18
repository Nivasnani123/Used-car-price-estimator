import React from 'react';
import { sampleCarData } from '../data/sampleData';
import { BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react';

const DataVisualization: React.FC = () => {
  const conditionCounts = sampleCarData.reduce((acc, car) => {
    acc[car.condition] = (acc[car.condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const fuelTypeCounts = sampleCarData.reduce((acc, car) => {
    acc[car.fuelType] = (acc[car.fuelType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const makeCounts = sampleCarData.reduce((acc, car) => {
    acc[car.make] = (acc[car.make] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getConditionColor = (condition: string) => {
    const colors = {
      'Poor': 'bg-red-500',
      'Fair': 'bg-orange-500',
      'Good': 'bg-yellow-500',
      'Very Good': 'bg-green-500',
      'Excellent': 'bg-emerald-500'
    };
    return colors[condition as keyof typeof colors] || 'bg-gray-500';
  };

  const getFuelTypeColor = (fuelType: string) => {
    const colors = {
      'Petrol': 'bg-blue-500',
      'Diesel': 'bg-gray-700',
      'Electric': 'bg-green-500',
      'Hybrid': 'bg-purple-500'
    };
    return colors[fuelType as keyof typeof colors] || 'bg-gray-500';
  };

  const yearDistribution = sampleCarData.map(car => car.year).sort();
  const mileageDistribution = sampleCarData.map(car => car.mileage).sort();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Data Visualization</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Condition Distribution */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="text-green-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Condition Distribution</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(conditionCounts).map(([condition, count]) => (
              <div key={condition} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{condition}</span>
                <div className="flex items-center gap-2 flex-1 ml-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${getConditionColor(condition)} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${(count / sampleCarData.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fuel Type Distribution */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-purple-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Fuel Type Distribution</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(fuelTypeCounts).map(([fuelType, count]) => (
              <div key={fuelType} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{fuelType}</span>
                <div className="flex items-center gap-2 flex-1 ml-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${getFuelTypeColor(fuelType)} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${(count / sampleCarData.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Make Distribution */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-blue-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Make Distribution</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(makeCounts).map(([make, count]) => (
              <div key={make} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{make}</span>
                <div className="flex items-center gap-2 flex-1 ml-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(count / sampleCarData.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-teal-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Summary Statistics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {new Date().getFullYear() - Math.round(yearDistribution.reduce((a, b) => a + b, 0) / yearDistribution.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Age (years)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(mileageDistribution.reduce((a, b) => a + b, 0) / mileageDistribution.length).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Avg Mileage (km)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {Math.min(...yearDistribution)} - {Math.max(...yearDistribution)}
              </div>
              <div className="text-sm text-gray-600">Year Range</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {sampleCarData.length}
              </div>
              <div className="text-sm text-gray-600">Total Cars</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="text-blue-600" size={20} />
          <h3 className="font-semibold text-blue-800">Dataset Insights</h3>
        </div>
        <div className="text-sm text-blue-700">
          <p className="mb-1">
            <strong>Most Common Condition:</strong> {Object.entries(conditionCounts).reduce((a, b) => conditionCounts[a[0]] > conditionCounts[b[0]] ? a : b)[0]}
          </p>
          <p className="mb-1">
            <strong>Most Popular Fuel Type:</strong> {Object.entries(fuelTypeCounts).reduce((a, b) => fuelTypeCounts[a[0]] > fuelTypeCounts[b[0]] ? a : b)[0]}
          </p>
          <p>
            <strong>Most Common Make:</strong> {Object.entries(makeCounts).reduce((a, b) => makeCounts[a[0]] > makeCounts[b[0]] ? a : b)[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;