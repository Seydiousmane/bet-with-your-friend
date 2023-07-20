from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import Group, Event, Member
from .serializers import GroupSerializer, EventSerializer, GroupDetailSerializer, GroupListSerializer, UserSerializer, MemberSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

from rest_framework.decorators import permission_classes, api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken

import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.apps import apps
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

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
    
    
class MemberViewSet(ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    serializer_class = UserSerializer
        
    @action(detail=False, methods=['post'])
    def join(self, request):
       
        try:
            """ access_token_obj = AccessToken(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NDQwNDkwLCJpYXQiOjE2ODk0NDAxOTAsImp0aSI6IjkwOGI2MzQ3NDdkYzQyNzZiZDZjOGY0ZDVkZDU2MGRlIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJwYWJpIn0.yUJAG87aXI4r5nNMZ9nzXGUWDsL2y_JltNfDsa_SYFQ")
                        user_id=access_token_obj['user_id']
                        user=User.objects.get(id=user_id)

                        usered = user.id
                        group=Group.objects.get(id=usered) """
            group = Group.objects.get(id=request.data['group'])
            user= User.objects.get(id=1)
            member = Member.objects.create(user=user, group=group, admin=False)
            serializer = MemberSerializer(member, many=False)
            response = {'message': 'Joined group', 'results': serializer.data}

            return Response(response, status=status.HTTP_200_OK)
        except:
            response = {'message': 'Cannot join'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        
""" class GetUser():
    def get_user_from_access_token_in_django_rest_framework_simplejwt(access_token_str, *args, **kwargs):
        access_token_obj = AccessToken(access_token_str)
        user_id=access_token_obj['user_id']
        user=User.objects.get(id=user_id)
        print('user_id: ', user_id )
        print('user: ', user)
        print('user.id: ', user.id )
        content =  {'user_id': user_id, 'user':user, 'user.id':user.id}
        return Response(content) """