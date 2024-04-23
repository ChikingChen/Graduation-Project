from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import ClinicTable, CityCountyTable

@csrf_exempt
def get_clinic(request):
    if request.method == 'GET':
        try:
            # 加载
            city = request.GET['city']
            county = request.GET['county']
            result = ClinicTable.objects.all().filter(city=city, county=county).values('location', 'time', 'name', 'id')
            locationList = []
            timeList = []
            nameList = []
            idList = []
            for x in result:
                locationList.append(x['location'])
                timeList.append(x['time'])
                nameList.append(x['name'])
                idList.append(x['id'])
            data = {
                'locationList': locationList,
                'timeList': timeList,
                'nameList': nameList,
                'idList': idList
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
            city = request.GET['city']
            result = list(CityCountyTable.objects.all().filter(city=city).values('county'))
            countyList = []
            for x in result:
                countyList.append(x['county'])
            result = list(ClinicTable.objects.all().filter(city=city, county=countyList[0]).values('id', 'location', 'time', 'name'))
            locationList = []
            timeList = []
            nameList = []
            idList = []
            for index, x in enumerate(result):
                locationList.append(x['location'])
                timeList.append(x['time'])
                nameList.append(x['name'])
                idList.append(x['id'])
            data = {
                'countyList': countyList,
                'locationList': locationList,
                'timeList': timeList,
                'nameList': nameList,
                'idList': idList
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)