from django.db import models
from django.contrib.auth.models import User
from enum import Enum

# Create your models here.
class BodyPart(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.name


class Exercise(models.Model):

    def upload_to(instance, filename):
        return 'images/{filename}'.format(filename=filename)

    class EquipmentChoices(Enum):
        BARB = 'Barbell'
        BDWT = 'Bodyweight'
        DMBL = 'Dumbbell'
        MCHN = 'Machine'
        CBLE = 'Cable'

    name = models.CharField(unique=True, max_length=200)
    bodypart = models.ManyToManyField(BodyPart)
    equipment = models.CharField(choices=[(tag, tag.value) for tag in EquipmentChoices] )
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    
class Pr(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    data = models.DateField(auto_now=True)

class WorkoutComponent(models.Model):
    exercise =  models.ForeignKey(Exercise, on_delete=models.CASCADE)
    weight = models.DecimalField(decimal_places=2, max_digits=6)
    reps = models.SmallIntegerField()
    sets = models.SmallIntegerField()

class Workout(models.Model):
    components = models.ManyToManyField(WorkoutComponent)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()

class WorkoutRoutine(models.Model):
    exercises = models.ManyToManyField(Exercise)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=300)
    active = models.BooleanField(default=False) 
    created = models.DateTimeField(auto_now=True)

    