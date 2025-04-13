from django.urls import path, include
#from rest_framework.routers import DefaultRouter
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'foods', views.FoodViewSet, basename='food')

urlpatterns = [
    path('', include(router.urls)),  # Include all the router-generated URLs
    path('food/',views.FoodViewSet.as_view,name='food'),
    #path("foods/<int:pk>/", views.FoodDetailView.as_view(), name="food-detail"),
]
