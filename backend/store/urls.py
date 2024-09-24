# from django.urls import path
# from .views import register , login

# urlpatterns = [
#       path('register/', register, name='register'),
#     path('login/', login, name='login'),
# ]

from django.urls import path
from .views import RegisterView, LoginView ,ImageList

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/images/', ImageList.as_view(), name='image-list'),
]
