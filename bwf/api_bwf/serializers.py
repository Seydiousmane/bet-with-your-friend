from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Group, Event


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id', 'username')
    
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model=Event
        fields=('id', 'team1', 'team2', 'time', 'score1', 'score2', 'group')


class GroupSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)
    class Meta:
        model=Group
        fields='__all__'


class GroupListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields='__all__'


class GroupDetailSerializer(serializers.ModelSerializer):
    events = serializers.SerializerMethodField()
    class Meta:
        model=Group
        fields=['name', 'location', 'description', 'active', 'events']

    def get_events(self, instance):
        queryset = instance.events.filter(active=True)
        serializer = EventSerializer(queryset, many=True)
        return serializer.data