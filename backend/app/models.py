from django.db import models

# Create your models here.
class User(models.Model):
    username=models.CharField(max_length=100)
    name=models.CharField(max_length=255)
    email=models.CharField(max_length=20)
    password=models.CharField(max_length=255)


class Note(models.Model):
    title=models.CharField(max_length=200)
    note=models.CharField(max_length=500)
    userid=models.ForeignKey(User,on_delete=models.CASCADE)
    date= models.DateField(auto_now_add=True)

def __str__(self):
    return self.name