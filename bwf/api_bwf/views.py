from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import Group, Event
from .serializers import GroupSerializer, EventSerializer, GroupDetailSerializer, GroupListSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

from rest_framework.decorators import permission_classes, api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

import json
from django.http import JsonResponse
# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
    
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
  

    
""" class GroupViewSet(ModelViewSet):
    serializer_class = GroupSerializer
    def get_queryset(self):
        return Group.objects.all() """
    

""" class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    def get_queryset(self):
        return Event.objects.all() """


class MultipleSerializerMixin:
    detail_serializer_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve' and self.detail_serializer_class is not None:
            return self.detail_serializer_class
        return super().get_serializer_class()
    

class GroupViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = GroupListSerializer
    detail_serializer_class = GroupDetailSerializer

    def get_queryset(self):
        return Group.objects.filter(active=True)
    
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        self.get_object().disable()
        return Response()


class EventViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = EventSerializer
    def get_queryset(self):
        queryset = Event.objects.filter(active=True)
        group_id = self.request.GET.get('group_id')
        if group_id is not None:
            return queryset.filter(group_id=group_id)
        return queryset   