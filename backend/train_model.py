import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
import json
import matplotlib.pyplot as plt
from sklearn.utils.class_weight import compute_class_weight
import numpy as np
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# Define constants
IMAGE_SIZE = (128, 128)
BATCH_SIZE = 32
DATA_DIR = 'data/'

# --- MODIFIED PART ---
# Create an ImageDataGenerator with Data Augmentation
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=20,      # <-- Add these lines for augmentation
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

# Create a generator for training data
train_generator = datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

# The validation generator should NOT have augmentation
validation_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

# Create a generator for validation data
validation_generator = validation_datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Save the class indices to a file for use in the API
class_indices = train_generator.class_indices
labels = {v: k for k, v in class_indices.items()}
with open('class_labels.json', 'w') as f:
    json.dump(labels, f)
print(f"Class labels saved: {labels}")

# Compute class weights to handle imbalance
class_names = list(train_generator.class_indices.keys())
class_indices = list(train_generator.class_indices.values())
labels_for_weights = []
for class_name, idx in train_generator.class_indices.items():
    labels_for_weights += [idx] * train_generator.samples
class_counts = [len(train_generator.filepaths) for c in class_names]
class_weight = compute_class_weight(
    class_weight='balanced',
    classes=np.unique(train_generator.classes),
    y=train_generator.classes
)
class_weight = dict(enumerate(class_weight))
print(f"Class weights: {class_weight}")


# --- MODIFIED PART ---
# Build the transfer learning model with MobileNetV2
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(IMAGE_SIZE[0], IMAGE_SIZE[1], 3))
base_model.trainable = False  # Freeze base model

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.5)(x)
predictions = Dense(4, activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=predictions)

model.compile(optimizer=Adam(learning_rate=1e-4),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.summary()

# Add EarlyStopping callback
early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

# Train the model
print("--- Starting New Model Training with Augmentation ---")
history = model.fit(
    train_generator,
    validation_data=validation_generator,
    epochs=35, # You can start with 50 epochs
    class_weight=class_weight,
    callbacks=[early_stopping]
)

# Save the trained model
model.save('kidney_stone_cnn_model.h5')
print("--- New model saved as kidney_stone_cnn_model.h5 ---")

# Plot training & validation accuracy and loss
plt.figure(figsize=(12,5))
plt.subplot(1,2,1)
plt.plot(history.history['accuracy'], label='Train Acc')
plt.plot(history.history['val_accuracy'], label='Val Acc')
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.subplot(1,2,2)
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Val Loss')
plt.title('Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.tight_layout()
plt.savefig('training_history.png')
plt.close()
print('Training history plot saved as training_history.png')