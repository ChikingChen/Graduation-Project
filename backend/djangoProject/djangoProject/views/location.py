from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

@csrf_exempt
def get_location(request):
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
def add_location(request):
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
            return JsonResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def delete_location(request):
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
            return JsonResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)