from django.contrib.auth.models import User
from django.views import generic
from .api import serializers


# ---------- Routes -----------------------------
class HomeView(generic.TemplateView):
    template_name = 'writerspad/home.html'


class LoginView(generic.TemplateView):
    template_name = 'writerspad/login.html'


class ManagementView(generic.TemplateView):
    template_name = 'writerspad/manage.html'


class AdminView(generic.TemplateView):
    template_name = 'writerspad/admin.html'
