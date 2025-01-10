# Imports
from django.contrib import admin
from apps.industry.models import Industry




@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name',        
    )
