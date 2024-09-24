
# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models



class ImageModel(models.Model):
    image=models.ImageField(upload_to='images/')
    title =models.CharField(max_length=150)
    
    def __str__(self):
        return self.description or "image"
    

class CustomUser(AbstractUser):
    pass