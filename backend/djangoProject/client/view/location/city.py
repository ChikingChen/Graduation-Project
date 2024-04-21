from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ...models import CityTable

@csrf_exempt
def get(request):
    if request.method == 'GET':
        try:
            # 读取数据库
            result = list(CityTable.objects.all().values())
            location = []
            for x in result:
                location.append(x['city'])
            data = {
                'cityList': location
            }
            return JsonResponse(data, status=200)
        except ValueError as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def add(request):
    if request.method == 'GET':
        try:
            # 连接数据库
            city = request.GET['city']
            CityTable(city=city).save()
            return HttpResponse(status=200)
        except ValueError as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def delete(request):
    if request.method == 'GET':
        try:
            # 连接数据库
            city = request.GET['city']
            CityTable.objects.filter(city=city).delete()
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
            oldName = request.GET['oldName']
            newName = request.GET['newName']
            CityTable.objects.filter(city=newName).update(city=oldName)
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)