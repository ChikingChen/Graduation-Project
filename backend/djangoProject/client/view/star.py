from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def get(request):
    if request.method == 'GET':
        try:
            account = request.GET['account']
            account = AccountTable.objects.get(email=account)
            result = StarTable.objects.filter(account=account).values()
            starList = []
            for elem in result:
                x = {}
                starObj = StarTable.objects.get(id=elem['id'])
                x['account'] = starObj.comment.committer.email
                x['name'] = starObj.comment.committer.name
                x['likeCount'] = LikeTable.objects.filter(comment=starObj.comment).count()
                x['havelike'] = LikeTable.objects.filter(comment=starObj.comment, account=account).exists()
                x['commentId'] = starObj.comment.id
                x['content'] = starObj.comment.content
                starList.append(x)
            data = {
                'starList': starList
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)