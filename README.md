# Kidney Stone AI Analyzer

A full-stack AI-powered web application for classifying kidney CT scan images as Normal, Cyst, Stone, or Tumor.

## Features

- User login authentication
- Upload and analyze kidney CT scan images
- Deep learning model (MobileNetV2 transfer learning)
- Real-time predictions with confidence scores
- Modern, responsive UI

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js & npm (for frontend)

### Backend Setup

1. Create a virtual environment and activate it:
   ```
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```
   python app.py
   ```

### Frontend Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the frontend:
   ```
   npm run dev
   ```

3. Open your browser at [http://localhost:8080](http://localhost:8080)

### Login Credentials

- **Username:** admin
- **Password:** password123

## Project Structure

- `app.py` — Flask backend
- `src/` — React frontend
- `data/` — Image dataset (not included in repo)
- `kidney_stone_cnn_model.h5` — Trained model file

## License

[MIT](LICENSE)
