from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from  .models import User,Note


@csrf_exempt
def signup(request):
    if request.method=='POST':
        data= json.loads(request.body)
        username=data.get('username')
        name=data.get('name')
        email=data.get('email')
        password=data.get('password')

        if not name or not password:
            return JsonResponse({'error':'Name & pass required'},status=400)
        
        user=User(username=username,name=name, email=email,password=password)
        user.save()
        return JsonResponse({'message':'Data stored'},status=201)
    return JsonResponse({'error':'invalid request'},status=405)


@csrf_exempt
def login_v(request):
    
    if request.method=='POST':
        data=json.loads(request.body)
        username=data.get('username')
        password=data.get('password')

        try:
            user=User.objects.get(username=username)
            if password==user.password:
                return JsonResponse({'success':True,
                                     'message':'successfully logged in',
                                     'userid':user.id}, status=201)
            else:
                return JsonResponse({'success':False, 'message':'login failed'}, status= 401)
        except User.DoesNotExist:
            return JsonResponse({'message':'failed'})
    return JsonResponse({'message':'failed'},status= 405)



# @csrf_exempt
# def userid(request):
#     data= json.loads(request.body)
#     username=data.get('username')

#     user=User.objects.filter(username=username).values('id')
#     return JsonResponse(user)


@csrf_exempt
def addNote(request):
    if request.method=='POST':
        data=json.loads(request.body)
        title=data.get('title')
        addnote=data.get('addnote')
        userid=data.get('userid')

        if not title or not addnote:
            return JsonResponse({'success':False})
        user=User.objects.get(id=userid)
        note=Note(title=title,note=addnote,userid=user)
        note.save()
        return JsonResponse({
            'success':True,
            'message':'data saved'},status=201)
    return JsonResponse({'error':'invalid request'},status=405)

@csrf_exempt
def getNote(request):
    if request.method=='POST':
        data=json.loads(request.body)
        userid=data.get('userid')
        if not userid:
            return JsonResponse({'error':'no id'})
        try:  
            notes=Note.objects.filter(userid=userid).values()
            return JsonResponse({
                            'success':True,
                            'message':'dataloaded',
                            'notes':list(notes)},status=200)
        except Exception as e:
            return JsonResponse({'error':f'error occured: {str(e)}'},status=500)
    return JsonResponse({'error':'invalid'},status=405)

@csrf_exempt
def viewNote(request):
    if request.method=='POST':
        data=json.loads(request.body)
        noteid=data.get('noteid')

        if not noteid:
            return JsonResponse({'success':False})
        note= Note.objects.filter(id=noteid).values()
        return JsonResponse({
            'success':True,
            'note':list(note)
        })
    return JsonResponse({'error':'invalid'},status=405)


@csrf_exempt
def deleteNote(request):
    if request.method=='POST':
        data=json.loads(request.body)
        noteid=data.get('delnoteid')

        note=Note.objects.get(id=noteid)
        note.delete()
        return JsonResponse({
            'success':True,
            'message':'Note deleted'
        })
    return JsonResponse({'error':'Invalid request'},status=405)

@csrf_exempt
def updateNote(request):
    if request.method=='POST':
        data=json.loads(request.body)
        type=data.get('type')
        value=data.get('editedvalue')
        noteid=data.get('id')

        note=Note.objects.get(id=noteid)
        setattr(note,type,value)
        note.save()
        return JsonResponse({'success':True, 'message':'data updated'})
    return JsonResponse({'error':'invalid request'})
