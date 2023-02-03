import graphene
from graphene_django import DjangoObjectType
from todo.models import Project, Todo
from userpro.models import UserProf
from django.contrib.auth.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    all_todos = graphene.List(TodoType)

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return User.objects.all()

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
