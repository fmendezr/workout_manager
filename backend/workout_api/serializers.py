from rest_framework import serializers
from django.contrib.auth.models import User
from . import models 


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class ExerciseSerializer(serializers.ModelSerializer):
    bodypart = serializers.StringRelatedField(many=True)

    class Meta:
        model = models.Exercise
        fields = ['name', 'equipment', 'image', 'bodypart']

class PrSerializer(serializers.ModelSerializer):
    exercise = serializers.StringRelatedField()
    
    class Meta:
        model = models.Pr
        fields = ['exercise', 'date', 'user']

class WorkoutComponentSerializer(serializers.ModelSerializer):
    exercise = serializers.StringRelatedField()

    class Meta:
        model = models.WorkoutComponent
        fields = ['weight', 'reps', 'sets', 'exercise']

class WorkoutSerializer(serializers.ModelSerializer):
    workout_components = WorkoutComponentSerializer(many=True)
    user = serializers.StringRelatedField()

    class Meta:
        model = models.Workout
        fields = ['user', 'date', 'workout_components']

    def create(self, validated_data):
        workout_components_data = validated_data.pop('tracks')
        workout = models.Workout.objects.create(**validated_data)
        for workout_component_data in workout_components_data:
            models.WorkoutComponent.objects.create(workout=workout, **workout_component_data)
        return workout
    
class WorkoutRoutineComponent(serializers.ModelSerializer):
    excercises = serializers.StringRelatedField(many=True)
    user = serializers.StringRelatedField()

    class Meta: 
        model =  models.WorkoutRoutine
        fields = ['name', 'user', 'description', 'active', 'created', 'user', 'exercises']