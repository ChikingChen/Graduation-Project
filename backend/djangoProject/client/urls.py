from django.contrib import admin
from django.urls import path

from client.view import login, personality, signin, appointment, accountManage, clinic
from client.view.location import city, county

urlpatterns = [
    path("login/psw/", login.login_psw),
    path("login/email/", login.login_email),
    path("login/get/", login.get_code),
    path("signin/get/", signin.get_code),
    path("signin/signin/", signin.sign_in),
    path("personality/name/", personality.get_name),
    path("location/city/get/", city.get),
    path("location/city/delete/", city.delete),
    path("location/city/add/", city.add),
    path("location/city/modify/", city.modify),
    path("location/county/get/", county.get),
    path("location/county/delete/", county.delete),
    path("location/county/add/", county.add),
    path("location/county/modify/", county.modify),
    path("account/get/", accountManage.get_account),
    path("account/information/", accountManage.get_information),
    path("account/modify/nickname/", accountManage.modify_nickname),
    path("account/modify/psword/", accountManage.modify_psword),
    path("account/modify/power/", accountManage.modify_power),
    path("appointment/clinic/get/", appointment.get_clinic),
    path("appointment/initial/", appointment.initial),
    path("clinic/initial/", clinic.initial)
]