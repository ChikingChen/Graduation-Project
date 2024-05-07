from django.urls import path

from . import login, doctor, clinic, administer


urlpatterns = [
    path('login/', login.loginHttp),
    path('login/click/', login.login),
    path('doctor/index/', doctor.index, name='doctorIndex'),
    path('clinic/index/', clinic.index, name='clinicIndex'),
    path('administer/index/', administer.index, name='administerIndex'),
]