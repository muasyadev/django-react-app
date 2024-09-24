import os
import django
from django.core.files import File
from store.models import ImageModel  # Replace 'store' with your actual app name

# Configure Django settings before initializing
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'storeApp.settings')  # Adjust to your settings module
django.setup()

# Define the path to your frontend's public/imgs folder (replace with your actual path)
imgs_folder = '/home/error/Desktop/django-React-Project/frontend/public/imgs'

# Loop through images in the folder
for image_name in os.listdir(imgs_folder):
    image_path = os.path.join(imgs_folder, image_name)
    if os.path.isfile(image_path):  # Ensure it's a file
        with open(image_path, 'rb') as f:
            # Include the file name for clarity
            image_file = File(f, name=image_name)

            # Save the image to the model
            new_image = ImageModel(image=image_file, description=image_name)
            new_image.save()

print('Images successfully imported!')
