from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .views import UserModelViewSet
from .models import User


# Create your tests here.
class TestUserViewSet(TestCase):
    def test_edit_guest(self):
        user = User.objects.create(username='test1', firstname='test', lastname='1', email='test@mailtest.com')
        client = APIClient()
        response = client.put(f'/api/users/{user.user_id}/', {'username': 'test1',
                                                              'firstname': 'test', 'lastname': '1',
                                                              'email': 'test@mailtest.com'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
