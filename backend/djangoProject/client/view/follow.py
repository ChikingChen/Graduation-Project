from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def dislike(request):
    if request.method == 'GET':
        try:
            id = request.GET['id']
            account = request.GET['account']
            FollowLikeTable.objects.filter(follow=FollowTable.objects.get(id=id),
                account=AccountTable.objects.get(email=account)).delete()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def like(request):
    if request.method == 'GET':
        try:
            id = request.GET['id']
            account = request.GET['account']
            FollowLikeTable(follow=FollowTable.objects.get(id=id),
                account=AccountTable.objects.get(email=account)).save()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def add(request):
    if request.method == 'GET':
        try:
            commentId = request.GET['commentId']
            account = request.GET['account']
            content = request.GET['content']
            FollowTable(account=AccountTable.objects.get(email=account),
                        comment=CommentTable.objects.get(id=commentId),
                        content=content).save()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return  HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def delete(request):
    if request.method == 'GET':
        try:
            followId = request.GET['followId']
            FollowTable.objects.filter(id=followId).delete()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)