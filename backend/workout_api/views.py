from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, CreateModelMixin

from . import models
from django.contrib.auth.models import User
from . import serializers

# Create your views here.
class UserRegister(GenericAPIView, CreateModelMixin):
    
    permission_classes=[AllowAny]
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    

class WorkoutCreate(GenericAPIView, CreateModelMixin):
    permission_classes=[IsAuthenticated]

    queryset = models.Workout.objects.all()
    serializer_class = serializers.WorkoutSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class WorkoutRetrieve(GenericAPIView, RetrieveModelMixin):
    permission_classes=[IsAuthenticated]

    queryset = models.Workout.objects.all()
    serializer_class = serializers.WorkoutSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
