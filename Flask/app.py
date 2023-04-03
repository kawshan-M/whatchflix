from flask import Flask, render_template, request
import base64
from io import BytesIO
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
import cv2
from flask import jsonify

app = Flask(__name__)

def preprocess_image(image_data):
    # Decode the image data and convert it to a NumPy array
    decoded_image = base64.b64decode(image_data.split(',')[1])
    image = Image.open(BytesIO(decoded_image))
    image_array = np.array(image)
    
    # Preprocess the image array
    
    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image_array, cv2.COLOR_RGB2GRAY)
    
    # Resize the image to 48x48 pixels
    resized_image = cv2.resize(gray_image, (48, 48))
    
    # Rescale the pixel values to be between 0 and 1
    normalized_image = resized_image / 255.0
    
    # Add an extra dimension to the image array to make it compatible with the model
    final_image = np.expand_dims(normalized_image, axis=-1)
    
    # Return the preprocessed image array
    return image_array

def predict_mood(image_data):
    # Preprocess the image data
    image_array = preprocess_image(image_data)
    
    # Load the Keras model
    model = load_model('keras_model.h5')
    
    # Make a prediction
    prediction = model.predict(np.array([image_array]))
    
    # TODO: Return the predicted mood
    return prediction

@app.route('/')
def index():
    return render_template('camera.html')

@app.route('/capture', methods=['POST'])
def capture():
    image_data = request.form['imageData']
    predicted_mood = predict_mood(image_data)
    # TODO: Add your code to show the predicted mood
    return "OK"

if __name__ == '__main__':
    app.run(debug=True)
