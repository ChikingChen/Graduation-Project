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

    smtp = smtplib.SMTP(mail_host, port=25) #
    smtp.login(mail_user, mail_pass)
    smtp.sendmail(mail_user, receivers, message.as_string())

    smtp.quit()
    return

@csrf_exempt
def get_code(request):
    if request.method == 'GET':
        try:
            email = request.GET.get('email')
            result = AccountTable.objects.filter(email=email).values()
            if result.exists(): return HttpResponse("EMAIL EXISTS.", status=200)
            result = CodeTable.objects.filter(email=email)
            if result.exists(): result.delete()
            code = random.randint(0, 9999)
            code = str(code).zfill(4)
            code = code[::-1]
            send_email(email, code)
            code = encrypt_message(code).hex()
            # 插入数据库
            CodeTable(email=email, code=code).save()
            return HttpResponse("GET SUCCESS.", status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def sign_in(request):
    if request.method == 'GET':
        try:
            email = request.GET.get('email')
            code = request.GET.get('code')
            nickname = request.GET.get('nickname')
            password = encrypt_message(request.GET.get('password')).hex()
            # 检查手机号是否存在
            result = AccountTable.objects.all().filter(email=email)
            if result.count() != 0: return HttpResponse("EMAIL EXISTS.", status=200)
            result = CodeTable.objects.all().filter(email=email)
            # 查询手机号是否有对应的验证码
            if result.exists() == 0: return HttpResponse("NO CODE.", status=200)
            data = bytes.fromhex(list(result.values())[0]['code'])
            data = decrypt_message(data)
            if data == code: AccountTable(email=email, nickname=nickname, password=password, power=0).save()
            return HttpResponse("SIGNIN SUCCESS.", status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)