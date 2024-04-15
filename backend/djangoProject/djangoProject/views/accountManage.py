from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

from .encode import encrypt_message, decrypt_message

@csrf_exempt
def get_account(request):
    if request.method == 'GET':
        try:
            # 加载
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            sql1 = "select nickname, email from accounttable;"
            cursor.execute(sql1)
            result = cursor.fetchall()
            nicknameList = []
            emailList = []
            for _ in result:
                nicknameList.append(_[0])
                emailList.append(_[1])
            data = {
                'nicknameList': nicknameList,
                'emailList': emailList
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def modify_nickname(request):
    if request.method == 'GET':
        try:
            # 加载
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            email = request.GET['email']
            nickname = request.GET['nickname']
            sql1 = ("update accounttable set nickname = '{}' where email = '{}'"
                    .format(nickname, email))
            cursor.execute(sql1)
            db.commit()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def modify_psword(request):
    if request.method == 'GET':
        try:
            # 加载
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            email = request.GET['email']
            psword = encrypt_message(request.GET['psword']).hex()
            sql1 = ("update accounttable set psword = '{}' where email = '{}'"
                    .format(psword, email))
            cursor.execute(sql1)
            db.commit()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def modify_power(request):
    if request.method == 'GET':
        try:
            # 加载
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            email = request.GET['email']
            power = request.GET['power']
            sql1 = ("update accounttable set power = '{}' where email = '{}'"
                    .format(power, email))
            cursor.execute(sql1)
            db.commit()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def get_information(request):
    if request.method == 'GET':
        try:
            # 加载
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            email = request.GET['email']
            print(email)
            sql1 = "select * from accounttable where email = '{}'".format(email)
            cursor.execute(sql1)
            result = cursor.fetchall()
            email, nickname, psword, rgtime, power = result[0]
            psword = bytes.fromhex(psword)
            psword = decrypt_message(psword)
            data = {
                'email': email,
                'nickname': nickname,
                'psword': psword,
                'power': power
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)