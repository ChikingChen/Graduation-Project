from django.urls import path

from . import doctor

urlpatterns = [
    path('', doctor.index, name='index'),
    path('index/information/', doctor.information, name='info'),
    path('logout/', doctor.logout, name='logout'),
    path('person/', doctor.person, name='person'),
    path('welcome/', doctor.welcome, name='welcome'),
    path('application/', doctor.application, name='application')
]