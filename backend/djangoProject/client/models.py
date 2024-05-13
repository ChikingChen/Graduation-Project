from django.db import models

from django.db.models import *


class AccountTable(models.Model):
    email = CharField(max_length=30, primary_key=True, verbose_name='邮件')
    name = CharField(max_length=30, verbose_name='姓名', default='张三')
    nickname = CharField(max_length=30, null=False, verbose_name='昵称')
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


class DoctorTable(models.Model):
    email = ForeignKey(AccountTable, on_delete=models.CASCADE, verbose_name='账户', primary_key=True)
    name = CharField(max_length=10, verbose_name='姓名')
    birthday = DateField(verbose_name='生日')
    edubackground = IntegerField(verbose_name='学历')
    # 0 高中及以下  1 大专  2 本科  3 硕士  4 博士
    title = IntegerField(verbose_name='职称', default=2)
    # 0 医士  1 医师  2 主治医师  3 副主任医师  4 主任医师
    introduction = CharField(max_length=300, verbose_name='介绍')

    class Meta:
        verbose_name='医生'
        verbose_name_plural='医生'


class ServiceTable(models.Model):
    service = CharField(max_length=30, verbose_name='服务', primary_key=True)

    class Meta:
        verbose_name='服务'
        verbose_name_plural='服务'


class ClinicServiceTable(models.Model):
    clinic = ForeignKey(ClinicTable, on_delete=models.CASCADE, verbose_name='诊所')
    service = ForeignKey(ServiceTable, on_delete=models.CASCADE, verbose_name='服务')

    class Meta:
        constraints = [
            UniqueConstraint(fields=['clinic', 'service'], name='uniqueClinicService')
        ]
        verbose_name='诊所服务'
        verbose_name_plural='诊所服务'


class DoctorServiceTable(models.Model):
    doctor = ForeignKey(DoctorTable, on_delete=models.CASCADE, verbose_name='医生')
    service = ForeignKey(ServiceTable, on_delete=models.CASCADE, verbose_name='服务')

    class Meta:
        constraints = [
            UniqueConstraint(fields=['doctor', 'service'], name='uniqueDoctorService')
        ]
        verbose_name='医生服务'
        verbose_name_plural='医生服务'


class AppointmentTable(models.Model):
    clinic = ForeignKey(ClinicTable, on_delete=models.CASCADE, verbose_name='诊所')
    doctor = ForeignKey(DoctorTable, on_delete=models.CASCADE, verbose_name='医生')
    date = DateField(verbose_name='日期')
    starttime = TimeField(verbose_name='开始时间')
    endtime = TimeField(verbose_name='结束时间')
    stage = IntegerField(default=0, verbose_name='阶段')
    # 0 尚未被预约  1 预约但未就诊  2 就诊但未评价  3 已经评价
    patient = ForeignKey(AccountTable, verbose_name='病人', on_delete=models.SET_DEFAULT, default='chiking0718@163.com')
    service = ForeignKey(ServiceTable, verbose_name='服务', on_delete=models.CASCADE, default='镶牙')

    class Meta:
        constraints = [
            UniqueConstraint(fields=['clinic', 'doctor', 'date', 'starttime', 'endtime'], name='uniqueClinicDoctor')
        ]
        verbose_name='预约'
        verbose_name_plural='预约'


class MessageTable(models.Model):
    id = AutoField(primary_key=True)
    sender = ForeignKey(AccountTable, on_delete=models.CASCADE, verbose_name='发送者', related_name='send')
    receiver = ForeignKey(AccountTable, on_delete=models.CASCADE, verbose_name='接收者', related_name='receive')
    time = DateTimeField(auto_now_add=True, verbose_name='发送时间')
    content = CharField(max_length=300, verbose_name='内容')
    title = CharField(max_length=30, verbose_name='标题', default='')
    type = IntegerField(verbose_name='类型', default=0)
    # 0 预约成功  1 被预约  2 邀请评价
    read = BooleanField(verbose_name='已读', default=0)

    class Meta:
        verbose_name='信息'
        verbose_name_plural='信息'


class CommentTable(models.Model):
    id = AutoField(primary_key=True)
    appointment = ForeignKey(AppointmentTable, on_delete=models.CASCADE, verbose_name='预约')
    mark = IntegerField(verbose_name='分数')
    time = DateTimeField(auto_now_add=True, verbose_name='评价时间')
    committer = ForeignKey(AccountTable, on_delete=models.CASCADE, verbose_name='提交者', default='chiking0718@163.com')
    content = CharField(max_length=300, default='', verbose_name='内容')

    class Meta:
        verbose_name='评价'
        verbose_name_plural='评价'


class LikeTable(models.Model):
    comment = ForeignKey(CommentTable, on_delete=models.CASCADE, verbose_name='评价')
    account = ForeignKey(AccountTable, on_delete=models.CASCADE, verbose_name='点赞人')
    time = DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name='点赞'
        verbose_name_plural='点赞'


class StarTable(models.Model):
    comment = ForeignKey(CommentTable, on_delete=models.CASCADE, verbose_name='评价')
    account = ForeignKey(AccountTable, on_delete=models.CASCADE, verbose_name='收藏人')
    time = DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name='收藏'
        verbose_name_plural='收藏'


class FollowTable(models.Model):
    comment = ForeignKey(CommentTable, on_delete=models.CASCADE, verbose_name='评价')
    account = ForeignKey(AccountTable, on_delete=models.CASCADE, verbose_name='评价人')
    content = CharField(max_length=140)
    time = DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name='回复'
        verbose_name_plural='回复'

class FollowLikeTable(models.Model):
    follow = ForeignKey(FollowTable, on_delete=models.CASCADE, verbose_name='回复')
    account = ForeignKey(AccountTable, on_delete=models.CASCADE, verbose_name='评价人')
    time = DateTimeField(auto_now_add=True, verbose_name='时间')

    class Meta:
        verbose_name = '回复点赞'
        verbose_name_plural = '回复点赞'

class BackstageAccountTable(models.Model):
    email = EmailField(primary_key=True, verbose_name='邮件')
    nickname = CharField(max_length=30, verbose_name='昵称')
    power = IntegerField(verbose_name='权限')
    # 1 管理员  2 医生  3 诊所
    password = CharField(max_length=30, verbose_name='密码')

    class Meta:
        verbose_name='后台账户'
        verbose_name_plural='后台账户'

class BackstageCookieTable(models.Model):
    account = ForeignKey(BackstageAccountTable, on_delete=models.CASCADE, verbose_name='账号')
    cookie = CharField(max_length=6, verbose_name='cookie')

    class Meta:
        verbose_name='后台Cookie'
        verbose_name_plural='后台Cookie'

class BackstageApplicationTable(models.Model):
    # 医生向诊所发送申请
    send = ForeignKey(BackstageAccountTable, on_delete=models.CASCADE, verbose_name='发送者')
    receive = ForeignKey(ClinicTable, on_delete=models.CASCADE, verbose_name='诊所')
    time = DateTimeField(auto_now_add=True, verbose_name='发送时间')

    class Meta:
        verbose_name='医生申请'
        verbose_name_plural='医生申请'

class ClinicDoctorTable(models.Model):
    clinic = ForeignKey(ClinicTable, on_delete=models.CASCADE, verbose_name='诊所')
    doctor = ForeignKey(DoctorTable, on_delete=models.CASCADE, verbose_name='医生')

    class Meta:
        verbose_name='诊所医生'
        verbose_name_plural='诊所医生'