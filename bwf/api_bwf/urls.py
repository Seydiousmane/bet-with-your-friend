from rest_framework import routers
from django.urls import path

from .views import GroupViewSet, EventViewSet, MemberViewSet, UserViewSet
app_name = 'api_bwf'

router_bwf = routers.SimpleRouter()
router_bwf.register('groups', GroupViewSet, basename='groups')
router_bwf.register('events', EventViewSet, basename='events')
router_bwf.register('members', MemberViewSet, basename='events')
router_bwf.register('users', UserViewSet, basename='users')
router_bwf.register('users', UserViewSet, basename='users')