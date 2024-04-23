from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def initial(request):
    if request.method == 'GET':
        try:
            index = request.GET['index']
            result = ClinicTable.objects.filter(id=index).values()
            name = list(result)[0]['name']
            location = list(result)[0]['location']
            result = ClinicServiceTable.objects.filter(clinic_id=index).values('service')
            serviceList = []
            for x in result:
                serviceList.append(x['service'])
            clinic = index
            service = serviceList[0]
            clinic = ClinicTable.objects.all().get(id=clinic)
            service = ServiceTable.objects.all().get(service=service)
            doctorList1 = DoctorServiceTable.objects.filter(service=service).values('doctor')
            doctorList2 = ClinicDoctorTable.objects.filter(clinic=clinic).values('doctor')
            doctorQueryList = doctorList1.intersection(doctorList2)
            doctorList = []
            nameList = []
            for x in doctorQueryList:
                doctorList.append(x['doctor'])
                nameList.append(DoctorTable.objects.all().get(email=x['doctor']).name)
            data = {
                'name': name,
                'location': location,
                'serviceList': serviceList,
                'idList': doctorList,
                'nameList': nameList
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def get_doctor(request):
    if request.method == 'GET':
        try:
            clinic = request.GET['clinic']
            clinic = ClinicTable.objects.all().get(id=clinic)
            service = request.GET['service']
            service = ServiceTable.objects.all().get(service=service)
            doctorList1 = DoctorServiceTable.objects.filter(service=service).values('doctor')
            doctorList2 = ClinicDoctorTable.objects.filter(clinic=clinic).values('doctor')
            doctorQueryList = doctorList1.intersection(doctorList2)
            doctorList = []
            nameList = []
            for x in doctorQueryList:
                doctorList.append(x['doctor'])
                nameList.append(DoctorTable.objects.all().get(email=x['doctor']).name)
            data = {
                'idList': doctorList,
                'nameList': nameList
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)