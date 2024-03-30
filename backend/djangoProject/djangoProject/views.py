from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

@csrf_exempt
def login_psw(request):
    if request.method == 'GET':
        try:
            # 加载
            tele = request.GET.get('tele')
            psw = request.GET.get('psw')
            # 查询
            db = pymysql.connect(
                host='127.0.0.1',
                user='root',
                password='123456',
                database='db'
            )
            try:
                with db.cursor() as cursor:
                    sql_syntax = "insert into accounttable value ('15726922163', 'chiking', '123456', '2024-3-30', 0, 0, '2002-7-18');"
                    cursor.execute(sql_syntax)
                    db.commit()
            finally:
                db.close()
            return HttpResponse(status=200)
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
            code = request.GET.get('code')
            print(tele, code)
            # 查询

            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)
