
import os
from whitenoise import WhiteNoise
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mythonproject.settings')

application = get_wsgi_application()
application = WhiteNoise(application, root='/mythonproject/writerspad/static/writerspad/')
