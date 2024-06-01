from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

def get(request):
    if request.method == 'GET':
        try:
            account = request.GET['account']
            message = list(MessageTable.objects.all()
                           .filter(receiver=AccountTable.objects.all()
                                   .get(email=account)).values())
            data = {
                'messageList': message
            }
            return JsonResponse(data=data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def read(request):
    if request.method == 'GET':
        try:
            id = request.GET['id']
            MessageTable.objects.all().filter(id=id).update(read=True)
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)