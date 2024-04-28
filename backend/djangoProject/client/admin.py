from django.contrib import admin

from .models import *

# Register your models here.

@admin.register(AccountTable)
class AccountTableAdmin(admin.ModelAdmin):
    list_display = ['email', 'nickname', 'name', 'register', 'power']

@admin.register(CityTable)
class CityTableAdmin(admin.ModelAdmin):
    list_display = ['city']

@admin.register(CityCountyTable)
class CityCountyTableAdmin(admin.ModelAdmin):
    list_display = ['city', 'county']

@admin.register(CodeTable)
class CodeTableAdmin(admin.ModelAdmin):
    list_display = ['email', 'time']

@admin.register(ClinicTable)
class ClinicTableAdmin(admin.ModelAdmin):
    list_display = ['id', 'city', 'county', 'location', 'time', 'name']

@admin.register(DoctorTable)
class DoctorTableAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'birthday', 'edubackground', 'introduction']

@admin.register(AppointmentTable)
class AppointmentTableAdmin(admin.ModelAdmin):
    list_display = ['clinic', 'doctor', 'date', 'starttime', 'endtime', 'stage', 'patient', 'service']

@admin.register(ClinicServiceTable)
class ClinicServiceTableAdmin(admin.ModelAdmin):
    list_display = ['clinic', 'service']

@admin.register(ServiceTable)
class ServiceTableAdmin(admin.ModelAdmin):
    list_display = ['service']

@admin.register(DoctorServiceTable)
class DoctorServiceTableAdmin(admin.ModelAdmin):
    list_display = ['doctor', 'service']

@admin.register(MessageTable)
class MessageTableAdmin(admin.ModelAdmin):
    list_display = ['id', 'sender', 'receiver', 'time', 'content', 'read']

@admin.register(CommentTable)
class CommentTableAdmin(admin.ModelAdmin):
    list_display = ['id', 'appointment', 'mark', 'time', "committer"]
