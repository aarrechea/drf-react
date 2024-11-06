# Imports
from django.contrib import admin
from apps.country.models import Country, Region, Continent




@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name',
        'inhabitants',
        'continent',
        'region',
    )
    
    
@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name',        
    )
    
@admin.register(Continent)
class ContinentAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name',        
    )