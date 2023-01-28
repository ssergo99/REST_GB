from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .views import TodoViewSet, ProjectViewSet
from .models import Todo, Project
from django.contrib.auth.models import User


# Create your tests here.
class TestProjectViewSet(TestCase):
    def test_update_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'title': 'test1',
                                                  'repolink': 'test', 'user': '1'}, format='json')
        view = ProjectViewSet.as_view({'post': 'update'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestTodoViewSet(APITestCase):
    def test_get_list(self):
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestDetailProjectViewSet(APITestCase):
    def test_get_detail(self):
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        project = mixer.blend(Project, title='Тестовый проект')
        response = self.client.get(f'/api/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project['title'], 'Тестовый проект')
