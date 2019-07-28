from django.db import models

# Create your models here.


class User(models.Model):

    class Meta:

        db_table = 'users'

    name = models.CharField(max_length=200)
    second_name = models.CharField(max_length=200)
    cpf = models.CharField(max_length=13)
    address_id = models.IntegerField()

    def __str__(self):
        return self.name

class Address(models.Model):

    class Meta:

        db_table = 'addresses'

    street = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    country = models.CharField(max_length=200)

    def __str__(self):
        return self.street

class Debt(models.Model):

    class Meta:

        db_table = 'debts'

    debt = models.CharField(max_length=200)
    user_id = models.IntegerField()

    def __str__(self):
        return self.debt
