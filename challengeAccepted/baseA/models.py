from django.db import models

# Create your models here.


class Address(models.Model):

    class Meta:

        db_table = 'addresses'

    street = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True)

    def __str__(self):
        return {"street": self.street, "city": self.city, "country": self.country, "state": self.state}


class User(models.Model):

    class Meta:

        db_table = 'users'

    name = models.CharField(max_length=200)
    second_name = models.CharField(max_length=200)
    cpf = models.CharField(max_length=13)
    address = models.ForeignKey(
        Address, on_delete=models.deletion.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True)

    def __str__(self):
        return {"name": self.name, "last_name": self.second_name, "cpf": self.cpf, "addr_id": self.address}


class Debt(models.Model):

    class Meta:

        db_table = 'debts'

    debt = models.CharField(max_length=200)
    user = models.ForeignKey(
        User, on_delete=models.deletion.PROTECT, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True)

    def __str__(self):
        return {"debt": self.debt}
