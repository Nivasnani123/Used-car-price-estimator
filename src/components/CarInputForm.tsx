import React, { useState } from 'react';
import { CarData } from '../types/car';
import { carMakes, carModels } from '../data/sampleData';
import { Car, Calendar, Gauge, Settings, Fuel, Users } from 'lucide-react';

interface CarInputFormProps {
  onSubmit: (car: CarData) => void;
}

const CarInputForm: React.FC<CarInputFormProps> = ({ onSubmit }) => {
  const [carData, setCarData] = useState<CarData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    condition: 'Good',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    engineSize: 2.0,
    previousOwners: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(carData);
  };

  const handleMakeChange = (make: string) => {
    setCarData(prev => ({
      ...prev,
      make,
      model: carModels[make]?.[0] || ''
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Car className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Car Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Make
            </label>
            <select
              value={carData.make}
              onChange={(e) => handleMakeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Make</option>
              {carMakes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <select
              value={carData.model}
              onChange={(e) => setCarData(prev => ({ ...prev, model: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={!carData.make}
            >
              <option value="">Select Model</option>
              {carData.make && carModels[carData.make]?.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline mr-1" size={16} />
              Year
            </label>
            <input
              type="number"
              value={carData.year}
              onChange={(e) => setCarData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
              min="1990"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Gauge className="inline mr-1" size={16} />
              Mileage (km)
            </label>
            <input
              type="number"
              value={carData.mileage}
              onChange={(e) => setCarData(prev => ({ ...prev, mileage: parseInt(e.target.value) }))}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition
            </label>
            <select
              value={carData.condition}
              onChange={(e) => setCarData(prev => ({ ...prev, condition: e.target.value as CarData['condition'] }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Very Good">Very Good</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Fuel className="inline mr-1" size={16} />
              Fuel Type
            </label>
            <select
              value={carData.fuelType}
              onChange={(e) => setCarData(prev => ({ ...prev, fuelType: e.target.value as CarData['fuelType'] }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Settings className="inline mr-1" size={16} />
              Transmission
            </label>
            <select
              value={carData.transmission}
              onChange={(e) => setCarData(prev => ({ ...prev, transmission: e.target.value as CarData['transmission'] }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body Type
            </label>
            <select
              value={carData.bodyType}
              onChange={(e) => setCarData(prev => ({ ...prev, bodyType: e.target.value as CarData['bodyType'] }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
              <option value="Wagon">Wagon</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Engine Size (L)
            </label>
            <input
              type="number"
              value={carData.engineSize}
              onChange={(e) => setCarData(prev => ({ ...prev, engineSize: parseFloat(e.target.value) }))}
              min="0"
              max="10"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline mr-1" size={16} />
              Previous Owners
            </label>
            <input
              type="number"
              value={carData.previousOwners}
              onChange={(e) => setCarData(prev => ({ ...prev, previousOwners: parseInt(e.target.value) }))}
              min="0"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Predict Price
        </button>
      </form>
    </div>
  );
};

export default CarInputForm;