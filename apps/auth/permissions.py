""" Imports """
from rest_framework.permissions import BasePermission, SAFE_METHODS
import json



""" User permission class """
class UserPermission(BasePermission):
    # works in the object level
    def has_object_permission(self, request, view, obj):        
        if request.user.is_anonymous:
            return request.method in SAFE_METHODS # get, options, and head
        
        if view.basename in ['element', 'relations']:
            # if the user did not create the object, it does not have access to it
            if obj.user_creator.public_id != request.user.public_id:
                return False
            
            return bool(request.user and request.user.is_authenticated)
        
        return False
    
    
    # works in the overall endpoint
    def has_permission(self, request, view):           
        if view.basename in ['element', 'relations']:
            if request.user.is_anonymous:
                return request.method in SAFE_METHODS                        
            
            return bool(request.user and request.user.is_authenticated)
        
        return False
            



