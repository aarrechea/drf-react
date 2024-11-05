# Imports
from django.contrib import admin
from apps.evaluations.models import Evaluation


@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = [item.name for item in Evaluation._meta.fields if item.name != 'id']
    
    
    