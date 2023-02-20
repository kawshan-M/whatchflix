from flask import Flask, render_template, Response
import cv2
import numpy as np
from keras.preprocessing import image
from keras.models import model_from_json

app = Flask(__name__)

# Load pre-trained facial expression identification model
model_architecture = 'path/to/model_architecture.json'
model_weights = 'path/to/model_weights.h5'
model = model_from_json(open(model_architecture, 'r').read())
model.load_weights(model_weights)

# Define the emotion labels
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

# Load the face detection classifier
face_cascade = cv2.CascadeClassifier('path/to/haarcascade_frontalface_default.xml')

# Initialize the video capture
video_capture = cv2.VideoCapture(0)

def gen_frames():
    while True:
        # Capture frame-by-frame
        success, frame = video_capture.read()

        if not success:
            break
        else:
            # Convert frame to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            # Detect faces in the grayscale frame
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)

            # Loop through detected faces
            for (x, y, w, h) in faces:
                # Crop the face from the frame
                roi_gray = gray[y:y+h, x:x+w]
                roi_color = frame[y:y+h, x:x+w]

                # Resize the cropped face image to 48x48 pixels
                roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

                # Convert the cropped face image to a tensor for input to the model
                img = image.img_to_array(roi_gray)
                img = np.expand_dims(img, axis=0)
                img /= 255

                # Use the model to predict the emotion label for the cropped face image
                predictions = model.predict(img)
                predicted_emotion = emotion_labels[np.argmax(predictions[0])]

                # Draw a rectangle around the detected face and display the predicted emotion label
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                cv2.putText(frame, predicted_emotion, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

            # Return the modified frame
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
