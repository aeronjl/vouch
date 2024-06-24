from django.db import models

class Paper(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField()
    votes = models.IntegerField(default=0)