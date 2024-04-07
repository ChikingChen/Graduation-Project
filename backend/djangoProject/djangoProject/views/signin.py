import random

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

from datetime import datetime
from .encode import encrypt_message, decrypt_message

@csrf_exempt
def get_code(request):
    if request.method == 'GET':
        try:
            # 加载内容
            tele = request.GET.get('tele')
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
            if data[0][0] != 0: return HttpResponse("TELE EXISTS.", status=200)
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

@csrf_exempt
def sign_in(request):
    if request.method == 'GET':
        try:
            # 加载内容
            tele = request.GET.get('tele')
            code = request.GET.get('code')
            nickname = request.GET.get('nickname')
            password = request.GET.get('password')
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
            if data[0][0] != 0: return HttpResponse("TELE EXISTS.", status=200)
            # 查询手机号是否有对应的验证码
            sql2 = "select vericode from codetable where telephone = {};".format(tele)
            cursor.execute(sql2)
            data = cursor.fetchall()
            if data == (): return HttpResponse("NO CODE.", status=200)
            data = bytes.fromhex(data[0][0])
            data = decrypt_message(data)
            if data == code:
                date = datetime.now()
                sql3 = "insert into accounttable values ('{}', '{}', '{}', '{}', 0)".format(tele, nickname, password, date)
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