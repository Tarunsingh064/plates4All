from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField  # Add this import

class Food(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=240)
    photo = models.ImageField("/media", blank=True, null=True)
    phone_number = PhoneNumberField(blank=True, null=True)  # New phone number field
    Created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    adress = models.CharField(max_length=255, default='No address')

    def __str__(self):
        return f'{self.user.username}'