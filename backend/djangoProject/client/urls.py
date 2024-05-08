from django.urls import path, include

from client.view import login, personality, signin, follow
from client.view import appointment, accountManage, clinic
from client.view import appointmentDisplay, message, comment
from client.view import star

from client.view.location import city, county

urlpatterns = [
    path("login/psw/", login.login_psw),
    path("login/email/", login.login_email),
    path("login/get/", login.get_code),
    path("signin/get/", signin.get_code),
    path("signin/signin/", signin.sign_in),
    path("personality/name/", personality.get_name),
    path("personality/initial/", personality.initial),
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
    path("appointment/get/", appointment.get),
    path("appointment/initial/", appointment.initial),
    path("appointment/display/initial1/", appointmentDisplay.initial1),
    path("appointment/display/initial2/", appointmentDisplay.initial2),
    path("appointment/make1/", appointmentDisplay.makeAppointment1),
    path("appointment/make2/", appointmentDisplay.makeAppointment2),
    path("fclinic/initial/", clinic.initial),
    path("fclinic/getdoctor/", clinic.get_doctor),
    path("message/get/", message.get),
    path("message/read/", message.read),
    path("name/get/", accountManage.get),
    path("comment/appointment/", comment.getappointment),
    path("comment/submmit/", comment.submmit),
    path("comment/delete/", comment.delete),
    path("comment/get/", comment.getcomment),
    path("comment/information/", comment.getinformation),
    path("comment/clinic/", comment.clinic),
    path("comment/makelike/", comment.makelike),
    path("comment/dislike/", comment.dislike),
    path("comment/makestar/", comment.makestar),
    path("comment/disstar/", comment.disstar),
    path("comment/initial/", comment.initial),
    path("comment/modify/information/", comment.modifyInformation),
    path("comment/modify/submmit/", comment.modifySubmmit),
    path("follow/dislike/", follow.dislike),
    path("follow/like/", follow.like),
    path("follow/add/", follow.add),
    path("follow/delete/", follow.delete),
    path("star/get/", star.get),
    path("login/", include(('client.login.urls', 'client'), namespace='login')),
    path("administer/", include(('client.administer.urls', 'client'), namespace='administer')),
    path("doctor/", include(('client.doctor.urls', 'client'), namespace='doctor')),
    path("clinic/", include(('client.clinic.urls', 'client'), namespace='clinic'))
]