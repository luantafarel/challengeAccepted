from rest_framework import generics
from rest_framework.response import Response
from .models import User, Debt, Address
from .serializers import UserSerializer
from django.http import Http404
from django.shortcuts import render
from django.core import serializers
from django.http.response import HttpResponse
from django.core.serializers import serialize
from django.utils.functional import Promise
from django.utils.encoding import force_text
from django.views import generic
from django.core.serializers.json import DjangoJSONEncoder
import json


class ListUserView(generic.ListView):
    """
    Provides a get method handler.
    """

    template_name = "index.html"

    def get_queryset(self):
        if self.request.method == 'GET':
            queryset = User.objects.all()

            cpf = self.request.GET.get('cpf', None)
            if cpf is not None:
                # .values_list('address__street', 'address__country',
                queryset = queryset.filter(cpf=cpf).select_related('address')
                if len(queryset) is not 0:
                    for q in queryset:
                        address = q.address
                        debts = Debt.objects.filter(user=q.id)
                        response = render(self.request, 'index.html', {
                                          'response': {'user': queryset, 'address': address, 'debts': debts}}, content_type='application/json')
                    # response = force_text(
                    #     {'user': queryset, 'address': address, 'debts': debts})
                    return json.dumps({'response': {'user': queryset, 'address': address, 'debts': debts}})
                else:
                    raise Http404
            else:
                raise Http404
