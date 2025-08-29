import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import xgboost as xgb
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from data_processor import DataProcessor
import os

class ModelTrainer:
    def __init__(self):
        self.models = {}
        self.performance_metrics = {}
        self.data_processor = DataProcessor()
        
    def train_all_models(self, optimize_hyperparameters=False):
        """Train all regression models"""
        print("Loading and preprocessing data...")
        
        # Load data
        df = self.data_processor.load_indian_car_data()
        X = self.data_processor.prepare_features(df, fit_encoders=True)
        y = df['price']
        
        print(f"Dataset shape: {X.shape}")
        print(f"Target range: ₹{y.min():,.0f} - ₹{y.max():,.0f}")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        X_train_scaled = self.data_processor.scaler.fit_transform(X_train)
        X_test_scaled = self.data_processor.scaler.transform(X_test)
        
        # Train models
        self._train_random_forest(X_train, X_test, y_train, y_test, optimize_hyperparameters)
        self._train_gradient_boosting(X_train, X_test, y_train, y_test, optimize_hyperparameters)
        self._train_xgboost(X_train, X_test, y_train, y_test, optimize_hyperparameters)
        
        # Save models and preprocessors
        self._save_models()
        self.data_processor.save_preprocessors()
        
        # Generate performance report
        self._generate_performance_report()
        
        return self.performance_metrics
    
    def _train_random_forest(self, X_train, X_test, y_train, y_test, optimize=False):
        """Train Random Forest model"""
        print("Training Random Forest...")
        
        if optimize:
            param_grid = {
                'n_estimators': [50, 100, 200],
                'max_depth': [10, 15, 20, None],
                'min_samples_split': [2, 5, 10],
                'min_samples_leaf': [1, 2, 4]
            }
            
            rf = RandomForestRegressor(random_state=42)
            grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='r2', n_jobs=-1)
            grid_search.fit(X_train, y_train)
            
            self.models['random_forest'] = grid_search.best_estimator_
            print(f"Best RF parameters: {grid_search.best_params_}")
        else:
            self.models['random_forest'] = RandomForestRegressor(
                n_estimators=100, max_depth=15, min_samples_split=5, 
                min_samples_leaf=2, random_state=42
            )
            self.models['random_forest'].fit(X_train, y_train)
        
        # Calculate metrics
        y_pred = self.models['random_forest'].predict(X_test)
        cv_scores = cross_val_score(self.models['random_forest'], X_train, y_train, cv=5)
        
        self.performance_metrics['random_forest'] = {
            'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
            'r2': r2_score(y_test, y_pred),
            'mae': mean_absolute_error(y_test, y_pred),
            'cv_score': cv_scores.mean(),
            'cv_std': cv_scores.std()
        }
    
    def _train_gradient_boosting(self, X_train, X_test, y_train, y_test, optimize=False):
        """Train Gradient Boosting model"""
        print("Training Gradient Boosting...")
        
        if optimize:
            param_grid = {
                'n_estimators': [50, 100, 200],
                'learning_rate': [0.05, 0.1, 0.15],
                'max_depth': [3, 5, 7],
                'subsample': [0.8, 0.9, 1.0]
            }
            
            gb = GradientBoostingRegressor(random_state=42)
            grid_search = GridSearchCV(gb, param_grid, cv=5, scoring='r2', n_jobs=-1)
            grid_search.fit(X_train, y_train)
            
            self.models['gradient_boosting'] = grid_search.best_estimator_
            print(f"Best GB parameters: {grid_search.best_params_}")
        else:
            self.models['gradient_boosting'] = GradientBoostingRegressor(
                n_estimators=100, learning_rate=0.1, max_depth=5, 
                subsample=0.9, random_state=42
            )
            self.models['gradient_boosting'].fit(X_train, y_train)
        
        # Calculate metrics
        y_pred = self.models['gradient_boosting'].predict(X_test)
        cv_scores = cross_val_score(self.models['gradient_boosting'], X_train, y_train, cv=5)
        
        self.performance_metrics['gradient_boosting'] = {
            'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
            'r2': r2_score(y_test, y_pred),
            'mae': mean_absolute_error(y_test, y_pred),
            'cv_score': cv_scores.mean(),
            'cv_std': cv_scores.std()
        }
    
    def _train_xgboost(self, X_train, X_test, y_train, y_test, optimize=False):
        """Train XGBoost model"""
        print("Training XGBoost...")
        
        if optimize:
            param_grid = {
                'n_estimators': [50, 100, 200],
                'learning_rate': [0.05, 0.1, 0.15],
                'max_depth': [3, 5, 7],
                'subsample': [0.8, 0.9, 1.0],
                'colsample_bytree': [0.8, 0.9, 1.0]
            }
            
            xgb_model = xgb.XGBRegressor(random_state=42)
            grid_search = GridSearchCV(xgb_model, param_grid, cv=5, scoring='r2', n_jobs=-1)
            grid_search.fit(X_train, y_train)
            
            self.models['xgboost'] = grid_search.best_estimator_
            print(f"Best XGB parameters: {grid_search.best_params_}")
        else:
            self.models['xgboost'] = xgb.XGBRegressor(
                n_estimators=100, learning_rate=0.1, max_depth=5,
                subsample=0.9, colsample_bytree=0.9, random_state=42
            )
            self.models['xgboost'].fit(X_train, y_train)
        
        # Calculate metrics
        y_pred = self.models['xgboost'].predict(X_test)
        cv_scores = cross_val_score(self.models['xgboost'], X_train, y_train, cv=5)
        
        self.performance_metrics['xgboost'] = {
            'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
            'r2': r2_score(y_test, y_pred),
            'mae': mean_absolute_error(y_test, y_pred),
            'cv_score': cv_scores.mean(),
            'cv_std': cv_scores.std()
        }
    
    def _save_models(self):
        """Save trained models"""
        if not os.path.exists('models'):
            os.makedirs('models')
        
        for name, model in self.models.items():
            joblib.dump(model, f'models/{name}_model.pkl')
            print(f"Saved {name} model")
    
    def _generate_performance_report(self):
        """Generate and save performance report"""
        print("\n" + "="*60)
        print("MODEL PERFORMANCE REPORT")
        print("="*60)
        
        for name, metrics in self.performance_metrics.items():
            print(f"\n{name.upper().replace('_', ' ')}:")
            print(f"  RMSE: ₹{metrics['rmse']:,.0f}")
            print(f"  R² Score: {metrics['r2']:.3f}")
            print(f"  MAE: ₹{metrics['mae']:,.0f}")
            print(f"  CV Score: {metrics['cv_score']:.3f} (±{metrics['cv_std']:.3f})")
        
        # Find best model
        best_model = max(self.performance_metrics.items(), key=lambda x: x[1]['r2'])
        print(f"\nBEST MODEL: {best_model[0].replace('_', ' ').title()}")
        print(f"R² Score: {best_model[1]['r2']:.3f}")
        
        # Save report to file
        with open('models/performance_report.txt', 'w') as f:
            f.write("MODEL PERFORMANCE REPORT\n")
            f.write("="*60 + "\n\n")
            
            for name, metrics in self.performance_metrics.items():
                f.write(f"{name.upper().replace('_', ' ')}:\n")
                f.write(f"  RMSE: ₹{metrics['rmse']:,.0f}\n")
                f.write(f"  R² Score: {metrics['r2']:.3f}\n")
                f.write(f"  MAE: ₹{metrics['mae']:,.0f}\n")
                f.write(f"  CV Score: {metrics['cv_score']:.3f} (±{metrics['cv_std']:.3f})\n\n")
            
            f.write(f"BEST MODEL: {best_model[0].replace('_', ' ').title()}\n")
            f.write(f"R² Score: {best_model[1]['r2']:.3f}\n")

if __name__ == "__main__":
    trainer = ModelTrainer()
    
    print("Starting model training...")
    print("This may take a few minutes...")
    
    # Train models (set to True for hyperparameter optimization)
    metrics = trainer.train_all_models(optimize_hyperparameters=False)
    
    print("\nTraining completed successfully!")
    print("Models saved to 'models/' directory")