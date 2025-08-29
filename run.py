#!/usr/bin/env python3
"""
Used Car Price Estimator - Flask Application Runner
"""

import os
import sys
from app import app, predictor

def setup_application():
    """Setup the application and train models if needed"""
    print("Setting up AutoPrice AI...")
    
    # Check if models exist
    if not os.path.exists('models'):
        print("Models directory not found. Training models...")
        try:
            from model_trainer import ModelTrainer
            trainer = ModelTrainer()
            trainer.train_all_models()
            print("Models trained successfully!")
        except Exception as e:
            print(f"Error training models: {e}")
            print("The application will train models on first prediction request.")
    else:
        print("Models found. Loading existing models...")
        if predictor.load_models():
            print("Models loaded successfully!")
        else:
            print("Failed to load models. Will retrain on first request.")
    
    print("AutoPrice AI is ready!")

if __name__ == '__main__':
    setup_application()
    
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Run the application
    print(f"\nStarting Flask server on port {port}...")
    print(f"Open your browser and go to: http://localhost:{port}")
    print("Press Ctrl+C to stop the server")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=True if len(sys.argv) > 1 and sys.argv[1] == '--debug' else False
    )