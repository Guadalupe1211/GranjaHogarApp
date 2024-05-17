# Generated by Django 5.0.4 on 2024-04-28 00:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("SistemaInventario_api", "0006_departamento_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="movimientodeinventario",
            name="departamento_salida",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="SistemaInventario_api.departamento",
            ),
        ),
    ]