""" Imports """
from django.db import models
from apps.abstract.models import AbstractModel



"""--------------------------------------------------------------------------------------
    Region model
--------------------------------------------------------------------------------------"""
class Region(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self) -> str:
        return f"Name: {self.name} - Id: {self.id}"



"""--------------------------------------------------------------------------------------
    Region model
--------------------------------------------------------------------------------------"""
class Continent(models.Model):
   name = models.CharField(max_length=150)



"""--------------------------------------------------------------------------------------
    Country model
--------------------------------------------------------------------------------------"""
class Country(AbstractModel):
    name = name = models.CharField(max_length=150, verbose_name='Country')
    inhabitants = models.IntegerField(default=0)
    continent = models.ForeignKey(Continent, on_delete=models.CASCADE)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
   
   
    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'
        ordering = ('name', 'continent', 'region')
        db_table = 'apps.country'
