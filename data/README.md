# Dataset - Kidney Stone CT Scan Images

This directory contains the training dataset for the kidney stone classification model.

## Dataset Structure

```
data/
├── Cyst/          # Kidney cyst images (~3,700+ images)
├── Normal/        # Normal kidney images (~5,000+ images)  
├── Stone/         # Kidney stone images (~1,300+ images)
└── Tumor/         # Kidney tumor images (~2,200+ images)
```

## Dataset Information

- **Total Images**: ~12,000+ CT scan images
- **Image Format**: JPG
- **Classes**: 4 (Cyst, Normal, Stone, Tumor)
- **Source**: Medical CT scan dataset (typically from Kaggle)

## Usage

This dataset is used by:
- `backend/train_model.py` - For training the CNN model
- `backend/app.py` - For loading class labels and model predictions

## Note

Due to the large size of this dataset (~GB), it's excluded from the Git repository by default. 
If you need to share the dataset:

1. Upload to cloud storage (Google Drive, AWS S3, etc.)
2. Or use Git LFS for large file storage
3. Or provide download instructions in the main README

## Dataset Statistics

- **Cyst**: 3,709 images
- **Normal**: 5,077 images  
- **Stone**: 1,377 images
- **Tumor**: 2,283 images