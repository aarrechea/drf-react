""" Imports """
from apps.abstract.viewsets import AbstractViewSet
from apps.auth.permissions import UserPermission
from apps.relations.serializers import RelationSerializer
from apps.relations.models import Relation


""" Relations viewset """
class RelationViewSet(AbstractViewSet):
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = (UserPermission, )
    serializer_class = RelationSerializer
    
    
    def get_queryset(self):        
        queryset = Relation.objects.all()                                            
                
        return queryset
    





