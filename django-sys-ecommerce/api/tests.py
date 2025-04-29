from django.test import TestCase
import pickle

# Create your tests here.


# dev_28 시리얼라이제이션의 이해
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.area = width * height


def add(num1, num2):
    return num1 + num2


def sub(num1, num2):
    return num1 - num2


class ObjectAPITest(TestCase):
    def setUp(self):
        pass

    def test_path(self):
        dict = {
            "add": add,
            "sub": sub,
        }
        url = "add"
        print(dict[url](1, 2))
        print(dict["sub"](2, 1))

    # 사각형 rect 객체를 직렬화 (Serialization)
    def test_serialization(self):
        rect = Rectangle(10, 20)

        with open(
            "rect.data", "wb"
        ) as f:  # open은 rect.data 를 열어서 wb(write binary)로 저장한다.
            pickle.dump(
                rect, f
            )  # pickel이 직렬화 함수. rect 클래스 객체를 f에 직렬화 하여 저장(바이너리)

        # 역직렬화 (Deserialization)
        with open("rect.data", "rb") as f:
            r = pickle.load(f)

        print(r.width, r.height)


from rest_framework.views import APIView
from store.models import Category
from api.serializers.category_serializers import (
    CategorySerializer,
    CategorySimpleSerializer,
)
from rest_framework import status
from rest_framework.response import Response


class CategoriesAPI(APIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    simple_serializer_class = CategorySimpleSerializer

    def get_queryset(self):
        return self.queryset

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    def get_simple_serializer(self, *args, **kwargs):
        return self.simple_serializer_class(*args, **kwargs)

    def get(self, request):
        categories = self.get_queryset()
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.get_simple_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        # 예: id를 request에서 받았다고 가정
        category_id = request.data.get("id")
        try:
            category = self.get_queryset().get(id=category_id)
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_simple_serializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        category_id = request.data.get("id")
        try:
            category = self.get_queryset().get(id=category_id)
            category.delete()
            return Response(
                {"message": "Category deleted"}, status=status.HTTP_204_NO_CONTENT
            )
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND
            )


from django.test import TestCase
from django.contrib.auth.hashers import make_password, check_password
# 서명(Signature) 테스트
from django.core.signing import Signer, BadSignature   

class HashEncryptionTestCase(TestCase):

    #단방향 해시 테스트#
    def test_one_way_hash(self):
        original_password = "1234"

        #비밀번호 해시 
        hashed_password = make_password(original_password)
        print("암호화 확인", hashed_password)
        
        # 해시된 값은 원본과 다름
        self.assertNotEqual(original_password,hashed_password) # 두개가 달라야 참

        # check_password로만 원본과 같은지 검증 가능
        isTrue =  check_password(original_password,hashed_password)
        print(isTrue)
    
    # 서명(signing) 테스트 코드
    
    #서명된값: my-secret-data:bDMOijmfGwA6uqlTYNhj-A5d61Lo933w02gZ3Wc3cZI
    #복원된 값 my-secret-data
    #원본 데이터 --[HMAC-SHA256+base64]--> 서명(signature)  
    #=> 저장: "원본:서명"

    #검증할 때는:
    #"원본"을 다시 서명 --> 비교 --> 다르면 BadSignature 예외
    def test_signing(self):
        signer = Signer()
        
        # 데이터에 서명
        #sign()
        #value에 대해 HMAC-SHA256 해시 생성
        #해시를 base64 인코딩
        #원본 + 해시를 합쳐서 리턴

        original_value = "my-secret-data"
        signed_value = signer.sign(original_value)

        print("서명된값:", signed_value)

        # 서명된 값을 검증 및 복원
        #unsign()
        #전달받은 signed_value를 쪼개서 (value, signature)
        #value를 다시 해싱해서 기존 signature랑 비교
        #다르면 BadSignature 에러 발생
        unsigned_value = signer.unsign(signed_value)

        print("복원된 값", unsigned_value)