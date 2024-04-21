from django.contrib import admin

from .models import AccountTable, CityTable, CityCountyTable, CodeTable
from .models import ClinicTable

# Register your models here.

@admin.register(AccountTable)
class AccountTableAdmin(admin.ModelAdmin):
    list_display = ['email', 'nickname', 'register', 'power']

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