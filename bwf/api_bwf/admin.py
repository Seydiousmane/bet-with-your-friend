from django.contrib import admin
from .models import Group, Event, Member

# Register your models here.
admin.site.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom', 'location', 'description']
    list_filter = ['nom']


admin.site.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['team1', 'team2', 'time', 'score1', 'score2', 'group']
    list_filter = ['group']


admin.site.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'admin', 'group']
    list_filter = ['group']
