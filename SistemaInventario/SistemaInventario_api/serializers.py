from rest_framework import serializers
from .models import Categoria, Producto, MovimientoDeInventario

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class MovimientoDeInventarioSerializer(serializers.ModelSerializer):
    # Puedes usar un serializador anidado para mostrar detalles del producto
    # en lugar de solo su ID. Esto es opcional.
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='producto', write_only=True)

    class Meta:
        model = MovimientoDeInventario
        fields = '__all__'
