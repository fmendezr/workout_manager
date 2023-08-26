from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.UserRegister.as_view()),
    path('workout_create/', views.WorkoutCreate.as_view()),
]
