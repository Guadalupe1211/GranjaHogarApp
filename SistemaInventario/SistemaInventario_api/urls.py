from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProductoViewSet, MovimientoDeInventarioViewSet,DepartamentoViewSet, InventarioDepartamentoViewSet

# Crear un router y registrar nuestros viewsets con él.
router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'movimientos-inventario', MovimientoDeInventarioViewSet)
router.register(r'departamento', DepartamentoViewSet)
router.register(r'inventario-departamento', InventarioDepartamentoViewSet)

# Las URLs del API son ahora determinadas automáticamente por el router.
# Además, incluimos las URLs de login para el API navegable.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
