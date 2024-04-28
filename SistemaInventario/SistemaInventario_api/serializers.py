from rest_framework import serializers
from .models import Categoria, Producto, MovimientoDeInventario, Departamento,InventarioDepartamento

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'

class InventarioDepartamentoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='producto', write_only=True)
    
    class Meta:
        model = InventarioDepartamento
        fields = ['id', 'producto', 'producto_id', 'departamento', 'cantidad_en_stock']


class MovimientoDeInventarioSerializer(serializers.ModelSerializer):
    # Puedes usar un serializador anidado para mostrar detalles del producto
    # en lugar de solo su ID. Esto es opcional.
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='producto', write_only=True)
    
    def create(self, validated_data):
        movimiento = MovimientoDeInventario(**validated_data)
        movimiento.save()
        return movimiento

    class Meta:
        model = MovimientoDeInventario
        fields = '__all__'
