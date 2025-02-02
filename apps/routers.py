""" Imports """
from rest_framework import routers
from rest_framework_nested import routers
from apps.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
from apps.companies.viewsets import CompanyViewSet

from apps.country.viewsets import CountryViewSet
from apps.element.viewsets import ElementViewSet
from apps.evaluations.viewsets import EvaluationsViewSet, DataModelViewSet
from apps.industry.viewsets import IndustryViewSet
from apps.region.viewsets import RegionViewSet
from apps.relations.viewsets import RelationViewSet
from apps.user.viewsets import UserViewSet



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


""" Countries """
router.register(r'countries', CountryViewSet, basename='countries')
router.register(r'region', RegionViewSet, basename='region')
#router.register(r'continent', ContinentViewSet, basename='continent')


""" Industry """
router.register(r'industry', IndustryViewSet, basename='industry')
#router.register(r'supersector', SupersectorViewSet, basename='supersector')
#router.register(r'sector', SectorViewSet, basename='sector')
#router.register(r'subsector', SubsectorViewSet, basename='subsector')


""" Companies """
router.register(r'company', CompanyViewSet, basename='company')


""" Evaluations """
router.register(r'evaluations', EvaluationsViewSet, basename='evaluations')


""" Data model """
router.register(r'data-model', DataModelViewSet, basename='data-model')



""" Url patterns """
urlpatterns = [        
    *router.urls,
]



