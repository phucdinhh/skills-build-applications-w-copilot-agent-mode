from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    name = models.CharField(max_length=100)
    user_email = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    class Meta:
        app_label = 'octofit_tracker'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete all data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com'),
            User.objects.create_user(username='captainamerica', email='cap@marvel.com'),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com'),
            User.objects.create_user(username='batman', email='batman@dc.com'),
            User.objects.create_user(username='superman', email='superman@dc.com'),
            User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com'),
        ]

        # Create activities
        Activity.objects.bulk_create([
            Activity(name='Run', user_email='ironman@marvel.com', team='Marvel'),
            Activity(name='Swim', user_email='cap@marvel.com', team='Marvel'),
            Activity(name='Bike', user_email='spiderman@marvel.com', team='Marvel'),
            Activity(name='Run', user_email='batman@dc.com', team='DC'),
            Activity(name='Swim', user_email='superman@dc.com', team='DC'),
            Activity(name='Bike', user_email='wonderwoman@dc.com', team='DC'),
        ])

        # Create leaderboard
        Leaderboard.objects.bulk_create([
            Leaderboard(team='Marvel', points=300),
            Leaderboard(team='DC', points=250),
        ])

        # Create workouts
        Workout.objects.bulk_create([
            Workout(name='Pushups', description='Do 50 pushups'),
            Workout(name='Squats', description='Do 50 squats'),
            Workout(name='Plank', description='Hold plank for 2 minutes'),
        ])

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
