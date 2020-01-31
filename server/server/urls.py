from django.urls import path
from .view import Test
urlpatterns = [
    path('test', Test.as_view())
]
