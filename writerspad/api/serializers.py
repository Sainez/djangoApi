from django.contrib.auth.models import User
from ..models import Manager, Writer, Article
from rest_framework import serializers


# ------ Admin -------------------------------------------
class AdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'date_joined',
                  'last_login', 'is_superuser', 'is_staff', 'is_active')
        extra_kwargs = {'password': {'write_only': True, 'required': True},
                        'is_superuser': {'read_only': True},
                        'is_staff': {'read_only': True},
                        'is_active': {'read_only': True},
                        'date_joined': {'read_only': True, 'format': '%d-%B-%Y %I:%M:%p'},
                        'last_login': {'read_only': True, 'format': '%d-%B-%Y %I:%M:%p'},
                        }

        # allow login to admin
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# ------ Manager -------------------------------------------
class ManagerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Manager
        fields = ('id', 'username', 'email', 'password', 'created_at', 'updated_at')
        extra_kwargs = {'password': {'write_only': True, 'required': True},
                        'created_at': {'format': '%d-%B-%Y %I:%M:%p'},
                        'updated_at': {'format': '%d-%B-%Y %I:%M:%p'}}


# ------ Writer -------------------------------------------
class WriterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Writer
        fields = ('id', 'username', 'email', 'password', 'created_at', 'updated_at')
        extra_kwargs = {'password': {'write_only': True, 'required': True},
                        'created_at': {'format': '%d-%B-%Y %I:%M:%p'},
                        'updated_at': {'format': '%d-%B-%Y %I:%M:%p'}}


# ------ Article -------------------------------------------
class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ('id', 'title', 'body', 'author', 'created_at', 'updated_at')
        extra_kwargs = {'author': {'read_only': True},
                        'created_at': {'format': '%d-%B-%Y %I:%M:%p'},
                        'updated_at': {'format': '%d-%B-%Y %I:%M:%p'}}
