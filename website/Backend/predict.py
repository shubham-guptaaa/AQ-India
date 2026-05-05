import sys
import json
import joblib
import numpy as np

# Load models
rf_pm10 = joblib.load('rf_pm10_model.joblib')
rf_pm25 = joblib.load('rf_pm25_model.joblib')

# Get input data
input_data = json.loads(sys.argv[1])
features = ['AOD', 'RH', 'WS', 'T_MERRA']  # Adjust based on final_ml_dataset.csv
X = np.array([[input_data.get(f, 0) for f in features]])

# Predict
pm25_pred = rf_pm25.predict(X)[0]
pm10_pred = rf_pm10.predict(X)[0]

print(json.dumps({'PM2_5': pm25_pred, 'PM10': pm10_pred}))