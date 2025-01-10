""" Imports """
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.abstract.viewsets import AbstractViewSet
from apps.auth.permissions import UserPermission
from apps.industry.models import Industry
from apps.industry.serializers import IndustrySerializer



""" Industry viewset """
class IndustryViewSet(AbstractViewSet):
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = (UserPermission, )
    serializer_class = IndustrySerializer
    
    
    def get_queryset(self):        
        queryset = Industry.objects.all()
                      
        return queryset
    
    
""" class SupersectorViewSet(AbstractViewSet):
        serializer_class = SupersectorSerializer
    
        def get_queryset(self):                                    
            queryset = Industry.objects.all().filter(industry=id)
                        
            return queryset
        
        
class SubsectorViewSet(AbstractViewSet):
    serializer_class = SubsectorSerializer
    
    def get_object(self):                                
        obj = Subsector.objects.get(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        
        return obj """
    
    