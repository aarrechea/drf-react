# Imports
from django.contrib import admin
from apps.relations.models import Relation, RelationTree


@admin.register(Relation)
class RelationAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'total_elements',
        'competences',
        'capabilities',
        'processes',
        'eva_made',
        'eva_progress',
        'user_creator',
        'comments',
        'status',
    ]
    
    
    
@admin.register(RelationTree)
class RelationTreeAdmin(admin.ModelAdmin):
    list_display = [item.name for item in RelationTree._meta.fields if item.name != 'id']