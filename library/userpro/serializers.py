from rest_framework.serializers import ModelSerializer
from .models import UserProf


class UserSerializerWithFullName(ModelSerializer):
    class Meta:
        model = UserProf
        fields = ('username', 'email', 'first_name', 'last_name')

class UserSerializerWithFullNameStatus(ModelSerializer):
    class Meta:
        model = UserProf
        fields = ('username', 'email', 'first_name', 'last_name', 'is_superuser', 'is_staff')