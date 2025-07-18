from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import json

# Initialize Flask app
app = Flask(__name__)
# Allow CORS for frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

# Load the trained CNN model and class labels
model = tf.keras.models.load_model('kidney_stone_cnn_model.h5')
with open('class_labels.json', 'r') as f:
    labels = json.load(f)

IMAGE_SIZE = (128, 128)

def prepare_image(image_file):
    img = Image.open(image_file).convert('RGB')
    img = img.resize(IMAGE_SIZE)
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array / 255.0

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file:
        prepared_image = prepare_image(file)
        
        # Make prediction
        predictions = model.predict(prepared_image)
        
        # Get the class with the highest probability
        predicted_index = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_index])
        
        # Map index to label name
        predicted_label = labels[str(predicted_index)]
            
        return jsonify({
            'prediction_label': predicted_label,
            'confidence': f"{confidence:.2f}"
        })

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # Hardcoded credentials
    if username == 'admin' and password == 'password123':
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(port=5000, debug=True)