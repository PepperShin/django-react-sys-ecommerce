from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from store.models import Product
from api.serializers.product_serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status

# dev_10_Fruit
from django.db.models import Max # 무조건 제일 위에 배치

# dev_11_Fruit
from drf_spectacular.utils import extend_schema, extend_schema_view

#http://127.0.0.1:8000/api/products/?ordering=-price

# dev_29
# dev_11_Fruit
@extend_schema( # 함수형 view에서만 사용하는 데코레이터. 클래스형은 불가능.
    tags=["추가 API 설명"],
    methods=["GET"], # 이 데코레이터를 적용할 HTTP 메서드
    summary="상품들을 조회", # API 요약 설명
    description="상품의 리스트를 조회하는 API입니다.", # API 상세 설명
    responses={200: ProductSerializer(many=True)} # 응답 스키마
)
@extend_schema( # 함수형 view에서만 사용하는 데코레이터. 클래스형은 불가능.
    tags=["추가 API 설명"],
    methods=["POST"], # 이 데코레이터를 적용할 HTTP 메서드
    summary="상품을 수정", # API 요약 설명
    description="상품을 수정하는 API입니다.", # API 상세 설명
    responses={200: ProductSerializer(many=False)} # 응답 스키마
)
@api_view(["GET", "POST"])
def products_api(request):
    if request.method == "GET":
        products = Product.objects.all()
        # many=True ➜ 여러 개의 인스턴스 (QuerySet, 리스트 등)
        # many=False (기본값) ➜ 단일 인스턴스
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    # dev_30
    # 디시리얼라이져
    if request.method == "POST":
        print("데이터", request.data)  # json, dic
        print("타입", type(request.data))  # dic

        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)



# dev_30
@api_view(["GET", "DELETE", "PUT"])
def product_api(request, pk):
    product = get_object_or_404(Product, id=pk)

    if request.method == "GET":
        # many=True ➜ 여러 개의 인스턴스 (QuerySet, 리스트 등)
        # many=False (기본값) ➜ 단일 인스턴스(이번에는 세팅할 필요 없다)
        serializer = ProductSerializer(product)  # 딕셔너리로 전환

        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ProductSerializer(product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    elif request.method == "DELETE":
        product.delete()

        return Response(
            "SUCCESS", status=status.HTTP_204_NO_CONTENT
        )  # from rest_framework import status

#dev_10_Fruit
# 페이지네이션 클래스 (옵션)

# GET /api/product-list/
# 요청 예시
# 검색 조건이 URL에 있으므로 즐겨찾기/공유 가능
# 조회는 GET으로 한다
# 서버에서 캐싱 가능
# /api/product-list/?page=2	페이지 2
# /api/product-list/?search=포도	'포도' 포함 검색
# /api/product-list/?category=4	카테고리 ID가 4번인 상품 필터링
# /api/product-list/?ordering=price	가격 오름차순 정렬
# /api/product-list/?ordering=-id	최신순 정렬
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

#http://127.0.0.1:8000/api/product-list/?page_size=5
#http://127.0.0.1:8000/api/product-list/?/api/products/?page=3&page_size=25

#LimitOffsetPagination
#CursorPagination
# {
    # "count": 21,
    # "next": "http://127.0.0.1:8000/api/product-list/?page=2&page_size=5",
    # "previous": null,
    # "results": [
    #     {

class ProductPagination(PageNumberPagination):
    page_size = 10 # 기본 페이지 크기
    page_size_query_param = "page_size"  # 클라이언트가 지정할 수 있는 파라미터
    max_page_size = 100  # 최대 페이지 크기 제한

# 장고에서 쿼리스트링 필터 만들기
import django_filters
# GET /api/product-list/?category=1&min_price=1000&max_price=3000

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte') # >=
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte') # <=

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price']   

from rest_framework.decorators import action
# ModelViewSet
@extend_schema_view(
    list=extend_schema(
        tags=["product-list_view"],
        description='extend_schema_view 예제 입니다.',
    ),
    create=extend_schema(
        tags=["product-list_view"],
        description='extend_schema_view 예제 입니다.',
    )
)
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    # 정렬/검색 
    # http://127.0.0.1:8000/api/products/?ordering=-price
    # 요청을 가로채서 필터셋(filterset_class)을 확인.
    # 정의된 필드와 비교해 유효한 필터만 추출
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter] # DjangoFilterBackend가 정렬을 한다.

    # 필터 직접 추가
    filterset_class = ProductFilter
    # 필터링 항목 (URL에서 ?category=값 으로 필터링 가능)
    filterset_fields = ['category']
        
    # 정렬 필드 (?ordering=price )
    # http://127.0.0.1:8000/api/product-list/?ordering=-price
    ordering_fields = ['id','price','name']
    ordering = ['id']

    # 검색 필드 (?search=아이폰)
    # Product.objects.filter(name__icontains='컴퓨터')
    search_fields = ['name','description'] # 필요에 따라 수정 가능

    # ViewSet에서 URL 추가. 69번째 강의 참고
    @action(detail=False, methods=['get'], url_path='max-price')
    def max_price(self, request):
        # aggregate 집계 함수
        # select Max('price') as price__max from product 엘리어스를 자동으로 적용한다. 이후 딕셔너리로 리턴한다.
        # {price__max : 3000}
        max_price = Product.objects.aggregate(Max('price'))['price__max'] or 0
        return Response({'max_price': max_price})

