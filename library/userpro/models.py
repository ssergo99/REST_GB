from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class UserProf(User):
    class Meta:
        proxy = True
        ordering = ('date_joined', )