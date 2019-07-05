from django.contrib.auth.models import User
from ..models import Manager, Writer, Article
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.admin import Token
from django.db.models import Q
from rest_framework import generics, mixins
from . import serializers


# ====== Admin Section ===================================================================
#   Register First User as Admin
class AdminRegView(generics.CreateAPIView):
    serializer_class = serializers.AdminSerializer

    # Allow User to Create
    def perform_create(self, serializer):
        serializer.save(is_superuser=False, is_staff=True, is_active=True)

    # Create

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


#   Create List View ======
class AdminsClsView(mixins.CreateModelMixin, generics.ListAPIView):
    lookup_field = 'id'
    serializer_class = serializers.AdminSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        # List
        qs = User.objects.all()
        # Search
        search = self.request.GET.get('s')
        if search is not None:
            qs = qs.filter(Q(username__icontains=search) | Q(email__icontains=search)).distinct()
        return qs

    # Allow User to Create
    def perform_create(self, serializer):
        serializer.save(is_superuser=False, is_staff=True, is_active=True)

    # Create
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# Read Update Delete
class AdminRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'  # slug, pk
    queryset = User.objects.all()
    serializer_class = serializers.AdminSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


# ========== Managers Section ================================================================================

#   Login manager
class ManagersLogin(APIView):
    def get_object(self, username, password):
        try:
            return Manager.objects.get(username=username, password=password)
        except Manager.DoesNotExist:
            raise Http404

    #   get by username and Password
    def get(self, request, username, password, format=None):
        manager = self.get_object(username, password)

        for user in User.objects.all():
            gettoken = Token.objects.get_or_create(user=user)
            break
        token2string = str(gettoken[0])
        data = {'token': token2string}
        return Response(data)


#   Create List View ======
class ManagersClsView(mixins.CreateModelMixin, generics.ListAPIView):
    lookup_field = 'id'
    serializer_class = serializers.ManagerSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        # List
        qs = Manager.objects.all()
        # Search
        search = self.request.GET.get('s')
        if search is not None:
            qs = qs.filter(Q(username__icontains=search) | Q(email__icontains=search)).distinct()
        return qs

    # Allow Manager to Create
    def perform_create(self, serializer):
        serializer.save()

    # Create
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# Read Update Delete
class ManagerRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'  # slug, pk
    queryset = Manager.objects.all()
    serializer_class = serializers.ManagerSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


# ========== Writers Section ====================================================================================

#   Login writer
class WritersLogin(APIView):
    authorid = 0
    GLOBAL_Entry = None

    def get_object(self, username, password):
        try:
            return Writer.objects.get(username=username, password=password)
        except Writer.DoesNotExist:
            raise Http404

    #   get by username and Password
    def get(self, request, username, password, format=None):
        writer = self.get_object(username, password)
        global authorid, GLOBAL_Entry
        authorid = writer.id
        for user in User.objects.all():
            gettoken = Token.objects.get_or_create(user=user)
            break
        token2string = str(gettoken[0])
        data = {'token': token2string}
        return Response(data)


#   Create List View ======
class WritersClsView(mixins.CreateModelMixin, generics.ListAPIView):
    lookup_field = 'id'
    serializer_class = serializers.WriterSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        # List
        qs = Writer.objects.all()
        # Search
        search = self.request.GET.get('s')
        if search is not None:
            qs = qs.filter(Q(username__icontains=search) | Q(email__icontains=search)).distinct()
        return qs

    # Allow Writer to Create
    def perform_create(self, serializer):
        serializer.save()

    # Create
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# Read Update Delete
class WriterRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'  # slug, pk
    queryset = Writer.objects.all()
    serializer_class = serializers.WriterSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


# ========== Articles Section ====================================================================================

#   Create List View ======
class ArticlesClsView(mixins.CreateModelMixin, generics.ListAPIView, WritersLogin):
    lookup_field = 'id'
    serializer_class = serializers.ArticleSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        # List
        qs = Article.objects.all()
        # Search
        search = self.request.GET.get('s')
        if search is not None:
            qs = qs.filter(Q(title__icontains=search) | Q(body__icontains=search)).distinct()
        return qs

    # Allow Article to Create
    def perform_create(self, serializer):
        global authorid
        writer = Writer.objects.get(pk=authorid)
        serializer.save(author=writer)

    # Create
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# Read Update Delete
class ArticleRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'  # slug, pk
    queryset = Article.objects.all()
    serializer_class = serializers.ArticleSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
