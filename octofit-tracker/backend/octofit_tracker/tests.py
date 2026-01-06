from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='TestTeam')
        self.assertEqual(team.name, 'TestTeam')

    def test_create_user(self):
        user = User.objects.create_user(username='testuser', email='test@example.com')
        self.assertEqual(user.email, 'test@example.com')

    def test_create_activity(self):
        activity = Activity.objects.create(name='Run', user_email='test@example.com', team='TestTeam')
        self.assertEqual(activity.name, 'Run')

    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(team='TestTeam', points=100)
        self.assertEqual(lb.points, 100)

    def test_create_workout(self):
        workout = Workout.objects.create(name='Pushups', description='Do 50 pushups')
        self.assertEqual(workout.name, 'Pushups')
