from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pymysql

from ..models import AccountTable

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
