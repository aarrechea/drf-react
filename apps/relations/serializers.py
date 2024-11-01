""" Imports """
from decimal import Decimal
from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator
from apps.relations.models import Relation, RelationTree
from apps.abstract.serializers import AbstractSerializer
from apps.element.models import Element
from apps.element.serializers import ElementSerializer
from apps.user.models import User



""" Relation serializer """
class RelationSerializer(AbstractSerializer):
    #user_creator = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')
    
    def validate_user_creator(self, value):        
        if self.context['request'].user != value:
            raise ValidationError("You can not create an element")
        
        return value        
    
    class Meta:
        model = Relation
        fields = ['name', 'total_elements', 'competences', 'capabilities', 'processes', 'eva_made',
                'eva_progress', 'comments', 'status', 'user_creator', 'id']
        
        
        
""" Relation tree serializer """        
class RelationTreeSerializer(AbstractSerializer):
    name = serializers.SerializerMethodField()
    public_id = serializers.SerializerMethodField()
    
    
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)        
        element_object = Element.objects.get(id=rep['element'])        
        rep['element_object'] = ElementSerializer(element_object).data
        
        return rep
    
                
                
    def validate_user_creator(self, value):                
        return value
                
                
                
    def validate_percentage(self, value):                
        try:
            percentage = Decimal(value)
            return percentage
        except:
            return False
    
    
    
    # To match the new serializer method field that is not present in the original model.
    def get_name(self, obj):             
        return obj['element'].name
    
    
    
    def get_public_id(self, obj):        
        return obj['element'].public_id
    
    
        
    class Meta:
        model = RelationTree
        fields = ['order', 'capability_number', 'process_number', 'percentage', 'element_type', 'id',
                'relation_letter', 'relation_letter_display', 'element', 'relation', 'name', 'public_id',
                'related_competence', 'related_capability']
        
        

            


