from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, CreateModelMixin

from . import models
from . import serializers

# Create your views here.
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
    
