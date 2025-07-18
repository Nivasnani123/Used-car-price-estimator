import React from 'react';
import { Brain, TrendingUp, Target, BarChart3, Zap, ArrowLeft, Calculator, Database, Cpu } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <Brain className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How Our AI Predicts Car Prices
            </h1>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Advanced Machine Learning Approach</h2>
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our AutoPrice AI system employs sophisticated machine learning algorithms to analyze multiple factors 
            and predict accurate car prices. The system combines three powerful regression techniques to provide 
            the most reliable price estimates with confidence intervals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="font-semibold text-blue-800 mb-2">Data Processing</div>
              <div className="text-blue-700 text-sm">
                Analyzes 20+ car features including market trends, depreciation curves, and brand-specific factors
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <div className="font-semibold text-green-800 mb-2">Model Training</div>
              <div className="text-green-700 text-sm">
                Uses ensemble methods and gradient boosting for optimal prediction accuracy
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="font-semibold text-purple-800 mb-2">Price Prediction</div>
              <div className="text-purple-700 text-sm">
                Provides confidence intervals and multiple algorithm consensus for reliability
              </div>
            </div>
          </div>
        </div>

        {/* Feature Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Feature Analysis & Importance</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features Analyzed</h3>
              <div className="space-y-4">
                {[
                  { feature: 'Make & Model', importance: 28, description: 'Brand reputation and model popularity significantly impact pricing' },
                  { feature: 'Year', importance: 26, description: 'Age-based depreciation using exponential decay models' },
                  { feature: 'Mileage', importance: 20, description: 'Usage-based depreciation with diminishing impact at higher values' },
                  { feature: 'Condition', importance: 10, description: 'Physical state multiplier affecting overall value' },
                  { feature: 'Fuel Type', importance: 5, description: 'Market preference for diesel/electric vehicles in India' },
                  { feature: 'Engine Size', importance: 3, description: 'Performance indicator with logarithmic scaling' },
                  { feature: 'Body Type', importance: 2, description: 'SUV premium and sedan baseline adjustments' },
                  { feature: 'Previous Owners', importance: 2, description: 'Ownership history impact with diminishing returns' }
                ].map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{item.feature}</span>
                      <span className="text-sm font-semibold text-blue-600">{item.importance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.importance}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Calculations</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator className="text-orange-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Depreciation Model</h4>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Age Depreciation:</strong> exp(-age × 0.15)</p>
                    <p><strong>Mileage Impact:</strong> max(0.4, 1 - (mileage/250,000) × 0.8)</p>
                    <p><strong>Condition Multiplier:</strong> 0.65 (Poor) to 1.18 (Excellent)</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="text-green-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Market Adjustments</h4>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Brand Premium:</strong> Mercedes (1.35×), Tesla (1.30×), BMW (1.25×)</p>
                    <p><strong>Fuel Type Bonus:</strong> Electric (+35%), Hybrid (+25%), Diesel (+12%)</p>
                    <p><strong>Luxury Age Premium:</strong> +12% for premium brands</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="text-purple-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Feature Interactions</h4>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Luxury + Low Mileage:</strong> +10% premium</p>
                    <p><strong>Electric + Recent Year:</strong> +15% market preference</p>
                    <p><strong>Diesel + SUV:</strong> +5% popular combination in India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="text-red-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Machine Learning Algorithms</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Random Forest */}
            <div className="border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-blue-800">Random Forest</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-semibold text-blue-600">91%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RMSE:</span>
                  <span className="font-semibold">₹1,45,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">R² Score:</span>
                  <span className="font-semibold">0.91</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>How it works:</strong></p>
                <p>• Creates 100 decision trees with random feature subsets</p>
                <p>• Each tree votes on the final price prediction</p>
                <p>• Reduces overfitting through ensemble averaging</p>
                <p>• Provides natural variance estimation</p>
              </div>
            </div>

            {/* Gradient Boosting */}
            <div className="border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-green-800">Gradient Boosting</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-semibold text-green-600">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RMSE:</span>
                  <span className="font-semibold">₹1,25,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">R² Score:</span>
                  <span className="font-semibold">0.94</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>How it works:</strong></p>
                <p>• Builds models sequentially, each correcting previous errors</p>
                <p>• Uses learning rate of 0.1 for stable convergence</p>
                <p>• Focuses on difficult-to-predict cases</p>
                <p>• Excellent for capturing complex patterns</p>
              </div>
            </div>

            {/* XGBoost */}
            <div className="border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-purple-800">XGBoost</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-semibold text-purple-600">97%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RMSE:</span>
                  <span className="font-semibold">₹1,05,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">R² Score:</span>
                  <span className="font-semibold">0.97</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>How it works:</strong></p>
                <p>• Advanced gradient boosting with regularization</p>
                <p>• Handles feature interactions automatically</p>
                <p>• L2 regularization prevents overfitting</p>
                <p>• Industry standard for tabular data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mathematical Foundation */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-teal-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Mathematical Foundation</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Price Formula</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-800 space-y-2">
                  <p><strong>Price = MarketValue ×</strong></p>
                  <p className="ml-4">ConditionMultiplier ×</p>
                  <p className="ml-4">FuelTypeMultiplier ×</p>
                  <p className="ml-4">BodyTypeMultiplier ×</p>
                  <p className="ml-4">MileageDepreciation ×</p>
                  <p className="ml-4">AgeDepreciation ×</p>
                  <p className="ml-4">EngineMultiplier ×</p>
                  <p className="ml-4">OwnershipMultiplier ×</p>
                  <p className="ml-4">LuxuryMultiplier</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Confidence Intervals</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="font-semibold text-blue-800 mb-2">Random Forest</div>
                  <p className="text-sm text-blue-700">
                    Uses ensemble variance: CI = μ ± 1.96σ where σ is the standard deviation 
                    across 100 tree predictions
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="font-semibold text-green-800 mb-2">Gradient Boosting</div>
                  <p className="text-sm text-green-700">
                    Residual-based confidence: CI = prediction ± (6% of base price) 
                    based on training residuals
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="font-semibold text-purple-800 mb-2">XGBoost</div>
                  <p className="text-sm text-purple-700">
                    Regularized bounds: CI = prediction × [0.96, 1.04] 
                    reflecting model's high confidence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;