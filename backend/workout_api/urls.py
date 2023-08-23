from django.urls import path

from . import views

urlpatterns = [
    path('workoutCreate/', views.WorkoutCreate.as_view()),
]
