from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework import status
from .models import Food
from .serializers import FoodSerializer

# ✅ Custom permission to allow only owners to edit/delete
class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["GET", "POST"]:  # Allow anyone to view & create
            return True
        return obj.user == request.user  # ✅ Only owner can update/delete

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]  # ✅ Apply permissions

    def perform_create(self, serializer):
        """Assign the logged-in user to the Food object"""
        serializer.save(user=self.request.user)  # ✅ Ensure user is saved

    def destroy(self, request, *args, **kwargs):
        """Allow only the owner to delete their food"""
        instance = self.get_object()
        if instance.user != request.user:
            return Response({"error": "You can only delete your own food."}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """Allow only the owner to update their food"""
        instance = self.get_object()
        if instance.user != request.user:
            return Response({"error": "You can only edit your own food."}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)
