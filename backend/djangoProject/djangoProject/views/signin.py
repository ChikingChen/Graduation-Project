import random

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

from datetime import datetime
from .encode import encrypt_message, decrypt_message

import smtplib
from email.mime.text import MIMEText

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
            # 加载内容
            email = request.GET.get('email')
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            # 检查手机号是否存在
            sql1 = "select count(*) from accounttable where email = '{}';".format(email)
            cursor.execute(sql1)
            data = cursor.fetchall()
            if data[0][0] != 0: return HttpResponse("EMAIL EXISTS.", status=200)
            # 手机号是否已经存在验证码
            sql2 = "select count(*) from codetable where email = '{}';".format(email)
            cursor.execute(sql2)
            data = cursor.fetchall()
            if data[0][0] != 0:
                sqlt = "delete from codetable where email = '{}';".format(email)
                cursor.execute(sqlt)
                db.commit()
            # 获取验证码
            code = random.randint(0, 9999)
            code = str(code).zfill(4)
            code = code[::-1]
            send_email(email, code)
            code = encrypt_message(code).hex()
            # 获取时间
            now = datetime.now()
            now = now.strftime("%Y-%m-%d %H:%M:%S")
            # 插入数据库
            sql3 = "insert into codetable value ('{}', '{}', '{}');".format(email, code, now)
            cursor.execute(sql3)
            db.commit()
            return HttpResponse("GET SUCCESS.", status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def sign_in(request):
    if request.method == 'GET':
        try:
            # 加载内容
            email = request.GET.get('email')
            code = request.GET.get('code')
            nickname = request.GET.get('nickname')
            password = encrypt_message(request.GET.get('password')).hex()
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            # 检查手机号是否存在
            sql1 = "select count(*) from accounttable where email = '{}';".format(email)
            cursor.execute(sql1)
            data = cursor.fetchall()
            if data[0][0] != 0: return HttpResponse("EMAIL EXISTS.", status=200)
            # 查询手机号是否有对应的验证码
            sql2 = "select vericode from codetable where email = '{}';".format(email)
            cursor.execute(sql2)
            data = cursor.fetchall()
            if data == (): return HttpResponse("NO CODE.", status=200)
            data = bytes.fromhex(data[0][0])
            data = decrypt_message(data)
            if data == code:
                date = datetime.now()
                sql3 = "insert into accounttable values ('{}', '{}', '{}', '{}', 0)".format(email, nickname, password, date)
                cursor.execute(sql3)
                db.commit()
                return HttpResponse("SIGNIN SUCCESS.", status=200)
            else:
                return HttpResponse("CODE ERROR.", status=200)
            return HttpResponse("GET SUCCESS.", status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)