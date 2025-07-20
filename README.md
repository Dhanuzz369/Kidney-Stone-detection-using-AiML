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

## Screenshots

<img width="1908" height="968" alt="Screenshot 2025-07-19 193125" src="https://github.com/user-attachments/assets/07f9a8a9-8d0b-4701-b338-33bde8c40455" />
<img width="1905" height="959" alt="Screenshot 2025-07-19 193156" src="https://github.com/user-attachments/assets/a552cfd1-a3f4-4b61-a44b-1e2d8d8cc7de" />


<img width="1903" height="947" alt="Screenshot 2025-07-19 193441" src="https://github.com/user-attachments/assets/9f5569fa-8f12-46e4-a03b-4b56870e675c" />
<img width="1877" height="955" alt="Screenshot 2025-07-19 193535" src="https://github.com/user-attachments/assets/08328f07-a8e3-4b98-9014-9225ae6282c2" />






