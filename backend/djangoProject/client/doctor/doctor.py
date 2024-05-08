from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def index(request):
    if request.method == 'GET':
        try:
            return render(request, "doctor/index.html")
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


@csrf_exempt
def person(request):
    if request.method == 'GET':
        try:
            dict = {

            }
            return render(request, "doctor/person.html", dict)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


@csrf_exempt
def logout(request):
    if request.method == 'GET':
        try:
            return redirect('login:login')
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)