from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

@csrf_exempt
def get_clinic(request):
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
            city = request.GET['city']
            county = request.GET['county']
            sql1 = "select * from clinictable where city = '{}' and county = '{}'".format(city, county)
            cursor.execute(sql1)
            result = cursor.fetchall()
            locationList = []
            timeList = []
            nameList = []
            for _1, _2, _3, loc, tm, nm in result:
                locationList.append(loc)
                timeList.append(tm)
                nameList.append(nm)
            data = {
                'locationList': locationList,
                'timeList': timeList,
                'nameList': nameList
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def initial(request):
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
            city = request.GET['city']
            sql1 = "select county from citycountytable where city = '{}'".format(city)
            cursor.execute(sql1)
            result = cursor.fetchall()
            countyList = []
            for county in result:
                countyList.append(county[0])
            sql2 = "select location, tm, nm from clinictable where city = '{}' and county = '{}'".format(city, countyList[0])
            cursor.execute(sql2)
            result = cursor.fetchall()
            locationList = []
            timeList = []
            nameList = []
            for locaiton, time, name in result:
                locationList.append(locaiton)
                timeList.append(time)
                nameList.append(name)
            data = {
                'countyList': countyList,
                'locationList': locationList,
                'timeList': timeList,
                'nameList': nameList
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)