#from django.shortcuts import render
from rest_framework import viewsets
from .models import Categoria, Producto, MovimientoDeInventario
from .serializers import CategoriaSerializer, ProductoSerializer, MovimientoDeInventarioSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    """
    Un viewset para ver, crear, actualizar y eliminar categorías.
    """
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    """
    Un viewset para ver, crear, actualizar y eliminar productos.
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class MovimientoDeInventarioViewSet(viewsets.ModelViewSet):
    """
    Un viewset para ver, crear, actualizar y eliminar movimientos de inventario.
    """
    queryset = MovimientoDeInventario.objects.all()
    serializer_class = MovimientoDeInventarioSerializer
