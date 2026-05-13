// ASL Vocalize - Client-side AI Logic
let handLandmarker;
let aslModel;
const LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Default ASL labels

async function initAI() {
    console.log("Initializing AI models...");
    
    // 1. Load MediaPipe Hand Landmarker
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task`,
            delegate: "GPU"
        },
        runningMode: "IMAGE",
        numHands: 1
    });

    // 2. Load custom ASL Model (User needs to convert .keras to TF.js)
    try {
        aslModel = await tf.loadLayersModel('model/model.json');
        console.log("ASL Model loaded!");
    } catch (e) {
        console.warn("ASL Model not found at 'model/model.json'. Prediction will be disabled until the model is provided.", e);
    }
}

async function runInference(imageSource) {
    if (!handLandmarker) return { error: "Hand Landmarker not initialized" };

    // Detect hand
    const detections = handLandmarker.detect(imageSource);
    if (!detections.landmarks || detections.landmarks.length === 0) {
        return { prediction: "Unknown", confidence: 0, chat_reply: "No hand detected." };
    }

    if (!aslModel) {
        return { prediction: "Model Missing", confidence: 0, chat_reply: "ASL Model is not loaded. Please convert your .keras model to TF.js and place it in the 'model' folder." };
    }

    // Preprocess: Crop, Resize, Grayscale, Canny (Simplified for now)
    const processedTensor = await preprocessImage(imageSource, detections.landmarks[0]);
    
    // Predict
    const prediction = aslModel.predict(processedTensor);
    const probabilities = await prediction.data();
    const maxIdx = probabilities.indexOf(Math.max(...probabilities));
    const confidence = probabilities[maxIdx];
    const label = LABELS[maxIdx] || "Unknown";

    return {
        prediction: label,
        confidence: confidence,
        chat_reply: `I recognized the sign: ${label}`
    };
}

async function preprocessImage(source, landmarks) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;

    // 1. Find bounding box of landmarks
    let minX = 1, minY = 1, maxX = 0, maxY = 0;
    landmarks.forEach(lm => {
        minX = Math.min(minX, lm.x);
        minY = Math.min(minY, lm.y);
        maxX = Math.max(maxX, lm.x);
        maxY = Math.max(maxY, lm.y);
    });

    // Add some padding
    const padding = 0.05;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(1, maxX + padding);
    maxY = Math.min(1, maxY + padding);

    // 2. Crop and draw to 128x128 canvas
    const sourceW = source.width || source.videoWidth;
    const sourceH = source.height || source.videoHeight;
    const sx = minX * sourceW;
    const sy = minY * sourceH;
    const sWidth = (maxX - minX) * sourceW;
    const sHeight = (maxY - minY) * sourceH;

    ctx.drawImage(source, sx, sy, sWidth, sHeight, 0, 0, 128, 128);

    // 3. Convert to Grayscale and Normalize
    const imageData = ctx.getImageData(0, 0, 128, 128);
    const data = imageData.data;
    const grayscale = new Float32Array(128 * 128);
    for (let i = 0; i < data.length; i += 4) {
        // Simple grayscale: (R+G+B)/3
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        grayscale[i / 4] = avg / 255.0;
    }

    // 4. Create Tensor [1, 128, 128, 1]
    return tf.tensor4d(grayscale, [1, 128, 128, 1]);
}

// Export functions for use in main script
window.initAI = initAI;
window.runInference = runInference;
