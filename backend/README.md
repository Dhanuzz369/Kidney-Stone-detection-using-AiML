# Backend - Kidney Stone AI Analyzer

Flask backend server for the kidney stone classification AI model.

## Setup

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Mac/Linux
# or
venv\Scripts\activate     # On Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## Files

- `app.py` - Main Flask application
- `train_model.py` - Script to train the CNN model
- `kidney_stone_cnn_model.h5` - Pre-trained model file
- `class_labels.json` - Class labels for predictions
- `samples/` - Sample images for testing
- `training_history.png` - Training history visualization