""" Imports """
from django.db import models



"""--------------------------------------------------------------------------------------
    Region model
--------------------------------------------------------------------------------------"""
class Region(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self) -> str:
        return f"Name: {self.name} - Id: {self.id}"