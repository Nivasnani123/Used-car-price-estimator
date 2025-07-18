import React from 'react';
import { Car, Brain, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';

interface HelloPageProps {
  onNavigate: () => void;
}

const HelloPage: React.FC<HelloPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full filter blur-xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-100 rounded-full filter blur-xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo and branding */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Car className="text-blue-600 w-16 h-16 drop-shadow-lg" />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                <Brain className="text-white w-6 h-6" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AutoPrice
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            AI-Powered Car Price Prediction
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Harness the power of advanced machine learning algorithms to get accurate, 
            real-time price predictions for used cars. Our AI analyzes market trends, 
            vehicle conditions, and historical data to provide you with the most reliable estimates.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:bg-blue-100 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="text-yellow-500 w-8 h-8" />
              <h3 className="text-gray-800 font-semibold text-lg">Lightning Fast</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Get instant price predictions powered by XGBoost, Random Forest, and Gradient Boosting algorithms.
            </p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 border border-green-100 hover:bg-green-100 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <Target className="text-green-600 w-8 h-8" />
              <h3 className="text-gray-800 font-semibold text-lg">Highly Accurate</h3>
            </div>
            <p className="text-gray-600 text-sm">
              96% accuracy with confidence intervals and comprehensive market analysis for reliable predictions.
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:bg-purple-100 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="text-purple-600 w-8 h-8" />
              <h3 className="text-gray-800 font-semibold text-lg">Market Insights</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Advanced analytics considering brand value, depreciation curves, and real-time market conditions.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNavigate}
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <span className="flex items-center gap-3">
            Start Predicting Prices
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        </button>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-800 mb-1">96%</div>
            <div className="text-gray-500 text-sm">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800 mb-1">3</div>
            <div className="text-gray-500 text-sm">AI Models</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800 mb-1">20+</div>
            <div className="text-gray-500 text-sm">Car Brands</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800 mb-1">∞</div>
            <div className="text-gray-500 text-sm">Predictions</div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-8 animate-bounce animation-delay-1000">
        <div className="w-4 h-4 bg-blue-500 rounded-full opacity-40"></div>
      </div>
      <div className="absolute top-1/3 right-12 animate-bounce animation-delay-3000">
        <div className="w-3 h-3 bg-purple-500 rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-bounce animation-delay-5000">
        <div className="w-2 h-2 bg-indigo-500 rounded-full opacity-40"></div>
      </div>
    </div>
  );
};

export default HelloPage;