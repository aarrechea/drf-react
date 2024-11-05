# Imports
from django.contrib import admin
from apps.relations.models import Relation




@admin.register(Relation)
class RelationAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Relation._meta.get_fields()]