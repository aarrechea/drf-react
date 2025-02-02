""" Imports """
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from apps.abstract.viewsets import AbstractViewSet
from apps.auth.permissions import UserPermission
from apps.country.models import Country, Region, Continent
from apps.country.serializers import CountrySerializer, RegionSerializer



""" Country view set """
class CountryViewSet(AbstractViewSet):
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = (UserPermission, )
    serializer_class = CountrySerializer  
    
    
    def get_queryset(self):                        
        queryset = Country.objects.all()                        
        return queryset
    
    
    def get_object(self):        
        obj = Country.objects.get_object_by_public_id(self.kwargs['pk'])        
        self.check_object_permissions(self.request, obj)                
        
        return obj
    
    
    def create(self, request, *args, **kwargs):                                
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)        
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
    



    
    
    
    
    
    
    
