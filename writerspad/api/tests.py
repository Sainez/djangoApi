from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse as api_reverse
from rest_framework.authtoken.admin import Token
from .. import models

User = get_user_model()


class WritersPadApiTestCase(APITestCase):
    def setUp(self):
        # Creating Admin Instance
        user_obj = User(username='amon', email='amon@gmail.com')
        user_obj.set_password('amon')
        user_obj.save()

        # Creating Manager Instance
        manager = models.Manager.objects.create(
            username='Kelly',
            email='kelly@gmail.com',
            password='kelly'
        )

        # Creating Writer Instance
        writer = models.Writer.objects.create(
            username='SavaiSarah',
            email='savaisarah@gmail.com',
            password='savaisarah'
        )

        # Creating Article Instance
        article = models.Article.objects.create(
            author=writer,
            title='Prince With Benefits',
            body='The wind picked up and a few locks of hair got in my face. Annoyed, I swept them away as I '
                 'sighed. White ruffles and pink roses were not my thing. At all. Looking up, I narrowed my eyes at '
                 'the...'
        )

    def test_presence_of_one_admin(self):
        admin_count = User.objects.count()
        self.assertEquals(admin_count, 1)

    def test_presence_of_one_manager(self):
        manager_count = models.Manager.objects.count()
        self.assertEquals(manager_count, 1)

    def test_presence_of_one_writer(self):
        writer_count = models.Writer.objects.count()
        self.assertEquals(writer_count, 1)

    def test_presence_of_one_article(self):
        article_count = models.Article.objects.count()
        self.assertEquals(article_count, 1)

# ============================== Without Authorisation ==========================================================
    # --- List All ---
    def test_list_admin_without_authorisation(self):
        data = {}
        url = api_reverse("writerspad-api:admins")
        response = self.client.get(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_managers_without_authorisation(self):
        data = {}
        url = api_reverse("writerspad-api:managers")
        response = self.client.get(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_writers_without_authorisation(self):
        data = {}
        url = api_reverse("writerspad-api:writers")
        response = self.client.get(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_articles_without_authorisation(self):
        data = {}
        url = api_reverse("writerspad-api:articles")
        response = self.client.get(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # --- Create ---
    def test_create_admin_not_restricted(self):
        data = {"username": "kim", "email": "kim@gmail.com", "password": "kim"}
        url = api_reverse("writerspad-api:adminreg")
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_manager_without_authorisation(self):
        data = {"username": "ian", "email": "ian@gmail.com", "password": "ian"}
        url = api_reverse("writerspad-api:managers")
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_writer_without_authorisation(self):
        data = {"username": "shla", "email": "shla@gmail.com", "password": "shla"}
        url = api_reverse("writerspad-api:writers")
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_article_without_authorisation(self):
        writer = models.Writer.objects.get(pk=1)
        data = {"author": writer.username, "title": "The Cabin", "body": "The silence scared her a lot..."}
        url = api_reverse("writerspad-api:articles")
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # --- Read Single ---
    def test_read_specific_manager_without_authorisation(self):
        data = {}
        manager = models.Manager.objects.first()
        url = manager.get_api_url()
        response = self.client.get(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_read_specific_writer_without_authorisation(self):
        data = {}
        writer = models.Writer.objects.first()
        url = writer.get_api_url()
        response = self.client.get(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_read_specific_article_without_authorisation(self):
        data = {}
        article = models.Article.objects.first()
        url = article.get_api_url()
        response = self.client.get(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # --- Update ---
    def test_update_specific_admin_without_authorisation(self):
        url = api_reverse("writerspad-api:admin", args=[1])
        data = {'username': 'amonnn', 'email': 'amonnnn@gmail.com', 'password': 'amonnnn'}
        response = self.client.put(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_specific_manager_without_authorisation(self):
        manager = models.Manager.objects.first()
        url = manager.get_api_url()
        data = {'username': 'Kellyy', 'email': 'Kellyy@gmail.com', 'password': 'Kellyy'}
        response = self.client.put(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_specific_writer_without_authorisation(self):
        writer = models.Writer.objects.first()
        url = writer.get_api_url()
        data = {'username': 'SarahSavai', 'email': 'sarahsavai@gmail.com', 'password': 'sarah'}
        response = self.client.put(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_specific_article_without_authorisation(self):
        writer = models.Writer.objects.get(pk=1)
        article = models.Article.objects.first()
        url = article.get_api_url()
        data = {"author": writer.username, "title": "Out of the Blue", "body": "The silence scared her a lot..."}
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # --- Delete ---
    def test_delete_specific_admin_without_authorisation(self):
        url = api_reverse("writerspad-api:admin", args=[1])
        response = self.client.delete(url)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_specific_manager_without_authorisation(self):
        manager = models.Manager.objects.first()
        url = manager.get_api_url()
        response = self.client.delete(url)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_specific_writer_without_authorisation(self):
        writer = models.Writer.objects.first()
        url = writer.get_api_url()
        response = self.client.delete(url)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_specific_article_without_authorisation(self):
        article = models.Article.objects.first()
        url = article.get_api_url()
        response = self.client.delete(url)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

# ============================== With Authorisation ==========================================================
    # --- Login ---

    def test_Admin_login(self):

        data = {
            'username': 'amon',
            'email': 'amon@gmail.com',
            'password': 'amon'
        }
        url = api_reverse('writerspad-api:auth')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_Manager_login(self):
        url = api_reverse('writerspad-api:managerlogin', args=['Kelly', 'kelly'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_Writer_login(self):
        url = api_reverse('writerspad-api:writerlogin', args=['SavaiSarah', 'savaisarah'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # --- List All ---
    def test_list_admin_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        url = api_reverse("writerspad-api:admins")
        # self.client.force_authenticate(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_list_managers_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        url = api_reverse("writerspad-api:managers")
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_list_writers_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        url = api_reverse("writerspad-api:writers")
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_list_articles_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        url = api_reverse("writerspad-api:articles")
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    # Create

    def test_create_manager_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        data = {"username": "ian", "email": "ian@gmail.com", "password": "ian"}
        url = api_reverse("writerspad-api:managers")
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_writer_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        data = {"username": "shla", "email": "shla@gmail.com", "password": "shla"}
        url = api_reverse("writerspad-api:writers")
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_article_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        writer = models.Writer.objects.get(pk=1)
        data = {"author": writer.username, "title": "The Cabin", "body": "The silence scared her a lot..."}
        url = api_reverse("writerspad-api:articles")
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # --- Update ---
    def test_update_specific_admin_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        url = api_reverse("writerspad-api:admin", args=[1])
        data = {'username': 'amonnn', 'email': 'amonnnn@gmail.com', 'password': 'amonnn'}
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.put(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_update_specific_manager_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        manager = models.Manager.objects.first()
        url = manager.get_api_url()
        data = {'username': 'Kellyy', 'email': 'Kellyy@gmail.com', 'password': 'Kellyy'}
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.put(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_update_specific_writer_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        writer = models.Writer.objects.first()
        url = writer.get_api_url()
        data = {'username': 'SavaiSarah', 'email': 'sarahsavai@gmail.com', 'password': 'sarah'}
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.put(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_update_specific_article_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        writer = models.Writer.objects.first()
        article = models.Article.objects.first()
        url = article.get_api_url()
        data = {"author": writer.username, "title": "Out of the Blue", "body": "The silence scared her a lot..."}
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.put(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    # --- Delete ---
    def test_delete_specific_admin_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        url = api_reverse("writerspad-api:admin", args=[1])
        response = self.client.delete(url)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_specific_manager_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        manager = models.Manager.objects.first()
        url = manager.get_api_url()
        response = self.client.delete(url)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_specific_writer_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        writer = models.Writer.objects.first()
        url = writer.get_api_url()
        response = self.client.delete(url)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_specific_article_with_authorisation(self):
        user = User.objects.first()
        token = Token.objects.get_or_create(user=user)
        token = str(token[0])
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        article = models.Article.objects.first()
        url = article.get_api_url()
        response = self.client.delete(url)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
