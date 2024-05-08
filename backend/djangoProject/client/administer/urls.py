from django.urls import path

from . import administer

urlpatterns = [
    path('', administer.index, name='index')
]