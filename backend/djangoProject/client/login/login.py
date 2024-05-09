from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from client.models import *


@csrf_exempt
def index(request):
    return render(request, "login.html")


@csrf_exempt
def click(request):
    if request.method == 'GET':
        try:
            account = request.GET['account']
            password = request.GET['password']
            if not BackstageAccountTable.objects.filter(email=account).exists(): return HttpResponse(0, status=200)
            result = BackstageAccountTable.objects.get(email=account).password
            if password != result: return HttpResponse(0, status=200)
            result = BackstageAccountTable.objects.get(email=account).power
            return HttpResponse(result, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)