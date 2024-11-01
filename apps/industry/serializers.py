""" Imports """
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from apps.abstract.serializers import AbstractSerializer
from apps.industry.models import Industry, Supersector, Sector, Subsector



""" Industry serializer """
class IndustrySerializer(AbstractSerializer):
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        
        # Supersector
        supersector = Supersector.objects.filter(industry=rep['id'])
        sup_serialized = SupersectorSerializer(supersector, many=True).data
        rep['supersector'] = sup_serialized
        
        # Sector
        lst_sector = []
        for item in supersector:
            lst_sector.append(item.id)
                
        sector = Sector.objects.filter(supersector__in=lst_sector)        
        sector_serialized = SectorSerializer(sector, many=True).data
        rep['sector'] = sector_serialized
        
        # Subsector
        lst_subsector = []
        for item in sector:
            lst_subsector.append(item.id)
                
        subsector = Subsector.objects.filter(sector__in=lst_subsector)
        subsector_serialized = SubsectorSerializer(subsector, many=True).data
        rep['subsector'] = subsector_serialized
                        
        return rep
        
                
    class Meta:
        model = Industry
        fields = '__all__'
        
        
class SupersectorSerializer(AbstractSerializer):
    class Meta:
        model = Supersector
        fields = ['id', 'name', 'industry']       
        
        
class SectorSerializer(AbstractSerializer):
    class Meta:
        model = Sector
        fields = ['id', 'name', 'supersector']
        
        
class SubsectorSerializer(AbstractSerializer):        
    class Meta:
        model = Subsector
        fields = ['id', 'name', 'sector']