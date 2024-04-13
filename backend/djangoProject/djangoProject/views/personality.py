from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

@csrf_exempt
def get_name(request):
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
            email = request.GET.get('email')
            # 查询数据库
            sql1 = "select nickname, power from accounttable where email = '{}'".format(email)
            cursor.execute(sql1)
            db.commit()
            nickname, power = cursor.fetchall()[0]
            data = {
                'nickname': nickname,
                'power': power
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

            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)