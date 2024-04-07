import random

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

from datetime import datetime
from .encode import encrypt_message, decrypt_message

@csrf_exempt
def login_psw(request): # 密码登录
    if request.method == 'GET':
        try:
            # 加载
            tele = request.GET.get('tele')
            if len(tele) != 11: return HttpResponse("LEN ERROR.", status=200)
            psw = request.GET.get('psw')
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            # 查询手机号是否存在
            sql1 = "select count(*) from accounttable where telephone = {};".format(tele)
            cursor.execute(sql1)
            data = cursor.fetchall()
            if data[0][0] == 0: return HttpResponse("TELE ERROR.", status=200)
            # 查询密码是否与手机号对应
            sql2 = "select psword from accounttable where telephone = {};".format(tele)
            cursor.execute(sql2)
            data = cursor.fetchall()
            if data[0][0] == psw: return HttpResponse("LOGIN SUCCESS.", status=200)
            else: return HttpResponse("PSW ERROR.", status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def login_tele(request):
    if request.method == 'GET':
        try:
            # 加载内容
            tele = request.GET.get('tele')
            if len(tele) == 0: return HttpResponse("LEN ERROR.", status=200)
            code = request.GET.get('code')
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            # 查询手机号是否存在
            sql1 = "select count(*) from accounttable where telephone = {};".format(tele)
            cursor.execute(sql1)
            data = cursor.fetchall()
            if data[0][0] == 0: return HttpResponse("TELE ERROR.", status=200)
            # 查询手机号是否有对应的验证码
            sql2 = "select vericode from codetable where telephone = {};".format(tele)
            cursor.execute(sql2)
            data = cursor.fetchall()
            if data == (): return HttpResponse("NO CODE.", status=200)
            data = bytes.fromhex(data[0][0])
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
            # 加载内容
            tele = request.GET.get('tele')
            if len(tele) != 11: return HttpResponse("LEN ERROR.", status=200)
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            # 检查手机号是否存在
            sql1 = "select count(*) from accounttable where telephone = {};".format(tele)
            cursor.execute(sql1)
            data = cursor.fetchall()
            if data[0][0] == 0: return HttpResponse("TELE ERROR.", status=200)
            # 手机号是否已经存在验证码
            sql2 = "select count(*) from codetable where telephone = {};".format(tele)
            cursor.execute(sql2)
            data = cursor.fetchall()
            if data[0][0] != 0:
                sqlt = "delete from codetable where telephone = {};".format(tele)
                cursor.execute(sqlt)
                db.commit()
            # 获取验证码
            code = random.randint(0, 9999)
            code = str(code).zfill(4)
            code = code[::-1]
            print(code)
            code = encrypt_message(code).hex()
            # 获取时间
            now = datetime.now()
            now = now.strftime("%Y-%m-%d %H:%M:%S")
            # 插入数据库
            sql3 = "insert into codetable value ({}, '{}', '{}');".format(tele, code, now)
            cursor.execute(sql3)
            db.commit()
            return HttpResponse("GET SUCCESS.", status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)
