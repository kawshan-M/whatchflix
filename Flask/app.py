from flask import Flask, render_template, request
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np 

app = Flask(__name__)

# Load the model
model = load_model("keras_model.h5", compile=False)

# Load the labels
class_names = open("labels.txt", "r").readlines()

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Define a function to predict the image
def predict_image(image_path):
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    
    # Open and resize the image
    image = Image.open(image_path).convert("RGB")
    size = (224, 224)
    image = ImageOps.fit(image, size)
    
    # Convert the image to a numpy array and normalize
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
    data[0] = normalized_image_array
    
    # Make the prediction
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]
    
    return class_name[2:], confidence_score

# Define a route to handle the image upload
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # Get the uploaded file
        file = request.files['file']
        
        # Save the file to disk
        file.save(file.filename)
        
        # Get the prediction
        class_name, confidence_score = predict_image(file.filename)
        
        # Render the template with the prediction result
        return render_template('result.html', class_name=class_name, confidence_score=confidence_score)
    
    return '''
    <!doctype html>
    <html>
    <body>
        <h1>Upload an image to predict</h1>
        <form method="POST" enctype="multipart/form-data">
            <input type="file" name="file">
            <input type="submit" value="Predict">
        </form>
    </body>
    </html>
    '''

if __name__ == '__main__':
    app.run(debug=True)
