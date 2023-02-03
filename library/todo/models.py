from django.db import models
from django.contrib.auth.models import User
from userpro.models import UserProf

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=255, blank=False, unique=True, verbose_name="Название проекта")
    repolink = models.URLField(max_length=200, verbose_name="Ссылка на репозиторий")
    user = models.ForeignKey(User, models.PROTECT, verbose_name="Пользователь")

class Todo(models.Model):
    STATES = (('todo', 'To Do'), ('in progress', 'In Progress'), ('done', 'Done'))
    project = models.ForeignKey(Project, models.PROTECT, verbose_name="Проект")
    text = models.TextField(verbose_name="Текст задачи")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")
    status = models.CharField(max_length=11, choices=STATES, default='todo', verbose_name="Статус")
