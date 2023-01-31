from django.contrib import admin

# Register your models here.
from userpro import models as usr_models


@admin.register(usr_models.UserProf)
class UsersProfAdmin(admin.ModelAdmin):
    pass
