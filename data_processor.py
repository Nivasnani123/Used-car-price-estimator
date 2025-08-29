import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import os

class DataProcessor:
    def __init__(self):
        self.encoders = {}
        self.scaler = StandardScaler()
        self.feature_names = []
        
    def load_indian_car_data(self):
        """Load comprehensive Indian car market data"""
        # Expanded dataset with realistic Indian car prices
        data = {
            'make': ['Toyota'] * 15 + ['BMW'] * 12 + ['Tesla'] * 4 + ['Honda'] * 4 + ['Ford'] * 5 + 
                   ['Mercedes'] * 11 + ['Audi'] * 8 + ['Volkswagen'] * 4 + ['Nissan'] * 2 + ['Hyundai'] * 12,
            
            'model': [
                # Toyota models
                'Glanza', 'Taisor', 'Hyryder', 'Rumion', 'Innova Crysta', 'Hycross', 'Fortuner', 'Hilux', 
                'Camry', 'Vellfire', 'Land Cruiser 300', 'Glanza', 'Hyryder', 'Innova Crysta', 'Fortuner',
                
                # BMW models
                '2 Series', '3 Series', '5 Series', '6 Series GT', '7 Series', 'X1', 'X3', 'X5', 'X7', 
                'i4', 'iX1', 'iX',
                
                # Tesla models
                'Model 3', 'Model Y', 'Model S', 'Model X',
                
                # Honda models
                'Amaze', 'City', 'City Hybrid', 'Elevate',
                
                # Ford models
                'EcoSport', 'Figo', 'Aspire', 'Endeavour', 'Mustang',
                
                # Mercedes models
                'A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'EQB', 'EQS', 'AMG GT',
                
                # Audi models
                'A4', 'A6', 'A8 L', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron',
                
                # Volkswagen models
                'Virtus', 'Taigun', 'Tiguan', 'Polo',
                
                # Nissan models
                'Magnite', 'GT-R',
                
                # Hyundai models
                'Exter', 'Grand i10 Nios', 'i20', 'Aura', 'Venue', 'Creta', 'Creta EV', 'Verna', 
                'Alcazar', 'Tucson', 'Ioniq 5', 'Ioniq 6'
            ],
            
            'year': [2022, 2023, 2023, 2022, 2021, 2023, 2020, 2022, 2022, 2021, 2023, 2021, 2022, 2020, 2019] +  # Toyota
                   [2022, 2021, 2021, 2022, 2020, 2020, 2022, 2021, 2022, 2023, 2022, 2023] +  # BMW
                   [2023, 2022, 2021, 2020] +  # Tesla
                   [2021, 2022, 2023, 2023] +  # Honda
                   [2020, 2019, 2021, 2020, 2022] +  # Ford
                   [2022, 2021, 2020, 2020, 2022, 2022, 2021, 2022, 2023, 2021, 2023] +  # Mercedes
                   [2021, 2020, 2021, 2022, 2020, 2021, 2022, 2023] +  # Audi
                   [2022, 2021, 2020, 2020] +  # Volkswagen
                   [2022, 2021] +  # Nissan
                   [2023, 2022, 2021, 2022, 2020, 2022, 2023, 2021, 2022, 2020, 2023, 2022],  # Hyundai
            
            'mileage': np.random.randint(5000, 50000, 77).tolist(),
            
            'condition': np.random.choice(['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'], 77, 
                                        p=[0.05, 0.15, 0.35, 0.35, 0.10]).tolist(),
            
            'fuel_type': ['Petrol'] * 45 + ['Diesel'] * 15 + ['Electric'] * 8 + ['Hybrid'] * 6 + ['CNG'] * 3,
            
            'transmission': np.random.choice(['Manual', 'Automatic'], 77, p=[0.4, 0.6]).tolist(),
            
            'body_type': ['Sedan'] * 25 + ['SUV'] * 35 + ['Hatchback'] * 12 + ['Coupe'] * 3 + ['Convertible'] * 1 + ['Wagon'] * 1,
            
            'engine_size': np.random.choice([1.0, 1.2, 1.5, 2.0, 2.4, 2.8, 3.0, 0], 77, 
                                          p=[0.15, 0.20, 0.25, 0.25, 0.08, 0.05, 0.02, 0.05]).tolist(),
            
            'previous_owners': np.random.choice([1, 2, 3, 4], 77, p=[0.70, 0.20, 0.08, 0.02]).tolist()
        }
        
        # Calculate realistic prices based on Indian market
        prices = []
        base_prices = {
            # Toyota (in lakhs)
            'Glanza': 8.5, 'Taisor': 10.5, 'Hyryder': 15.5, 'Rumion': 12, 'Innova Crysta': 22, 
            'Hycross': 24, 'Fortuner': 44, 'Hilux': 34, 'Camry': 49, 'Vellfire': 130, 'Land Cruiser 300': 240,
            
            # BMW (in lakhs)
            '2 Series': 44.5, '3 Series': 60, '5 Series': 77.5, '6 Series GT': 82.5, '7 Series': 190,
            'X1': 52.5, 'X3': 73, 'X5': 105, 'X7': 145, 'i4': 75.5, 'iX1': 66, 'iX': 140,
            
            # Tesla (in lakhs)
            'Model 3': 65, 'Model Y': 82.5, 'Model S': 175, 'Model X': 225,
            
            # Honda (in lakhs)
            'Amaze': 8.25, 'City': 14.5, 'City Hybrid': 20, 'Elevate': 14.5,
            
            # Ford (in lakhs)
            'EcoSport': 10, 'Figo': 7.25, 'Aspire': 7.75, 'Endeavour': 33, 'Mustang': 80,
            
            # Mercedes (in lakhs)
            'A-Class': 47, 'C-Class': 67.5, 'E-Class': 90, 'S-Class': 195, 'GLA': 52.5, 
            'GLC': 75, 'GLE': 107.5, 'GLS': 150, 'EQB': 75, 'EQS': 250, 'AMG GT': 300,
            
            # Audi (in lakhs)
            'A4': 47.5, 'A6': 65, 'A8 L': 150, 'Q3': 52.5, 'Q5': 68.5, 'Q7': 90, 'Q8': 145, 'e-tron': 135,
            
            # Volkswagen (in lakhs)
            'Virtus': 15, 'Taigun': 15.5, 'Tiguan': 37.5, 'Polo': 8,
            
            # Nissan (in lakhs)
            'Magnite': 8.75, 'GT-R': 235,
            
            # Hyundai (in lakhs)
            'Exter': 8.35, 'Grand i10 Nios': 7.25, 'i20': 9, 'Aura': 7.75, 'Venue': 10.8,
            'Creta': 15.75, 'Creta EV': 21, 'Verna': 14.5, 'Alcazar': 18.35, 'Tucson': 32.5,
            'Ioniq 5': 48, 'Ioniq 6': 48
        }
        
        for i in range(len(data['make'])):
            model = data['model'][i]
            year = data['year'][i]
            mileage = data['mileage'][i]
            condition = data['condition'][i]
            fuel_type = data['fuel_type'][i]
            transmission = data['transmission'][i]
            body_type = data['body_type'][i]
            engine_size = data['engine_size'][i]
            previous_owners = data['previous_owners'][i]
            
            # Base price in rupees
            base_price = base_prices.get(model, 15) * 100000
            
            # Age depreciation
            age = 2024 - year
            age_factor = max(0.3, np.exp(-age * 0.15))
            
            # Mileage depreciation
            mileage_factor = max(0.4, 1 - (mileage / 200000) * 0.6)
            
            # Condition multiplier
            condition_multipliers = {'Poor': 0.65, 'Fair': 0.80, 'Good': 0.95, 'Very Good': 1.10, 'Excellent': 1.25}
            condition_factor = condition_multipliers[condition]
            
            # Fuel type multiplier
            fuel_multipliers = {'Petrol': 1.0, 'Diesel': 1.15, 'Electric': 1.40, 'Hybrid': 1.30, 'CNG': 0.90}
            fuel_factor = fuel_multipliers[fuel_type]
            
            # Transmission multiplier
            transmission_factor = 1.10 if transmission == 'Automatic' else 0.95
            
            # Body type multiplier
            body_multipliers = {'Sedan': 1.0, 'SUV': 1.20, 'Hatchback': 0.85, 'Coupe': 1.15, 'Convertible': 1.30, 'Wagon': 0.90}
            body_factor = body_multipliers[body_type]
            
            # Engine size factor
            engine_factor = 1 + np.log(engine_size + 1) * 0.1 if engine_size > 0 else 1.3
            
            # Previous owners factor
            owner_factor = max(0.75, 1 - (previous_owners - 1) * 0.08)
            
            # Calculate final price
            final_price = (base_price * age_factor * mileage_factor * condition_factor * 
                          fuel_factor * transmission_factor * body_factor * engine_factor * owner_factor)
            
            # Add some realistic noise
            noise = np.random.normal(0, final_price * 0.05)
            final_price = max(100000, final_price + noise)  # Minimum 1 lakh
            
            prices.append(int(final_price))
        
        data['price'] = prices
        return pd.DataFrame(data)
    
    def prepare_features(self, df, fit_encoders=True):
        """Prepare features for ML models"""
        df_processed = df.copy()
        
        # Calculate age
        current_year = 2024
        df_processed['age'] = current_year - df_processed['year']
        
        # Encode categorical variables
        categorical_features = ['make', 'model', 'condition', 'fuel_type', 'transmission', 'body_type']
        
        for feature in categorical_features:
            if fit_encoders:
                if feature not in self.encoders:
                    self.encoders[feature] = LabelEncoder()
                df_processed[feature + '_encoded'] = self.encoders[feature].fit_transform(df_processed[feature])
            else:
                if feature in self.encoders:
                    # Handle unseen categories
                    unique_values = df_processed[feature].unique()
                    known_values = self.encoders[feature].classes_
                    
                    # Replace unknown values with most common known value
                    for val in unique_values:
                        if val not in known_values:
                            most_common = known_values[0]
                            df_processed[feature] = df_processed[feature].replace(val, most_common)
                    
                    df_processed[feature + '_encoded'] = self.encoders[feature].transform(df_processed[feature])
        
        # Select features for training
        feature_columns = ['age', 'mileage', 'engine_size', 'previous_owners'] + \
                         [f + '_encoded' for f in categorical_features]
        
        self.feature_names = feature_columns
        return df_processed[feature_columns]
    
    def save_preprocessors(self, filepath='models/'):
        """Save encoders and scaler"""
        if not os.path.exists(filepath):
            os.makedirs(filepath)
        
        joblib.dump(self.encoders, os.path.join(filepath, 'encoders.pkl'))
        joblib.dump(self.scaler, os.path.join(filepath, 'scaler.pkl'))
        
        with open(os.path.join(filepath, 'feature_names.txt'), 'w') as f:
            f.write('\n'.join(self.feature_names))
    
    def load_preprocessors(self, filepath='models/'):
        """Load encoders and scaler"""
        try:
            self.encoders = joblib.load(os.path.join(filepath, 'encoders.pkl'))
            self.scaler = joblib.load(os.path.join(filepath, 'scaler.pkl'))
            
            with open(os.path.join(filepath, 'feature_names.txt'), 'r') as f:
                self.feature_names = f.read().strip().split('\n')
            
            return True
        except FileNotFoundError:
            return False