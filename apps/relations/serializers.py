""" Imports """
from rest_framework.exceptions import ValidationError
from apps.relations.models import Relation
from apps.abstract.serializers import AbstractSerializer



""" Relation serializer """
class RelationSerializer(AbstractSerializer):
    def validate_user_creator(self, value):
        
        print("Enter relation serializer validate user creator")
        
        if self.context['request'].user != value:
            raise ValidationError("You can not create an element")
        
        return value
    
    
    class Meta:
        model: Relation
        fields = ['name', 'total_elements', 'competences', 'capabilities', 'processes', 'eva_made',
                  'eva_progress', 'comments', 'status']


