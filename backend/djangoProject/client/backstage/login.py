from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def loginHttp(request):
    if request.method == 'GET':
        try:
            return render(request, "login.html")
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            account = request.POST['account']
            password = request.POST['password']
            print(account, password)
            result = BackstageAccountTable.objects.get(email=account).password
            if password != result: return HttpResponse("FAIL", status=200)
            result = BackstageAccountTable.objects.get(email=account).power
            if result == 1:
                return redirect('backstage:administerIndex')
            elif result == 2:
                return redirect('backstage:doctorIndex')
            else:
                return redirect('backstage:clinicIndex')
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)