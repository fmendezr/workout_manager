from django.contrib import admin
from  . import models
# Register your models here.

admin.site.register(models.BodyPart)
admin.site.register(models.Exercise)
admin.site.register(models.Pr)
admin.site.register(models.WorkoutComponent)
admin.site.register(models.Workout)
admin.site.register(models.WorkoutRoutine)