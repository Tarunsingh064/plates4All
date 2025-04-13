from rest_framework import serializers
from .models import Food

class FoodSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Food
        fields = ["id", "text", "photo", "phone_number", "Created_at", "updated_at", "username","adress"]
        extra_kwargs = {
            'phone_number': {'required': False}  # Make phone number optional
        }