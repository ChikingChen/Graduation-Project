import random

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from client.view.encode import encrypt_message, decrypt_message

import smtplib
from email.mime.text import MIMEText

from ..models import AccountTable, CodeTable

def send_email(des, code):
    mail_host = 'smtp.163.com' # 邮箱服务器
    mail_user = 'chiking0718@163.com' # 发件人用户名
    mail_pass = 'ZOMQKNOAMELTNLAC' # 邮箱授权口令
    receivers = [des] # 接受邮箱

    message = MIMEText(code, 'plain', 'utf-8') # 发送邮件的内容、类型
    message['From'] = mail_user
    message['To'] = des
    subject = '牙科诊所平台 验证码'
    message['Subject'] = subject

    smtp = smtplib.SMTP(mail_host, port=25)
    smtp.login(mail_user, mail_pass)
    smtp.sendmail(mail_user, receivers, message.as_string())

    smtp.quit()
    return

@csrf_exempt
def login_psw(request): # 密码登录
    if request.method == 'GET':
        try:
            # 加载
            email = request.GET.get('email')
            psw = request.GET.get('psw')
            # 查询邮箱号是否存在
            count = AccountTable.objects.all().filter(email=email).count()
            if count == 0: return HttpResponse("EMAIL ERROR.", status=200)
            # 查询密码是否与邮箱号对应
            password = AccountTable.objects.all().filter(email=email).values('password')[0]['password']
            if password == psw: return HttpResponse("LOGIN SUCCESS.", status=200)
            else: return HttpResponse("PSW ERROR.", status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def login_email(request):
    if request.method == 'GET':
        try:
            # 加载内容
            email = request.GET.get('email')
            code = request.GET.get('code')
            # 查询邮箱号是否存在
            count = AccountTable.objects.all().filter(email=email).count()
            if count == 0: return HttpResponse("EMAIL ERROR.", status=200)
            # 查询邮箱号是否有对应的验证码
            data = CodeTable.objects.filter(email=email)
            if data.count() == 0: return HttpResponse("NO CODE.", status=200)
            data = bytes.fromhex(data.values('code')[0]['code'])
            data = decrypt_message(data)
            if data == code: return HttpResponse("LOGIN SUCCESS.", status=200)
            else: return HttpResponse("CODE ERROR.", status=200)
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def get_code(request):
    if request.method == 'GET':
        try:
            email = request.GET.get('email')
            count = AccountTable.objects.all().count()
            if count == 0: return HttpResponse("EMAIL ERROR.", status=200)
            count = CodeTable.objects.all().count()
            if count != 0: CodeTable.objects.all().filter(email=email).delete()
            code = random.randint(0, 9999)
            code = str(code).zfill(4)
            code = code[::-1]
            send_email(email, code)
            code = encrypt_message(code).hex()
            CodeTable(email=email, code=code).save()
            return HttpResponse("GET SUCCESS.", status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)
