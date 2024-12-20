from django.urls import path
from .views import signup,login_v,addNote,getNote,viewNote

urlpatterns=[path('submit/',signup,name='signup'),
             path('goto/',login_v, name='login_v'),
             path('add/',addNote,name='addNote'),
             path('get/',getNote,name='getNote'),
             path('view/',viewNote,name='viewNote'),
            ]