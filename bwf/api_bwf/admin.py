from django.contrib import admin
from .models import Group, Event

# Register your models here.
admin.site.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom', 'location', 'description']
    list_filter = ['nom']


admin.site.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['team1', 'team2', 'time', 'score1', 'score2', 'group']
    list_filter = ['group']
