from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def get_name(request):
    if request.method == 'GET':
        try:
            email = request.GET.get('email')
            result = AccountTable.objects.all().filter(email=email).values('nickname', 'power')
            nickname = result[0]['nickname']
            power = result[0]['power']
            data = {
                'nickname': nickname,
                'power': power
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
            email = request.GET.get('email')
            accontObj = AccountTable.objects.get(email=email)
            account = {}
            account['nickname'] = accontObj.nickname
            commentList = []
            comment = CommentTable.objects.filter(committer=accontObj).values()
            for x in comment:
                elem = {}
                clinicObj = AppointmentTable.objects.get(id=x['appointment_id']).clinic
                elem['id'] = x['id']
                elem['clinicName'] = clinicObj.name
                elem['clinicId'] = clinicObj.id
                elem['date'] = x['time']
                elem['content'] = x['content']
                elem['mark'] = x['mark']
                commentList.append(elem)
            data = {
                'commentList': commentList,
                'account': account
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)