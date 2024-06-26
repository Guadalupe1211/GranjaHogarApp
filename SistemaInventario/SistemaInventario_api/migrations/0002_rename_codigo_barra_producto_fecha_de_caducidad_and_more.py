# Generated by Django 5.0.4 on 2024-04-28 00:27

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("SistemaInventario_api", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="producto",
            old_name="codigo_barra",
            new_name="fecha_de_caducidad",
        ),
        migrations.AlterField(
            model_name="producto",
            name="descripcion",
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name="producto",
            name="precio",
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]
