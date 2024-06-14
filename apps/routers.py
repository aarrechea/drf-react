""" Imports """
from rest_framework import routers
from apps.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
from apps.element.viewsets import ElementViewSet
from apps.user.viewsets import UserViewSet
from apps.relations.viewsets import RelationViewSet



""" Router definition """
router = routers.SimpleRouter()



""" User router """
router.register(r'user', UserViewSet, basename='user')



""" Auth router """
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')



""" Element """
router.register(r'element', ElementViewSet, basename='element')



""" Relations """
router.register(r'relations', RelationViewSet, basename='relations')



""" Url patterns """
urlpatterns = [        
    *router.urls,
]



