from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import ClinicTable

@csrf_exempt
def initial(request):
    if request.method == 'GET':
        try:
            index = request.GET['index']
            result = ClinicTable.objects.filter(id=index).values()
            print(list(result)[0])
            name = list(result)[0]['name']
            time = list(result)[0]['time']
            location = list(result)[0]['location']
            data = {
                'name': name,
                'time': time,
                'location': location
            }
            print(data)
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)