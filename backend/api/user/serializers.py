
from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import IntegrityError

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User  # Fixed typo here
        fields = ('id', 'username', 'email','last_login','date_joined', 'is_active','is_staff','is_superuser')



class RegisterSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user

    
class LoginSerializers(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True,write_only = True)

