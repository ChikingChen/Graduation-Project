from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def get_clinic(request):
    if request.method == 'GET':
        try:
            # 加载
            city = request.GET['city']
            county = request.GET['county']
            result = (ClinicTable.objects.all().filter(city=city, county=county)
                      .values('location', 'time', 'name', 'id'))
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

@csrf_exempt
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
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def stageget(stage):
    if stage == 1:
        return "未就诊"
    elif stage == 2:
        return "未评价"
    else: return "已评价"

@csrf_exempt
def get(request):
    if request.method == 'GET':
        try:
            patient = request.GET['patient']
            result = AppointmentTable.objects.filter(stage__gte=1, patient=AccountTable.objects.get(email=patient)).values()
            idList = []; dateList = []; startList = []; endList = []
            doctorIdList = []; clinicList = []; doctorNameList = []
            stageList = []; serviceList = []
            for x in result:
                idList.append(x['id'])
                dateList.append(str(x['date']))
                startList.append(str(x['starttime']))
                endList.append(str(x['endtime']))
                doctorIdList.append(x['doctor_id'])
                clinicList.append(ClinicTable.objects.get(id=x['clinic_id']).name)
                doctorNameList.append(DoctorTable.objects.get(email=x['doctor_id']).name)
                serviceList.append(x['service_id'])
                stageList.append(stageget(x['stage']))
            data = {
                "idList": idList,
                "dateList": dateList,
                "startList": startList,
                "endList": endList,
                "doctorIdList": doctorIdList,
                "clinicList": clinicList,
                "doctorNameList": doctorNameList,
                "stageList": stageList,
                "serviceList": serviceList
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)