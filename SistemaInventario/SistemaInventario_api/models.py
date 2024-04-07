from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    codigo_barra = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    cantidad_en_stock = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.nombre} ({self.codigo_barra})"

class MovimientoDeInventario(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    cantidad = models.IntegerField()
    es_entrada = models.BooleanField(default=True, help_text="Marcar verdadero para entradas, falso para salidas.")

    def __str__(self):
        tipo_movimiento = "Entrada" if self.es_entrada else "Salida"
        return f"{tipo_movimiento} de {self.cantidad} unidades de {self.producto.nombre} el {self.fecha.strftime('%d/%m/%Y')}"

    def save(self, *args, **kwargs):
        if self.es_entrada:
            self.producto.cantidad_en_stock += self.cantidad
        else:
            self.producto.cantidad_en_stock -= self.cantidad
        self.producto.save()
        super(MovimientoDeInventario, self).save(*args, **kwargs)
