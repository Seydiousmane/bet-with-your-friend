from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from .models import Group, Event, Member


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id', 'username')
    
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model=Event
        fields=('id', 'team1', 'team2', 'time', 'score1', 'score2', 'group')


class MemberSerializer(serializers.ModelSerializer):
    user = CurrentUserDefault()

    class Meta:
        model=Member
        fields=('user', 'group', 'admin')


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
    members = serializers.SerializerMethodField()

    class Meta:
        model=Group
        fields=['id', 'name', 'location', 'description', 'active', 'events', 'members']

    def get_events(self, instance):
        queryset = instance.events.filter(active=True)
        serializer = EventSerializer(queryset, many=True)
        return serializer.data
    
    def get_members(self, obj):
        people_points = []
        #queryset = instance.members.all()
        members = obj.members.all()
        for member in members:
            points = 0
            member_serialized = MemberSerializer(member, many=False)
            member_data = member_serialized.data
            member_data['points'] = points
            people_points.append(member_data)
   
        return people_points