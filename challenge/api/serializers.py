from api.models import User, Address, Debt
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AddressSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class DebtSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Debt
        fields = '__all__'