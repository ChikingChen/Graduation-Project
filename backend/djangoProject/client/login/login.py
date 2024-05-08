from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from client.models import *


@csrf_exempt
def index(request):
    return render()


@csrf_exempt
def login(request):
    if request.method == 'GET':
        try:
            account = request.GET['account']
            password = request.GET['password']
            result = BackstageAccountTable.objects.get(email=account).password
            if password != result: return HttpResponse("FAIL", status=200)
            result = BackstageAccountTable.objects.get(email=account).power
            data = {
                'result': result
            }
            return JsonResponse(data=data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)