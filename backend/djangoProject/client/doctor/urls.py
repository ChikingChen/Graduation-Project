from django.urls import path

from . import doctor

urlpatterns = [
    path('', doctor.index, name='index'),
    path('logout/', doctor.logout, name='logout'),
    path('person/', doctor.person, name='person')
]