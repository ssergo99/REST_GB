from django.contrib import admin

# Register your models here.
from app import models as app_models


@admin.register(app_models.User)
class UsersAdmin(admin.ModelAdmin):
    pass
