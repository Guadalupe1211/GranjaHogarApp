from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=200, unique=True)
    fecha_de_caducidad = models.DateField(null=True, blank =True )
    descripcion = models.TextField(null= True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, null= True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    cantidad_en_stock = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.nombre} ({self.descripcion})"

class Departamento (models.Model):
    nombre=models.CharField (max_length=50, unique=True)
    descripcion= models.CharField (max_length=50)

    def __str__(self):
        return f"{self.nombre} ({self.descripcion})"

class InventarioDepartamento(models.Model):
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad_en_stock = models.IntegerField(default=0)

    class Meta:
        unique_together = ('departamento', 'producto')
        verbose_name = 'Inventario por Departamento'
        verbose_name_plural = 'Inventarios por Departamento'

    def __str__(self):
        return f"{self.producto.nombre} en {self.departamento.nombre}: {self.cantidad_en_stock} unidades"


class MovimientoDeInventario(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    cantidad = models.IntegerField()
    es_entrada = models.BooleanField(default=True, help_text="Marcar verdadero para entradas, falso para salidas.")
    departamento =models.ForeignKey(Departamento, null=True, on_delete= models.CASCADE)

    def __str__(self):
        tipo_movimiento = "Entrada" if self.es_entrada else "Salida"
        return f"{tipo_movimiento} de {self.cantidad} unidades de {self.producto.nombre} el {self.fecha.strftime('%d/%m/%Y')}"

    def save(self, *args, **kwargs):
        if self.es_entrada:
            self.producto.cantidad_en_stock += self.cantidad
            self.departamento = None
            
        else:
            
                # Actualizar el stock en el inventario del departamento
            inventario, _ = InventarioDepartamento.objects.get_or_create(
                departamento=self.departamento,
                producto=self.producto
            )
            
            inventario.cantidad_en_stock += self.cantidad
            """ else:

                inventario.cantidad_en_stock -= self.cantidad """
            inventario.save()

            self.producto.cantidad_en_stock -= self.cantidad
        self.producto.save()

        



        super(MovimientoDeInventario, self).save(*args, **kwargs)



    