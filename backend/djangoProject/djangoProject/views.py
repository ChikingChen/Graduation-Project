from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_psw(request):
    if request.method == 'GET':
        try:
            print(request)
            data = json.loads(request.body)
            print('psw get!')
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def login_tele(request):
    if request.method == 'GET':
        try:
            data = json.loads(request.body)
            print('tele get!')
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

