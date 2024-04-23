from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

import datetime

@csrf_exempt
def initial(request):
    if request.method == 'GET':
        try:
            clinic = request.GET['clinic']
            clinic = ClinicTable.objects.get(clinic=clinic)
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

            data = {
                'name': doctor.name,
                'age': age,
                'edu': edu,
                'introduction': doctor.introduction
            }
            return JsonResponse(data=data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)