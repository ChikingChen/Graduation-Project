from django.db import models

from django.db.models import CharField, DateField, IntegerField
from django.db.models import DateTimeField, AutoField
from django.db.models import UniqueConstraint, ForeignKey


class AccountTable(models.Model):
    email = CharField(max_length=30, primary_key=True, verbose_name='邮件')
    nickname = CharField(max_length=10, null=False, verbose_name='昵称')
    password = CharField(max_length=300, verbose_name='密码')
    register = DateField(auto_now_add=True, verbose_name='注册时间')
    power = IntegerField(verbose_name='权限等级')

    class Meta:
        verbose_name='账号'
        verbose_name_plural='账号'


class CityTable(models.Model):
    city = CharField(max_length=5, verbose_name='城市', primary_key=True)

    class Meta:
        verbose_name='城市'
        verbose_name_plural='城市'

class CityCountyTable(models.Model):
    city = ForeignKey(CityTable, on_delete=models.CASCADE, verbose_name='城市')
    county = CharField(max_length=5, verbose_name='县')
    class Meta:
        constraints = [
            UniqueConstraint(fields=['city', 'county'], name='uniqueCityCounty')
        ]
        verbose_name='县'
        verbose_name_plural='县'


class CodeTable(models.Model):
    email = CharField(max_length=30, primary_key=True, verbose_name='用户邮箱')
    code = CharField(max_length=100, verbose_name='验证码')
    time = DateTimeField(verbose_name='输入时间', auto_now_add=True)

    class Meta:
        verbose_name='验证码'
        verbose_name_plural='验证码'


class ClinicTable(models.Model):
    id = AutoField(primary_key=True)
    city = ForeignKey(CityTable, on_delete=models.CASCADE, verbose_name='城市')
    county = CharField(max_length=10, verbose_name='县')
    location = CharField(max_length=60, verbose_name='地点')
    time = CharField(max_length=60, verbose_name='营业时间')
    name = CharField(max_length=30, verbose_name='诊所名称')

    class Meta:
        verbose_name='诊所'
        verbose_name_plural='诊所'
