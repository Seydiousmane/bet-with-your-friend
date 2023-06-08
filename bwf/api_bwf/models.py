from django.db import models, transaction

# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=50, null=False, unique=False)
    location = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=250, null=False, unique=False)
    active = models.BooleanField(default=True)

    class Meta:
        unique_together=(('name', 'location'))

    def __str__(self):
        return self.name
    
    @transaction.atomic
    def disable(self):
        if self.active is False:
            return
        self.active = False
        self.save()
        self.events.update(active=False)



class Event(models.Model):
    name = models.CharField(max_length=25, default='Match')
    team1 = models.CharField(max_length=32, blank=False)
    team2 = models.CharField(max_length=32, blank=False)
    time = models.DateTimeField(null=False, blank=False)
    score1 = models.IntegerField(null=True,  blank=True)
    score2 = models.IntegerField(null=True, blank=True)
    group = models.ForeignKey(Group, related_name='events', on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name