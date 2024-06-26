from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def get_account(request):
    if request.method == 'GET':
        try:
            result = list(AccountTable.objects.all().values('nickname', 'email'))
            nicknameList = []
            emailList = []
            for x in result:
                nicknameList.append(x['nickname'])
                emailList.append(x['email'])
            data = {
                'nicknameList': nicknameList,
                'emailList': emailList
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def modify_nickname(request):
    if request.method == 'GET':
        try:
            # 加载
            email = request.GET['email']
            nickname = request.GET['nickname']
            AccountTable.objects.filter(email=email).update(nickname=nickname)
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def modify_psword(request):
    if request.method == 'GET':
        try:
            # 加载
            email = request.GET['email']
            psword = request.GET['psword']
            AccountTable.objects.filter(email=email).update(password=psword)
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def modify_power(request):
    if request.method == 'GET':
        try:
            # 加载
            email = request.GET['email']
            power = request.GET['power']
            AccountTable.objects.all().filter(email=email).update(power=power)
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def get_information(request):
    if request.method == 'GET':
        try:
            # 加载
            email = request.GET['email']
            result = list(AccountTable.objects.filter(email=email).values())[0]
            email = result['email']
            nickname = result['nickname']
            psword = result['password']
            power = result['power']
            data = {
                'email': email,
                'nickname': nickname,
                'psword': psword,
                'power': power
            }
            return JsonResponse(data, status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def get(request):
    if request.method == 'GET':
        try:
            email = request.GET['email']
            print(email)
            name = AccountTable.objects.get(email=email).name
            data = {
                'name': name
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)