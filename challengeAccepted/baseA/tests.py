from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from .models import User
from .serializers import UserSerializer

# tests for views


class BaseViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_user(name="", second_name="", cpf=""):
        if name != "" and second_name != "" and cpf != "":
            User.objects.create(name=name, second_name=second_name,  cpf=cpf)

    def setUp(self):
        # add test data
        self.create_user("test", "test_2", "10900930992")
        # self.create_user("simple user", "konshens")
        # self.create_user("love is wicked", "brick and lace")
        # self.create_user("jam rock", "damien marley")


class GetAllUserTest(BaseViewTest):

    def test_get_all_user(self):
        """
        This test ensures that all user added in the setUp method
        exist when we make a GET request to the user/ endpoint
        """
        # hit the API endpoint
        response = self.client.get(
            reverse("users-all", kwargs={"version": "v1"})
        )
        # fetch the data from db
        expected = User.objects.all()
        serialized = UserSerializer(expected, many=True)
        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)