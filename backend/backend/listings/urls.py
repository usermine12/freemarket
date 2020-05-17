from django.urls import path, include
from rest_framework.routers import DefaultRouter
from listings import views

router = DefaultRouter()
router.register(r'listings', views.ListingViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]
