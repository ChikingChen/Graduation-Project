from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

@csrf_exempt
def get(request):
    if request.method == 'GET':
        try:
            # 连接数据库
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            # 读取数据库
            sql1 = 'select city from citytable';
            cursor.execute(sql1)
            result = cursor.fetchall()
            location = []
            for elem in result:
                location.append(elem[0])
            data = {
                'cityList': location
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def add(request):
    if request.method == 'GET':
        try:
            # 连接数据库
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            city = request.GET['city']
            sql1 = 'insert into citytable value ("{}")'.format(city)
            cursor.execute(sql1)
            db.commit()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def delete(request):
    if request.method == 'GET':
        try:
            # 连接数据库
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            city = request.GET['city']
            sql1 = 'delete from citytable where city = "{}"'.format(city)
            cursor.execute(sql1)
            db.commit()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def modify(request):
    if request.method == 'GET':
        try:
            # 连接数据库
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            cursor = db.cursor()
            oldName = request.GET['oldName']
            newName = request.GET['newName']
            sql1 = 'update citytable set city = "{}" where city = "{}"'.format(newName, oldName)
            cursor.execute(sql1)
            db.commit()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)