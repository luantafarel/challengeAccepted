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
    deleted_at = models.DateTimeField()

    def __str__(self):
        return '%s %s %s %s' % (self.street, self.city, self.country, self.state)


class User(models.Model):

    class Meta:

        db_table = 'users'

    name = models.CharField(max_length=200)
    second_name = models.CharField(max_length=200)
    cpf = models.CharField(max_length=13)
    address = models.ForeignKey(Address, on_delete=models.deletion.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField()

    def __str__(self):
        return '%s %s' % (self.name, self.second_name)


class Debt(models.Model):

    class Meta:

        db_table = 'debts'

    debt = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.deletion.PROTECT, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField()

    def __str__(self):
        return self.debt
