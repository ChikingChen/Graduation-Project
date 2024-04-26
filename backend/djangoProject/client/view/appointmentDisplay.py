from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

import datetime

@csrf_exempt
def initial1(request):
    if request.method == 'GET':
        try:
            clinic = request.GET['clinic']
            clinic = ClinicTable.objects.get(id=clinic)
            doctor = request.GET['doctor']
            doctor = DoctorTable.objects.get(email=doctor)
            edu = doctor.edubackground
            if edu == 0: edu = '高中及以下'
            elif edu == 1: edu = '本科'
            elif edu == 2: edu = '硕士'
            elif edu == 3: edu = '博士'
            elif edu == 4: edu = '博士后'
            current = datetime.date.today()
            birthday = doctor.birthday
            age = current.year - birthday.year
            if current.month < birthday.month or (current.month == birthday.month and current.day < birthday.day):
                age -= 1
            datelist = list(ClinicDoctorTable.objects.filter(clinic=clinic, doctor=doctor).values('date').distinct())
            date = []
            for x in datelist:
                date.append(str(x['date'].month) + '月' + str(x['date'].day) + '日')
            appointmentlist = []
            usedlist = []
            for x in datelist:
                date1 = x['date']
                appointment = []
                used = []
                app = list(ClinicDoctorTable.objects.filter(clinic=clinic, doctor=doctor, date=date1)
                           .values('starttime', 'endtime', 'appointment'))
                for elem in app:
                    appointment.append((elem['starttime'], elem['endtime']))
                    used.append(elem['appointment'])
                appointmentlist.append(appointment)
                usedlist.append(used)
            data = {
                'name': doctor.name,
                'age': age,
                'edu': edu,
                'introduction': doctor.introduction,
                'datelist': date,
                'appointmentlist': appointmentlist,
                'usedlist': usedlist
            }
            return JsonResponse(data=data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def initial2(request):
    if request.method == 'GET':
        try:
            clinic = request.GET['clinic']
            clinic = ClinicTable.objects.get(id=clinic)
            service = request.GET['service']
            service = ServiceTable.objects.get(service=service)
            doctor = DoctorServiceTable.objects.filter(service=service).values('doctor')
            doctorList = []
            for doc in doctor:
                doctorList.append(doc['doctor'])
            appointmentList = ClinicDoctorTable.objects.filter(doctor=DoctorTable.objects.get(email=doctorList[0]), appointment=False, clinic=clinic)
            for doc in doctorList:
                appointmentList = appointmentList | ClinicDoctorTable.objects.filter(doctor=DoctorTable.objects.get(email=doc), appointment=False)
            date = appointmentList.values('date').distinct()
            dateList = []
            appointmentList = []
            for d in date:
                dateList.append(str(d['date'].month) + '月' + str(d['date'].day) + '日')
                appointment = []
                for doc in doctorList:
                    obj = ClinicDoctorTable.objects.all().filter(date=d['date'], appointment=False, doctor=DoctorTable.objects.get(email=doc)).values()
                    for app in obj:
                        appointment.append((app['starttime'], app['endtime']))
                    appointment = list(set(appointment))
                appointmentList.append(appointment)
            data = {
                'appointmentlist': appointmentList,
                'datelist': dateList
            }
            return JsonResponse(data=data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def makeAppointment1(request):
    if request.method == 'GET':
        try:
            clinic = request.GET['clinic']
            clinic = ClinicTable.objects.get(id=clinic)
            doctor = request.GET['doctor']
            doctor = DoctorTable.objects.get(email=doctor)
            date = request.GET['date']
            month = ''
            day = ''
            for x in date:
                if x == '月': break
                month += x
            flag = 0
            for x in date:
                if x == '月': flag = 1
                elif x == '日': break
                elif flag == 1: day += x
            date = datetime.date(year=datetime.date.today().year, month=int(month), day=int(day))
            starttime = request.GET['starttime']
            endtime = request.GET['endtime']
            patient = request.GET['account']
            ClinicDoctorTable.objects.filter(clinic=clinic, doctor=doctor, starttime=starttime, date=date).update(appointment=True)
            AppointmentTable(patient=patient, clinic=clinic, starttime=starttime, endtime=endtime, doctor=doctor).save()
            sender = AccountTable.objects.get(email='chiking0718@163.com')
            content = '患者：您\n医生：' + doctor.name + '\n时间：' + str(date) + ' ' + str(starttime) + ' - ' + str(endtime)
            MessageTable(sender=sender, receiver=patient, read=False, content=content, title='预约成功！').save()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def makeAppointment2(request):
    if request.method == 'GET':
        try:
            clinic = request.GET['clinic']
            clinic = ClinicTable.objects.get(id=clinic)
            date = request.GET['date']
            month = ''
            day = ''
            for x in date:
                if x == '月': break
                month += x
            flag = 0
            for x in date:
                if x == '月': flag = 1
                elif x == '日': break
                elif flag == 1: day += x
            date = datetime.date(year=datetime.date.today().year, month=int(month), day=int(day))
            starttime = request.GET['starttime']
            endtime = request.GET['endtime']
            doctor = list(ClinicDoctorTable.objects.filter(clinic=clinic, starttime=starttime, date=date).values('doctor'))[0]['doctor']
            doctor = DoctorTable.objects.get(email=doctor)
            ClinicDoctorTable.objects.filter(clinic=clinic, starttime=starttime, date=date, doctor=doctor).update(appointment=True)
            account = request.GET['account']
            patient = AccountTable.objects.get(email=account)
            AppointmentTable(patient=patient, clinic=clinic, starttime=starttime, endtime=endtime, doctor=doctor).save()
            sender = AccountTable.objects.get(email='chiking0718@163.com')
            content = '患者：您\n医生：' + doctor.name + '\n时间：' + str(date) + ' ' + str(starttime) + ' - ' + str(endtime)
            MessageTable(sender=sender, receiver=patient, read=False, content=content, title='预约成功！').save()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)