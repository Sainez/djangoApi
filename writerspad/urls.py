from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.HomeView.as_view(), name='home'),
    path('', views.LoginView.as_view(), name='login'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('management/', views.ManagementView.as_view(), name='management'),
    path('administration/', views.AdminView.as_view(), name='admin'),
]
