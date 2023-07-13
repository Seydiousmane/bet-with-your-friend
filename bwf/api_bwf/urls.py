from rest_framework import routers

from .views import GroupViewSet, EventViewSet, MemberViewSet

router_bwf = routers.SimpleRouter()
router_bwf.register('groups', GroupViewSet, basename='groups')
router_bwf.register('events', EventViewSet, basename='events')
router_bwf.register('members', MemberViewSet, basename='events')