"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.db import models
from apps.abstract.models import AbstractModel



"""--------------------------------------------------------------------------------------
   Industry model
--------------------------------------------------------------------------------------"""
class Industry(AbstractModel):
   name = models.CharField(max_length=150)

   def __str__(self):
       return self.name
   



"""--------------------------------------------------------------------------------------
   Supersector model
--------------------------------------------------------------------------------------"""
class Supersector(AbstractModel):
   name = models.CharField(max_length=150)
   industry = models.ForeignKey(Industry, on_delete=models.CASCADE, related_name='supersectors')

   def __str__(self):
       return self.name
   



"""--------------------------------------------------------------------------------------
   Sector model
--------------------------------------------------------------------------------------"""
class Sector(AbstractModel):
   name = models.CharField(max_length=150)
   supersector = models.ForeignKey(Supersector, on_delete=models.CASCADE, related_name='sectors')

   def __str__(self):
       return self.name
   


"""--------------------------------------------------------------------------------------
   Subsector model
--------------------------------------------------------------------------------------"""
class Subsector(AbstractModel):
   name = models.CharField(max_length=150)
   sector = models.ForeignKey(Sector, on_delete=models.CASCADE, related_name='subsectors')

   def __str__(self):
      return self.name
   









