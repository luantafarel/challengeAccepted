from rest_framework import serializers
from .models import User, Debt, Address
from django.db import models


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("street", "city", "state", "country")


class DebtSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("debt")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        address = AddressSerializer(many=True)
        debts = DebtSerializer(many=True)
        fields = ("name", "second_name", "cpf", "address_id", address, debts)
