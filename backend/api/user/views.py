
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import RegisterSerializers,UserSerializers,LoginSerializers  # Make sure you have both serializers

# User Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializers  # Fixed typo here

# User ViewSet to list and manage users
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers

class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializers
    def post(self,request,*args, **kwargs):
        username= request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username,password = password)

        if user is not None:
            refresh  = RefreshToken.for_user(user)
            user_serializer = UserSerializers(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_serializer.data
            })
        else:
            return Response({'detail':'Invalid credentials'},status=401)
class DashboadView(APIView):
    permission_classes = ({IsAuthenticated})
    def get(self,request):
        user = request.user
        user_serializer= UserSerializers(user)
        return Response({'message':'welcome to dashboard',
                         'user':user_serializer.data},200)
                         
class LogoutView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=200)
        except Exception as e:
            return Response({"detail": "Invalid or expired token"}, status=400)


