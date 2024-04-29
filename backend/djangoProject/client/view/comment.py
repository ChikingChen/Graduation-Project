from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import *

@csrf_exempt
def getinformation(request):
    if request.method == 'GET':
        try:
            appointmentId = request.GET['appointmentId']
            result = AppointmentTable.objects.get(id=appointmentId)
            data = {
                "clinicId": result.clinic_id,
                "clinic": ClinicTable.objects.get(id=result.clinic_id).name,
                "doctorId": result.doctor_id,
                "doctor": DoctorTable.objects.get(email=result.doctor_id).name,
                "service": result.service_id
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def getappointment(request):
    if request.method == 'GET':
        try:
            patient = request.GET['patient']
            result = AppointmentTable.objects.filter(stage__gte=2, patient=AccountTable.objects.get(email=patient)).values()
            idList = []; dateList = []; startList = []; endList = []
            doctorIdList = []; clinicList = []; doctorNameList = []
            stageList = []; serviceList = []
            for x in result:
                idList.append(x['id'])
                dateList.append(str(x['date']))
                startList.append(str(x['starttime']))
                endList.append(str(x['endtime']))
                doctorIdList.append(x['doctor_id'])
                clinicList.append(ClinicTable.objects.get(id=x['clinic_id']).name)
                doctorNameList.append(DoctorTable.objects.get(email=x['doctor_id']).name)
                serviceList.append(x['service_id'])
                stageList.append(x['stage'])
            data = {
                "idList": idList,
                "dateList": dateList,
                "startList": startList,
                "endList": endList,
                "doctorIdList": doctorIdList,
                "clinicList": clinicList,
                "doctorNameList": doctorNameList,
                "stageList": stageList,
                "serviceList": serviceList
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def getcomment(request):
    if request.method == 'GET':
        try:
            id = request.GET['appointmentId']
            obj = CommentTable.objects.get(appointment=id)
            comment = obj.content
            mark = obj.mark
            data = {
                'content': comment,
                'mark': mark
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def submmit(request):
    if request.method == 'GET':
        try:
            id = request.GET['id']
            account = request.GET['account']
            comment = request.GET['comment']
            mark = request.GET['mark']
            CommentTable(appointment=AppointmentTable.objects.get(id=id),
                         mark=mark, content=comment, committer=AccountTable.objects.get(email=account)).save()
            AppointmentTable.objects.filter(id=id).update(stage=3)
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def clinic(request):
    if request.method == 'GET':
        try:
            clinicId = request.GET['clinicId']
            account = request.GET['account']
            clinic = ClinicTable.objects.get(id=clinicId)
            appointmentIdList = AppointmentTable.objects.filter(clinic=clinic, stage=3).values('id')
            appointmentId = []
            for elem in appointmentIdList:
                appointmentId.append(elem['id'])
            commentList = []
            for id in appointmentId:
                obj = {}
                appointmentObj = AppointmentTable.objects.get(id=id)
                commentObj = CommentTable.objects.get(appointment=appointmentObj)
                obj['id'] = commentObj.id
                obj['mark'] = commentObj.mark
                obj['time'] = commentObj.time
                obj['committerAccount'] = commentObj.committer.email
                obj['committerName'] = commentObj.committer.nickname
                obj['content'] = commentObj.content
                obj['doctor'] = appointmentObj.doctor.name
                obj['service'] = appointmentObj.service.service
                obj['likeCount'] = LikeTable.objects.filter(comment=commentObj).count()
                obj['haveLike'] = LikeTable.objects.filter(comment=commentObj, account=account).exists()
                obj['starCount'] = StarTable.objects.filter(comment=commentObj).count()
                obj['starLike'] = StarTable.objects.filter(comment=commentObj, account=account).exists()
                obj['chatCount'] = FollowTable.objects.filter(comment=commentObj).count()
                commentList.append(obj)
            data = {
                "commentList": commentList,
                "name": ClinicTable.objects.get(id=clinicId).name
            }
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


def makelike(request):
    if request.method == 'GET':
        try:
            commentId = request.GET['commentId']
            account = request.GET['account']
            LikeTable(comment=CommentTable.objects.get(id=commentId)
                      , account=AccountTable.objects.get(email=account)).save()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


def dislike(request):
    if request.method == 'GET':
        try:
            commentId = request.GET['commentId']
            account = request.GET['account']
            LikeTable.objects.filter(comment=CommentTable.objects.get(id=commentId)
                      , account=AccountTable.objects.get(email=account)).delete()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


def makestar(request):
    if request.method == 'GET':
        try:
            commentId = request.GET['commentId']
            account = request.GET['account']
            StarTable(comment=CommentTable.objects.get(id=commentId)
                      , account=AccountTable.objects.get(email=account)).save()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


def disstar(request):
    if request.method == 'GET':
        try:
            commentId = request.GET['commentId']
            account = request.GET['account']
            StarTable.objects.filter(comment=CommentTable.objects.get(id=commentId)
                                     , account=AccountTable.objects.get(email=account)).delete()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


def initial(request):
    if request.method == 'GET':
        try:
            id = request.GET['id']
            account = request.GET['account']
            account = AccountTable.objects.get(email=account)
            commentObj = CommentTable.objects.get(id=id)
            clinicId = CommentTable.objects.get(id=id).appointment.clinic.id
            clinicObj = ClinicTable.objects.get(id=clinicId)
            follow = FollowTable.objects.filter(comment=commentObj).values()
            followList = []
            for x in follow:
                elem = {}
                elem['account'] = AccountTable.objects.get(email=x['account_id']).email
                elem['nickname'] = AccountTable.objects.get(email=x['account_id']).nickname
                elem['likeCount'] = FollowLikeTable.objects.filter(follow=FollowTable.objects.get(id=x['id'])).count()
                elem['havelike'] = FollowLikeTable.objects.filter(follow=FollowTable.objects.get(id=x['id']), account=account).count()
                elem['content'] = x['content']
                elem['date'] = str(x['time'].month) + '月' + str(x['time'].day) + '日'
                followList.append(elem)
            comment = {}
            clinic = {}
            clinic['id'] = clinicId
            clinic['name'] = clinicObj.name
            clinic['location'] = clinicObj.location
            sum = 0; cnt = 0
            appointmentList = AppointmentTable.objects.filter(stage=3).values('id')
            for x in appointmentList:
                sum += CommentTable.objects.get(appointment=AppointmentTable.objects.get(id=x['id'])).mark
                cnt += 1
            if cnt == 0: clinic['mark'] = 5
            else: clinic['mark'] = sum / cnt
            comment['clinic'] = clinic
            comment['account'] = commentObj.committer.email
            comment['nickname'] = commentObj.committer.nickname
            comment['content'] = commentObj.content
            comment['likeCount'] = LikeTable.objects.filter(comment=commentObj).count()
            comment['havelike'] = LikeTable.objects.filter(comment=commentObj, account=account).exists()
            comment['starCount'] = StarTable.objects.filter(comment=commentObj).count()
            comment['havestar'] = StarTable.objects.filter(comment=commentObj, account=account).exists()
            comment['date'] = str(commentObj.time.month) + '月' + str(commentObj.time.day) + '日'
            comment['mark'] = commentObj.mark
            data = {
                'followList': followList,
                'comment': comment
            }
            print(data)
            return JsonResponse(data=data, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)