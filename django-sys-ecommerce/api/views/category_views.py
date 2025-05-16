from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from store.models import Category
from api.serializers.category_serializers import (
    CategorySerializer,
    CategorySimpleSerializer,
)
from rest_framework.response import Response

# dev_35
from rest_framework.views import APIView
from rest_framework import status

# dev_37
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, PermissionDenied

# dev_38
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import filters


# dev_3 fruit
class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


