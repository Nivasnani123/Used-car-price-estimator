from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import xgboost as xgb
import joblib
import os
from datetime import datetime
import json

app = Flask(__name__)

class CarPricePredictor:
    def __init__(self):
        self.models = {}
        self.encoders = {}
        self.scaler = StandardScaler()
        self.feature_names = []
        self.is_trained = False
        
    def load_sample_data(self):
        """Load sample car data for training"""
        data = {
            'make': ['Toyota', 'Toyota', 'Toyota', 'Toyota', 'Toyota', 'BMW', 'BMW', 'BMW', 'BMW', 'Tesla', 'Tesla', 
                    'Honda', 'Honda', 'Honda', 'Mercedes', 'Mercedes', 'Mercedes', 'Audi', 'Audi', 'Audi',
                    'Volkswagen', 'Volkswagen', 'Nissan', 'Ford', 'Ford', 'Hyundai', 'Hyundai', 'Hyundai', 'Hyundai', 'Hyundai'],
            'model': ['Glanza', 'Hyryder', 'Innova Crysta', 'Fortuner', 'Camry', '3 Series', 'X1', 'X3', '5 Series', 'Model 3', 'Model Y',
                     'Amaze', 'City', 'Elevate', 'C-Class', 'GLC', 'E-Class', 'A4', 'Q3', 'Q5',
                     'Virtus', 'Taigun', 'Magnite', 'EcoSport', 'Figo', 'i20', 'Creta', 'Verna', 'Venue', 'Alcazar'],
            'year': [2022, 2023, 2021, 2020, 2022, 2021, 2020, 2022, 2021, 2023, 2022,
                    2021, 2022, 2023, 2021, 2022, 2020, 2021, 2022, 2020,
                    2022, 2021, 2022, 2020, 2019, 2021, 2022, 2021, 2020, 2022],
            'mileage': [15000, 8000, 25000, 35000, 12000, 18000, 28000, 15000, 22000, 5000, 12000,
                       22000, 18000, 8000, 20000, 15000, 25000, 22000, 18000, 28000,
                       15000, 20000, 18000, 35000, 40000, 20000, 15000, 18000, 25000, 12000],
            'condition': ['Very Good', 'Excellent', 'Very Good', 'Good', 'Excellent', 'Very Good', 'Good', 'Excellent', 'Very Good', 'Excellent', 'Very Good',
                         'Good', 'Very Good', 'Excellent', 'Very Good', 'Excellent', 'Good', 'Very Good', 'Excellent', 'Good',
                         'Very Good', 'Good', 'Very Good', 'Good', 'Fair', 'Good', 'Very Good', 'Good', 'Good', 'Excellent'],
            'fuel_type': ['Petrol', 'Hybrid', 'Diesel', 'Diesel', 'Hybrid', 'Petrol', 'Diesel', 'Petrol', 'Petrol', 'Electric', 'Electric',
                         'Petrol', 'Petrol', 'Petrol', 'Petrol', 'Petrol', 'Diesel', 'Petrol', 'Petrol', 'Diesel',
                         'Petrol', 'Petrol', 'Petrol', 'Petrol', 'Petrol', 'Petrol', 'Petrol', 'Petrol', 'Petrol', 'Petrol'],
            'transmission': ['Manual', 'Automatic', 'Manual', 'Automatic', 'Automatic', 'Automatic', 'Automatic', 'Automatic', 'Automatic', 'Automatic', 'Automatic',
                           'Manual', 'Automatic', 'Manual', 'Automatic', 'Automatic', 'Automatic', 'Automatic', 'Automatic', 'Automatic',
                           'Automatic', 'Manual', 'Manual', 'Automatic', 'Manual', 'Manual', 'Automatic', 'Automatic', 'Manual', 'Automatic'],
            'body_type': ['Hatchback', 'SUV', 'SUV', 'SUV', 'Sedan', 'Sedan', 'SUV', 'SUV', 'Sedan', 'Sedan', 'SUV',
                         'Sedan', 'Sedan', 'SUV', 'Sedan', 'SUV', 'Sedan', 'Sedan', 'SUV', 'SUV',
                         'Sedan', 'SUV', 'SUV', 'SUV', 'Hatchback', 'Hatchback', 'SUV', 'Sedan', 'SUV', 'SUV'],
            'engine_size': [1.2, 1.5, 2.4, 2.8, 2.5, 2.0, 2.0, 2.0, 2.0, 0, 0,
                           1.2, 1.5, 1.5, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
                           1.0, 1.0, 1.0, 1.5, 1.2, 1.2, 1.5, 1.5, 1.0, 1.5],
            'previous_owners': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                               1, 1, 1, 1, 1, 1, 1, 1, 1,
                               1, 1, 1, 2, 2, 1, 1, 1, 2, 1],
            'price': [850000, 1550000, 2200000, 4400000, 4900000, 6000000, 5250000, 7300000, 7750000, 6500000, 8250000,
                     825000, 1450000, 1450000, 6750000, 7500000, 9000000, 4750000, 5250000, 6850000,
                     1500000, 1550000, 875000, 1000000, 725000, 900000, 1575000, 1450000, 1080000, 1835000]
        }
        
        return pd.DataFrame(data)
    
    def prepare_features(self, df):
        """Prepare features for training"""
        # Create a copy to avoid modifying original data
        df_processed = df.copy()
        
        # Calculate age
        current_year = datetime.now().year
        df_processed['age'] = current_year - df_processed['year']
        
        # Encode categorical variables
        categorical_features = ['make', 'model', 'condition', 'fuel_type', 'transmission', 'body_type']
        
        for feature in categorical_features:
            if feature not in self.encoders:
                self.encoders[feature] = LabelEncoder()
                df_processed[feature + '_encoded'] = self.encoders[feature].fit_transform(df_processed[feature])
            else:
                # Handle unseen categories
                try:
                    df_processed[feature + '_encoded'] = self.encoders[feature].transform(df_processed[feature])
                except ValueError:
                    # If unseen category, assign most common category
                    most_common = self.encoders[feature].classes_[0]
                    df_processed[feature] = df_processed[feature].fillna(most_common)
                    df_processed[feature + '_encoded'] = self.encoders[feature].transform(df_processed[feature])
        
        # Select features for training
        feature_columns = ['age', 'mileage', 'engine_size', 'previous_owners'] + \
                         [f + '_encoded' for f in categorical_features]
        
        self.feature_names = feature_columns
        return df_processed[feature_columns]
    
    def train_models(self):
        """Train all ML models"""
        # Load and prepare data
        df = self.load_sample_data()
        X = self.prepare_features(df)
        y = df['price']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train Random Forest
        rf_model = RandomForestRegressor(n_estimators=100, random_state=42, max_depth=10)
        rf_model.fit(X_train, y_train)
        self.models['random_forest'] = rf_model
        
        # Train Gradient Boosting
        gb_model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, random_state=42)
        gb_model.fit(X_train, y_train)
        self.models['gradient_boosting'] = gb_model
        
        # Train XGBoost
        xgb_model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42)
        xgb_model.fit(X_train, y_train)
        self.models['xgboost'] = xgb_model
        
        self.is_trained = True
        
        # Calculate and store performance metrics
        self.performance_metrics = {}
        for name, model in self.models.items():
            y_pred = model.predict(X_test)
            self.performance_metrics[name] = {
                'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
                'r2': r2_score(y_test, y_pred),
                'mae': mean_absolute_error(y_test, y_pred),
                'cv_score': cross_val_score(model, X_train, y_train, cv=5).mean()
            }
        
        # Save models
        self.save_models()
        
        return self.performance_metrics
    
    def predict_price(self, car_data):
        """Predict car price using all models"""
        if not self.is_trained:
            self.train_models()
        
        # Convert single prediction to DataFrame
        df = pd.DataFrame([car_data])
        X = self.prepare_features(df)
        
        predictions = {}
        for name, model in self.models.items():
            pred = model.predict(X)[0]
            
            # Calculate confidence interval (simplified)
            if name == 'random_forest':
                # Use tree predictions for variance
                tree_predictions = [tree.predict(X)[0] for tree in model.estimators_]
                std = np.std(tree_predictions)
                confidence_interval = (pred - 1.96 * std, pred + 1.96 * std)
            else:
                # Use RMSE for confidence interval
                rmse = self.performance_metrics[name]['rmse']
                confidence_interval = (pred - rmse, pred + rmse)
            
            predictions[name] = {
                'predicted_price': max(0, pred),
                'confidence_interval': {
                    'lower': max(0, confidence_interval[0]),
                    'upper': confidence_interval[1]
                },
                'confidence': self.performance_metrics[name]['r2']
            }
        
        return predictions
    
    def save_models(self):
        """Save trained models to disk"""
        if not os.path.exists('models'):
            os.makedirs('models')
        
        for name, model in self.models.items():
            joblib.dump(model, f'models/{name}_model.pkl')
        
        joblib.dump(self.encoders, 'models/encoders.pkl')
        joblib.dump(self.scaler, 'models/scaler.pkl')
        
        with open('models/feature_names.json', 'w') as f:
            json.dump(self.feature_names, f)
    
    def load_models(self):
        """Load trained models from disk"""
        try:
            for name in ['random_forest', 'gradient_boosting', 'xgboost']:
                self.models[name] = joblib.load(f'models/{name}_model.pkl')
            
            self.encoders = joblib.load('models/encoders.pkl')
            self.scaler = joblib.load('models/scaler.pkl')
            
            with open('models/feature_names.json', 'r') as f:
                self.feature_names = json.load(f)
            
            self.is_trained = True
            return True
        except FileNotFoundError:
            return False

# Initialize predictor
predictor = CarPricePredictor()

# Car data
CAR_MAKES = ['Toyota', 'BMW', 'Tesla', 'Honda', 'Ford', 'Mercedes', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai']

CAR_MODELS = {
    'Toyota': ['Glanza', 'Taisor', 'Hyryder', 'Rumion', 'Innova Crysta', 'Hycross', 'Fortuner', 'Hilux', 'Camry', 'Vellfire', 'Land Cruiser 300'],
    'BMW': ['2 Series', '3 Series', '5 Series', '6 Series GT', '7 Series', 'X1', 'X3', 'X5', 'X7', 'i4', 'iX1', 'iX'],
    'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X'],
    'Honda': ['Amaze', 'City', 'City Hybrid', 'Elevate'],
    'Ford': ['EcoSport', 'Figo', 'Aspire', 'Endeavour', 'Mustang'],
    'Mercedes': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'EQB', 'EQS', 'AMG GT'],
    'Audi': ['A4', 'A6', 'A8 L', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron'],
    'Volkswagen': ['Virtus', 'Taigun', 'Tiguan', 'Polo'],
    'Nissan': ['Magnite', 'GT-R'],
    'Hyundai': ['Exter', 'Grand i10 Nios', 'i20', 'Aura', 'Venue', 'Creta', 'Creta EV', 'Verna', 'Alcazar', 'Tucson', 'Ioniq 5', 'Ioniq 6']
}

@app.route('/')
def index():
    return render_template('index.html', car_makes=CAR_MAKES, car_models=CAR_MODELS)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/api/models/<make>')
def get_models(make):
    """Get models for a specific make"""
    models = CAR_MODELS.get(make, [])
    return jsonify(models)

@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict car price"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['make', 'model', 'year', 'mileage', 'condition', 'fuel_type', 'transmission', 'body_type', 'engine_size', 'previous_owners']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Load models if not already loaded
        if not predictor.is_trained:
            if not predictor.load_models():
                predictor.train_models()
        
        # Make predictions
        predictions = predictor.predict_price(data)
        
        return jsonify({
            'success': True,
            'predictions': predictions
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/performance')
def get_performance():
    """Get model performance metrics"""
    try:
        if not predictor.is_trained:
            if not predictor.load_models():
                metrics = predictor.train_models()
            else:
                metrics = predictor.performance_metrics
        else:
            metrics = predictor.performance_metrics
        
        return jsonify({
            'success': True,
            'performance': metrics
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/train')
def train_models():
    """Train models endpoint"""
    try:
        metrics = predictor.train_models()
        return jsonify({
            'success': True,
            'message': 'Models trained successfully',
            'performance': metrics
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)