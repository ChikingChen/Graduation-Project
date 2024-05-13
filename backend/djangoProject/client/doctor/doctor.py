from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def index(request):
    if request.method == 'GET':
        try:
            return render(request, "doctor/index.html")
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def information(request):
    if request.method == 'GET':
        try:
            account = request.GET['account']
            clinicList = []
            for x in ClinicTable.objects.all().values():
                obj = {}
                obj['name'] = x['name']
                obj['city'] = x['city_id']
                obj['county'] = x['county']
                obj['location'] = x['location']
                obj['id'] = x['id']
                obj['allowApplication'] = not ClinicDoctorTable.objects.filter(doctor=DoctorTable.objects.get(email=account),
                                            clinic=ClinicTable.objects.get(id=x['id'])).exists()
                clinicList.append(obj)
            appointmentList = []
            for x in AppointmentTable.objects.filter(doctor_id=account, stage=1).values():
                obj = {}
                print(x)
                obj['name'] = x['patient']
                appointmentList.append(obj)
            data = {
                'clinicList': clinicList
            }
            return JsonResponse(data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


@csrf_exempt
def person(request):
    if request.method == 'GET':
        try:

            return render(request, "doctor/person.html", dict)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


@csrf_exempt
def logout(request):
    if request.method == 'GET':
        try:
            return redirect('login:login')
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def welcome(request):
    if request.method == 'GET':
        try:
            return render(request, "doctor/welcome.html")
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def application(request):
    if request.method == 'GET':
        try:
            sender = request.GET['sender']
            id = request.GET['id']
            BackstageApplicationTable(send=BackstageAccountTable.objects.get(email=sender),
                                      receive=ClinicTable.objects.get(id=id)).save()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)