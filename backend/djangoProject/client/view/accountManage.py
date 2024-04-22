from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from client.view.encode import encrypt_message, decrypt_message

from ..models import AccountTable

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
            psword = encrypt_message(request.GET['psword']).hex()
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
            psword = bytes.fromhex(psword)
            psword = decrypt_message(psword)
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