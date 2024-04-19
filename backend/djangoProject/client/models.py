from django.db import models

from django.db.models import CharField, DateField, IntegerField
from django.db.models import DateTimeField
from django.db.models import UniqueConstraint, ForeignKey

# Create your models here.

class AccountTable(models.Model):
    email = CharField(max_length=30, primary_key=True, verbose_name='邮件')
    nickname = CharField(max_length=10, null=False, verbose_name='昵称')
    password = CharField(max_length=100, verbose_name='密码')
    register = DateField(auto_now_add=True, verbose_name='注册时间')
    power = IntegerField(verbose_name='权限等级')


class CityTable(models.Model):
    city = CharField(max_length=5, verbose_name='城市', primary_key=True)


class CityCountyTable(models.Model):
    city = ForeignKey(CityTable, on_delete=models.CASCADE, verbose_name='城市')
    county = CharField(max_length=5, verbose_name='县')
    class Meta:
        constraints = [
            UniqueConstraint(fields=['city', 'county'], name='uniqueCityCounty')
        ]


class CodeTable(models.Model):
    email = CharField(max_length=30, primary_key=True, verbose_name='用户邮箱')
    code = CharField(max_length=100, verbose_name='验证码')
    time = DateTimeField(verbose_name='输入时间', auto_now_add=True)

