from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

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
            sql1 = "update accounttable set nickname = '{}' where email = '{}'".format(nickname, email)
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
            sql1 = "select * from accounttable where email = '{}'".format(email)
            print(sql1)
            cursor.execute(sql1)
            result = cursor.fetchall()
            print(result)
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)