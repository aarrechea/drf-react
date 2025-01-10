""" Imports """
from rest_framework import serializers
from apps.country.models import Region


""" Region serializer """        
class RegionSerializer(serializers.Serializer):                
    class Meta:
        model = Region
        fields = ['id', 'name']