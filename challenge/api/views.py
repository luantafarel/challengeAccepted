from rest_framework import generics
from .models import User, Address, Debt
from .serializers import UserSerializer, AddressSerializer, DebtSerializer

# Create your views here.
class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
