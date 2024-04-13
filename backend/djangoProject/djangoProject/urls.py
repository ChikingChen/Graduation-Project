"""
URL configuration for djangoProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import login, signin, personality, location

urlpatterns = [
    path("admin/", admin.site.urls),
    path("login/psw/", login.login_psw),
    path("login/email/", login.login_email),
    path("login/get/", login.get_code),
    path("signin/get/", signin.get_code),
    path("signin/signin/", signin.sign_in),
    path("personality/name/", personality.get_name),
    path("location/get/", location.get_location),
    path("location/delete/", location.delete_location),
    path("location/add/", location.add_location)
]