import random

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from client.models import *


def getCookie(account):
    s = ""
    for i in range(6):
        s += str(random.randint(0, 9))
    while BackstageCookieTable.objects.filter(cookie=s).exists():
        s = ""
        for i in range(6):
            s += str(random.randint(0, 9))
    BackstageCookieTable(account=BackstageAccountTable.objects.get(email=account), cookie=s).save()
    return s

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
            response = HttpResponse(result, status=200)
            response.set_cookie("login", getCookie(account))
            # response['Cookie'] = getCookie(account)
            for x in response.items():
                print(x, response.items())
            return response
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)