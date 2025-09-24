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

Due to the large size of this dataset (~GB), it's excluded from the Git repository by default and only sample X-ray images from Normal, Stone, Cyst, and Tumor are present in this folder.

If you need the whole datset for model training and predictions then you can use this link for downloading the dataset:https://www.kaggle.com/datasets/nazmul0087/ct-kidney-dataset-normal-cyst-tumor-and-stone

## Dataset Statistics

- **Cyst**: 3,709 images
- **Normal**: 5,077 images  
- **Stone**: 1,377 images
- **Tumor**: 2,283 images
