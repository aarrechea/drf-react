""" Imports """
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from apps.abstract.serializers import AbstractSerializer
from apps.country.models import Country, Region, Continent



""" Country serializer """
class CountrySerializer(AbstractSerializer):
    def to_representation(self, instance):                        
        rep = super().to_representation(instance)
        
        region = Region.objects.get(id=rep['region'])
        continent = Continent.objects.get(id=rep['continent'])

        rep['region'] = region.name
        rep['continent'] = continent.name
        
        return rep
    
    
    class Meta:
        model = Country
        fields = ['id', 'name', 'inhabitants', 'continent', 'region']
        
        
        
""" Region serializer """        
class RegionSerializer(serializers.Serializer):
    
    def create(self, validated_data):
        return super().create(validated_data)
    
            
    class Meta:
        model = Region
        fields = ['id', 'name']