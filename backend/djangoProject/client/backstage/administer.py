from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def index(request):
    if request.method == 'GET':
        try:
            return render(request, "administer/index.html")
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)