from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def getinformation(request):
    if request.method == 'GET':
        try:
            appointmentId = request.GET['appointmentId']
            result = AppointmentTable.objects.get(id=appointmentId)
            data = {
                "clinicId": result.clinic_id,
                "clinic": ClinicTable.objects.get(id=result.clinic_id).name,
                "doctorId": result.doctor_id,
                "doctor": DoctorTable.objects.get(email=result.doctor_id).name,
                "service": result.service_id
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def getappointment(request):
    if request.method == 'GET':
        try:
            patient = request.GET['patient']
            result = AppointmentTable.objects.filter(stage__gte=2, patient=AccountTable.objects.get(email=patient)).values()
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
                stageList.append(x['stage'])
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

def getcomment(request):
    if request.method == 'GET':
        try:
            id = request.GET['appointmentId']
            obj = CommentTable.objects.get(appointment=id)
            comment = obj.content
            mark = obj.mark
            data = {
                'content': comment,
                'mark': mark
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def submmit(request):
    if request.method == 'GET':
        try:
            id = request.GET['id']
            account = request.GET['account']
            comment = request.GET['comment']
            mark = request.GET['mark']
            CommentTable(appointment=AppointmentTable.objects.get(id=id),
                         mark=mark, content=comment, committer=AccountTable.objects.get(email=account)).save()
            AppointmentTable.objects.filter(id=id).update(stage=3)
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)