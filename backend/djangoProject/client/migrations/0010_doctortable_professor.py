# Generated by Django 4.1 on 2024-04-26 08:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0009_messagetable_type"),
    ]

    operations = [
        migrations.AddField(
            model_name="doctortable",
            name="professor",
            field=models.BooleanField(default=True),
        ),
    ]
