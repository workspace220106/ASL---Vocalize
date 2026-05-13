import os
import sys
import numpy as np
import tensorflow as tf

# Fix Unicode emoji printing on Windows terminals
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "best_asl_model.keras")
LABELS_PATH = os.path.join(BASE_DIR, "models", "labels.npy")

model = None
labels = []

if os.path.exists(MODEL_PATH) and os.path.exists(LABELS_PATH):
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        labels = np.load(LABELS_PATH, allow_pickle=True)
        print("[OK] Model loaded successfully")
    except Exception as e:
        print(f"[ERROR] Failed to load model: {e}")
else:
    print(f"[WARNING] Model or labels not found at {MODEL_PATH}. Prediction will be disabled.")

def predict(img):
    if model is None or len(labels) == 0:
        return "Model Unavailable", 0.0
    preds = model.predict(img, verbose=0)[0]
    idx = np.argmax(preds)
    confidence = float(preds[idx])
    return labels[idx], confidence
