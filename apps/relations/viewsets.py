""" Imports """
from django.db import transaction
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from apps.abstract.viewsets import AbstractViewSet
from apps.auth.permissions import UserPermission
from apps.element.models import Element
from apps.evaluations.serializers import EvaluationScoreSerializer
from apps.relations.serializers import RelationSerializer, RelationTreeSerializer
from apps.relations.models import Relation, RelationTree



""" Relations viewset """
class RelationViewSet(AbstractViewSet):
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = (UserPermission, )
    serializer_class = RelationSerializer
            
            
    def get_queryset(self):
        queryset = Relation.objects.all()                
                
        return queryset
    
    
    def perform_create(self, serializer):                        
        new_object = serializer.save()
        
        return new_object
    
    
    # Create is the viewset action excecuted on POST requests on the endpoint linked to viewset    
    def create(self, request, *args, **kwargs):
        newData = fcnPrepareData(request)        
        serializer = self.get_serializer(data=newData)                
                
        if serializer.is_valid():
            with transaction.atomic():                
                newObject = self.perform_create(serializer)                
                errorsTree = create_relation_tree(request.data[0]['table'], newObject.id, self)                                
                
                # to send the id of the new relation created to change the mode from create to edit
                newElement = Relation.objects.all().order_by('-id')[:1].values()
                                                
                return Response(newElement[0], status=status.HTTP_201_CREATED)
        
        elif serializer.errors:                                    
            return Response({'error':serializer.errors['name'][0]})        
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)        
    
        
    # Update method override    
    def update(self, request, *args, **kwargs):        
        newData = fcnPrepareData(request)
                
        instance = self.get_object()
        
        serializer = self.get_serializer(instance, data=newData)
        
        if serializer.is_valid():
            with transaction.atomic():
                self.perform_update(serializer)
            
                update_relation_tree(self, request.data[0]['table'], instance)
            
                return Response({'status':'ok', 'serializer':serializer.data}, status=status.HTTP_200_OK)
            
        elif serializer.errors:            
            return Response({'error':serializer.errors['name'][0]})
        
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST) 
        
        
    # Delete the relation
    def destroy(self, request, *args, **kwargs):        
        obj = Relation.objects.get(id=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        self.perform_destroy(obj)    
        
        queryset = self.get_queryset()
                
        return Response(queryset.values(), status=status.HTTP_200_OK)
    
        
    @action(methods=['get'], detail=True, permission_classes=[AllowAny])
    def get_object_tree(self, request, pk=None):
        serializer_class = RelationTreeSerializer                
        
        newObject = []
                
        relation = Relation.objects.get(id=pk)
        relation_name = relation.name
        
        eva_scores = relation.evaluation.all()[0].evaScore.all().order_by('form_number')                        
        serializer_eva_scores = EvaluationScoreSerializer(data=eva_scores, many=True)        
        serializer_eva_scores.is_valid()     
        
        obj = relation.relation_tree.all().order_by('order').values()
        obj_list = list(obj)
        
        
        for object in obj_list:            
            element = Element.objects.get(id=object['element_id'])
            
            newObject.append({
                'order': object['order'],
                'capability_number': object['capability_number'],
                'process_number': object['process_number'],
                'percentage': object['percentage'],
                'element_type': int(object['element_type']),
                'relation_letter': object['relation_letter'],
                'relation_letter_display': object['relation_letter_display'],
                'element': element.id,
                'relation': relation.id,
                'name':element.name,
                'elementObject':element
            })

        serializer = serializer_class(data=newObject, many=True)
        serializer.is_valid(raise_exception=True)
        self.check_object_permissions(self.request, obj)
        
        response = {
            'data':serializer.data,
            'relation_name':relation_name,
            'eva_scores':serializer_eva_scores.data
        }
                                
        return Response(response)
    


""" Function to create the relation tree related to the relation created before. """
def create_relation_tree(table, id, self):
        newObject = []
                
        relation = Relation.objects.get(id=id)
                        
        for object in table:            
            element = Element.objects.get(id=object['id'])
            
            if int(element.element_type) == 1:
                related_competence = element.id
                related_capability = 0            
            elif int(element.element_type) == 2:
                related_capability = element.id
                                
            newObject.append({                                
                'order': object['order'],
                'capability_number': object['capability_number'],
                'process_number': object['process_number'],
                'percentage': object['percentage'],
                'element_type': int(object['element_type']),
                'relation_letter': object['letter'],
                'relation_letter_display': object['letter_display'],
                'element': element.id,
                'relation': relation.id,
                'related_competence':related_competence,
                'related_capability':related_capability                
            })
                            
        serializer = RelationTreeSerializer(data=newObject, many=True)        
        serializer.is_valid(raise_exception=True)
                
        self.perform_create(serializer)
        
        return serializer
    
    
""" Function to update the relation tree after to update the relation """    
def update_relation_tree(self, table, instance):
    newObject = []        
    
    for object in table:                
        element = Element.objects.get(id=object['element'])
            
        newObject.append({                                
            'order': object['order'],
            'capability_number': object['capability_number'],
            'process_number': object['process_number'],
            'percentage': object['percentage'],
            'element_type': int(object['element_type']),
            'relation_letter': object['relation_letter'],
            'relation_letter_display': object['relation_letter_display'],
            'element': element.id,
            'relation': instance.id
        })
    
    RelationTree.objects.filter(relation=instance.id).delete()
                        
    serializer = RelationTreeSerializer(data=newObject, many=True)
    serializer.is_valid(raise_exception=True)        
    self.perform_create(serializer)
    
    return serializer


""" Count competences, capabilities, and processes in the relation tree """
def fcnCountElements(table):
    elements = []
    processes = 0
    capabilities = 0
    competences = 0
    
    for element in table:
        match int(element['element_type']):
            case 1:
                competences += 1
            case 2:
                capabilities += 1
            case 3:
                processes += 1 
        
    elements.append(competences)
    elements.append(capabilities)
    elements.append(processes)
        
    return elements


""" Function to prepare data to create or update the relation. Data will be pulled from request """
def fcnPrepareData(request):
    total_elements = len(request.data[0]['table'])
    count_elements = fcnCountElements(request.data[0]['table'])    
    
    newData = {
        "name": request.data[1]['name'], 
        "user_creator": request.data[3]['userId'],
        "status": request.data[2]['open'],
        "total_elements": total_elements,
        "competences": count_elements[0],
        "capabilities": count_elements[1],
        "processes": count_elements[2],
    }   
    
    return newData




