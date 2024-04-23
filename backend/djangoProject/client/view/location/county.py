from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ...models import CityCountyTable, CityTable

@csrf_exempt
def add(request):
    if request.method == 'GET':
        try:
            # 连接数据库
            city = request.GET['city']
            city = CityTable.objects.get(city=city)
            county = request.GET['county']
            CityCountyTable(city=city, county=county).save()
            return HttpResponse(status=200)
        except ValueError as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


@csrf_exempt
def get(request):
    if request.method == 'GET':
        try:
            # 连接数据库
            city = request.GET['city']
            city = CityTable.objects.get(city=city)
            result = CityCountyTable.objects.filter(city=city).values('county')
            county = []
            for x in result:
                county.append(x['county'])
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
            city = request.GET['city']
            city = CityTable.objects.get(city=city)
            county = request.GET['county']
            CityCountyTable.objects.filter(county=county, city=city).delete()
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
            city = request.GET['city']
            city = CityTable.objects.get(city=city)
            oldName = request.GET['oldName']
            newName = request.GET['newName']
            CityCountyTable.objects.filter(county=oldName, city=city).update(county=newName)
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)