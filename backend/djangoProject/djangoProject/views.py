from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

from Crypto.Cipher import AES

@csrf_exempt
def login_psw(request): # 密码登录
    if request.method == 'GET':
        try:
            # 加载
            tele = request.GET.get('tele')
            if len(tele) != 11: return HttpResponse("LEN ERROR", status=200)
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
            code = request.GET.get('code')
            print(tele, code)
            # 查询

            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)
