from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

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
            county = request.GET['county']
            sql1 = 'insert into citycountytable value ("{}", "{}");'.format(city, county)
            cursor.execute(sql1)
            db.commit()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


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
            city = request.GET['city']
            sql1 = "select county from citycountytable where city = '{}'".format(city)
            cursor.execute(sql1)
            result = cursor.fetchall()
            county = []
            for elem in result:
                county.append(elem[0])
            data = {
                'countyList': county
            }
            return JsonResponse(data, status=200)
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
            county = request.GET['county']
            sql1 = 'delete from citycountytable where county = "{}" and city = "{}"'.format(county, city)
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
            city = request.GET['city']
            oldName = request.GET['oldName']
            newName = request.GET['newName']
            sql1 = 'update citycountytable set county = "{}" where county = "{}"'.format(newName, oldName)
            cursor.execute(sql1)
            db.commit()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)