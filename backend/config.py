import os

class Config:
    DEBUG = os.environ.get('DEBUG', 'False') == 'True'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///health_prediction.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    AI_API_KEY = os.environ.get('AI_API_KEY', 'your_api_key_here')
    AI_API_URL = os.environ.get('AI_API_URL', 'https://api.example.com/predict')