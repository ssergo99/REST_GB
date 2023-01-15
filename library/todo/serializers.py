from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import Project, Todo

class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'