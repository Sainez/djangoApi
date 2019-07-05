from django.db import models
from rest_framework.reverse import reverse as api_reverse


class Manager(models.Model):
    username = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    def get_api_url(self, request=None):
        return api_reverse("writerspad-api:manager", kwargs={'id': self.id}, request=request)


class Writer(models.Model):
    username = models.CharField(unique=True, max_length=30)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    def get_api_url(self, request=None):
        return api_reverse("writerspad-api:writer", kwargs={'id': self.id}, request=request)


class Article(models.Model):
    author = models.ForeignKey(Writer, to_field='username', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    body = models.TextField(max_length=100000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def get_api_url(self, request=None):
        return api_reverse("writerspad-api:article", kwargs={'id': self.id}, request=request)
