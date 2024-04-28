#from django.shortcuts import render
from rest_framework import viewsets
from .models import Categoria, Producto, MovimientoDeInventario, Departamento, InventarioDepartamento
from .serializers import CategoriaSerializer, ProductoSerializer, MovimientoDeInventarioSerializer, DepartamentoSerializer, InventarioDepartamentoSerializer
#from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions


class CategoriaViewSet(viewsets.ModelViewSet):
    """
    Un viewset para ver, crear, actualizar y eliminar categorías.
    """
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    #permission_classes = [IsAuthenticated, DjangoModelPermissions]

class DepartamentoViewSet(viewsets.ModelViewSet):
    """
    Un viewset para ver, crear, actualizar y eliminar categorías.
    """
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer

class InventarioDepartamentoViewSet(viewsets.ModelViewSet):
    """
    Un viewset para ver, crear, actualizar y eliminar categorías.
    """
    queryset = InventarioDepartamento.objects.all()
    serializer_class = InventarioDepartamentoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    """
    Un viewset para ver, crear, actualizar y eliminar productos.
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def get_queryset(self):
        """
        Opcionalmente restringe los productos a aquellos de una categoría específica,
        pasando un parámetro 'categoria_id' en la URL.
        """
        queryset = super().get_queryset()
        categoria_id = self.request.query_params.get('categoria_id')
        if categoria_id is not None:
            queryset = queryset.filter(categoria_id=categoria_id)
        return queryset

class MovimientoDeInventarioViewSet(viewsets.ModelViewSet):
    """
    Un viewset para ver, crear, actualizar y eliminar movimientos de inventario.
    """
    queryset = MovimientoDeInventario.objects.all()
    serializer_class = MovimientoDeInventarioSerializer
