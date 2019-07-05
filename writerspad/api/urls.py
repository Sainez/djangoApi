from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import ObtainAuthToken
from django.urls import path, include
from . import views

urlpatterns = [
    path('adminreg/', views.AdminRegView.as_view(), name='adminreg'),
    path('admins/', views.AdminsClsView.as_view(), name='admins'),
    path('admin/<id>/', views.AdminRudView.as_view(), name='admin'),

    path('managerlogin/<username>/<password>/', views.ManagersLogin.as_view(), name='managerlogin'),
    path('managers/', views.ManagersClsView.as_view(), name='managers'),
    path('manager/<id>/', views.ManagerRudView.as_view(), name='manager'),

    path('writerlogin/<username>/<password>/', views.WritersLogin.as_view(), name='writerlogin'),
    path('writers/', views.WritersClsView.as_view(), name='writers'),
    path('writer/<id>/', views.WriterRudView.as_view(), name='writer'),

    path('articles/', views.ArticlesClsView.as_view(), name='articles'),
    path('article/<id>/', views.ArticleRudView.as_view(), name='article'),

    path('auth/', ObtainAuthToken.as_view(), name='auth'),
    path('rest-auth/', include('rest_auth.urls'), name='rest-auth'),
    path('rest-auth/registration/', include('rest_auth.registration.urls'), name='rest-auth-reg')
]

urlpatterns = format_suffix_patterns(urlpatterns)
