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

# dev_11_Fruit
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiExample

# dev_3 fruit
@extend_schema_view(
    list=extend_schema(
        tags=["categories_views"],
        description="카테고리 목록을 반환합니다.",
        examples=[
            OpenApiExample(
                name="카테고리 목록 예시", 
                value=[
                    {"id": 1, "name": "전자제품"},
                    {"id": 2, "name": "도서"},
                    {"id": 3, "name": "의류"},
                ],
                response_only=True
            )
        ]
    ),
    create=extend_schema(
        tags=["categories_views"],
        description="새로운 카테고리를 생성합니다.",
        examples=[
            OpenApiExample(
                name="카테고리 생성 예시", 
                value={"name": "전자제품"},
                response_only=True
            )
        ]
    ),
    retrieve=extend_schema(
        tags=["categories_views"],
        description="단일 카테고리 정보를 리턴합니다.",
        examples=[
            OpenApiExample(
                name="단일 카테고리 예시", 
                value=[
                    {"id": 1, "name": "전자제품"},
                ],
                response_only=True
            )
        ]
    ),
    
)
class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


