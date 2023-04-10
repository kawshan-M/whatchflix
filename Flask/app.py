from flask import Flask, request, jsonify
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import io
import base64

app = Flask(__name__)

# Load the model
model = load_model("/keras_model.h5", compile=False)

# Define the labels
class_names = {
    0: "Positive",
    1: "Negative",
    2: "Neutral"
}

@app.route('/upload', methods=['POST'])
def upload():
    try:
        # Get the image data from the POST request
        image_data = request.json['image_data']
        # Decode the Base64-encoded image data
        image_bytes = base64.b64decode(image_data)
        # Convert the image data to a PIL Image object
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # Resize and normalize the image
        size = (224, 224)
        image = ImageOps.fit(image, size)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

        # Create the data array for prediction
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_image_array

        # Make prediction
        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index]
        confidence_score = prediction[0][index]

        # Return the prediction as JSON response
        response = {
            'class': class_name,
            'confidence': float(confidence_score)
        }
        return jsonify(response)

    except Exception as e:
        # Return error message if any exception occurs
        response = {
            'error': str(e)
        }
        return jsonify(response), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
