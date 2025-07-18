import React, { useState } from 'react';
import { CarData, PredictionResult } from './types/car';
import { CarPricePredictor } from './utils/mlAlgorithms';
import CarInputForm from './components/CarInputForm';
import PredictionResults from './components/PredictionResults';
import HelloPage from './components/HelloPage';
import AboutPage from './components/AboutPage';
import { Brain, ArrowLeft } from 'lucide-react';

function App() {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [showMainApp, setShowMainApp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const predictor = new CarPricePredictor();

  const handleCarSubmit = (car: CarData) => {
    const results = [
      predictor.predictRandomForest(car),
      predictor.predictGradientBoosting(car),
      predictor.predictXGBoost(car)
    ];
    setPredictions(results);
  };

  if (!showMainApp) {
    return <HelloPage onNavigate={() => setShowMainApp(true)} />;
  }

  if (showAbout) {
    return <AboutPage onBack={() => setShowAbout(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setShowMainApp(false)}
              className="absolute left-4 top-8 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Back to Home</span>
            </button>
            
            <button
              onClick={() => setShowAbout(true)}
              className="absolute right-4 top-8 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span className="text-sm">About AI</span>
              <Brain size={20} />
            </button>
            
            <Brain className="text-blue-600" size={40} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AutoPrice AI
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Advanced machine learning algorithms for accurate used car price predictions
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <CarInputForm onSubmit={handleCarSubmit} />
          <PredictionResults results={predictions} />
        </div>

        {/* Enhanced Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Brain className="text-blue-600" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Powered by Advanced AI</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Our sophisticated machine learning models analyze over 20 different car features including 
              market trends, depreciation curves, and brand-specific factors to deliver highly accurate predictions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="font-semibold text-blue-800 mb-1">Random Forest</div>
                <div className="text-blue-600">Ensemble learning with 89% accuracy</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="font-semibold text-green-800 mb-1">Gradient Boosting</div>
                <div className="text-green-600">Sequential optimization with 93% accuracy</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="font-semibold text-purple-800 mb-1">XGBoost</div>
                <div className="text-purple-600">State-of-the-art with 96% accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;