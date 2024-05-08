from django.urls import path

from . import clinic

urlpatterns = [
    path('', clinic.index, name='index')
]