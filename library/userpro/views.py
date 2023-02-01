from rest_framework import generics
from .models import UserProf
from .serializers import UserSerializerWithFullName, UserSerializerWithFullNameStatus
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


class UserListAPIView(generics.ListAPIView):
    queryset = UserProf.objects.all()
    serializer_class = UserSerializerWithFullName

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserSerializerWithFullName
        return UserSerializerWithFullNameStatus


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = UserProf.objects.all()
    serializer_class = UserSerializerWithFullName
