from django.urls import path
from .views import signup,login_v,addNote,getNote,viewNote,deleteNote,updateNote

urlpatterns=[path('submit/',signup,name='signup'),
             path('goto/',login_v, name='login_v'),
             path('add/',addNote,name='addNote'),
             path('get/',getNote,name='getNote'),
             path('view/',viewNote,name='viewNote'),
             path('del/',deleteNote,name='deleteNote'),
             path('update/',updateNote,name='updateNote'),
            ]