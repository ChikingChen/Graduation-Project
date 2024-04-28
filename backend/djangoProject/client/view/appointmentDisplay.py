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
            title = doctor.title
            if title == 0: title = '医士'
            elif title == 1: title = '医师'
            elif title == 2: title = '主治医师'
            elif title == 3: title = '副主任医师'
            elif title == 4: title = '主任医师'
            current = datetime.date.today()
            birthday = doctor.birthday
            age = current.year - birthday.year
            if current.month < birthday.month or (current.month == birthday.month and current.day < birthday.day):
                age -= 1
            datelist = list(AppointmentTable.objects.filter(clinic=clinic, doctor=doctor).values('date').distinct())
            date = []
            for x in datelist:
                date.append(str(x['date'].month) + '月' + str(x['date'].day) + '日')
            appointmentlist = []
            usedlist = []
            for x in datelist:
                date1 = x['date']
                appointment = []
                used = []
                app = list(AppointmentTable.objects.filter(clinic=clinic, doctor=doctor, date=date1)
                           .values('starttime', 'endtime', 'stage'))
                for elem in app:
                    appointment.append((elem['starttime'], elem['endtime']))
                    used.append(elem['stage'])
                appointmentlist.append(appointment)
                usedlist.append(used)
            data = {
                'name': doctor.name,
                'age': age,
                'edu': edu,
                'title': title,
                'introduction': doctor.introduction,
                'datelist': date,
                'appointmentlist': appointmentlist,
                'usedlist': usedlist
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
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
            appointmentList = AppointmentTable.objects.filter(doctor=DoctorTable.objects.get(email=doctorList[0]), stage=0, clinic=clinic)
            for doc in doctorList:
                appointmentList = appointmentList | AppointmentTable.objects.filter(doctor=DoctorTable.objects.get(email=doc), stage=0)
            date = appointmentList.values('date').distinct()
            dateList = []
            appointmentList = []
            for d in date:
                dateList.append(str(d['date'].month) + '月' + str(d['date'].day) + '日')
                appointment = []
                for doc in doctorList:
                    obj = AppointmentTable.objects.all().filter(date=d['date'], stage=0, doctor=DoctorTable.objects.get(email=doc)).values()
                    for app in obj:
                        appointment.append((app['starttime'], app['endtime']))
                    appointment = list(set(appointment))
                appointmentList.append(appointment)
            data = {
                'appointmentlist': appointmentList,
                'datelist': dateList
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
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
            service = request.GET['service']
            patient = AccountTable.objects.get(email=patient)
            (AppointmentTable.objects.filter(clinic=clinic, doctor=doctor, starttime=starttime, date=date)
                .update(stage=1, service=ServiceTable.objects.get(service=service)))
            sender = AccountTable.objects.get(email='chiking0718@163.com')
            content = '患者：您\n医生：' + doctor.name + '\n时间：' + str(date) + ' ' + str(starttime) + ' - ' + str(endtime)
            MessageTable(sender=sender, receiver=patient, read=False, content=content, title='预约成功！').save()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
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
            service = request.GET['service']
            doctor = list(AppointmentTable.objects.filter(clinic=clinic, starttime=starttime, date=date)
                          .values('doctor'))[0]['doctor']
            doctor = DoctorTable.objects.get(email=doctor)
            (AppointmentTable.objects.filter(clinic=clinic, starttime=starttime, date=date, doctor=doctor)
                .update(stage=1, service=ServiceTable.objects.get(service=service)))
            account = request.GET['account']
            patient = AccountTable.objects.get(email=account)
            sender = AccountTable.objects.get(email='chiking0718@163.com')
            content = ('患者：您\n医生：' + doctor.name + '\n时间：' + str(date)
                       + ' ' + str(starttime) + ' - ' + str(endtime))
            MessageTable(sender=sender, receiver=patient, read=False, content=content, title='预约成功！').save()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)