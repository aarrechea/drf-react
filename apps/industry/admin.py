# Imports
from django.contrib import admin
from apps.industry.models import Industry, Sector, Supersector, Subsector




@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name',        
    )
    
    
@admin.register(Supersector)
class SupersectorAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name',        
        'industry'
    )


@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name',  
        'supersector'      
    )
    
    
@admin.register(Subsector)
class SubsectorAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name',        
        'sector'
    )