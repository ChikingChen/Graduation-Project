# Generated by Django 4.1 on 2024-04-26 13:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0012_delete_commenttable"),
    ]

    operations = [
        migrations.AddField(
            model_name="clinicdoctortable",
            name="patient",
            field=models.ForeignKey(
                default="1196775239@qq.com",
                null=True,
                on_delete=django.db.models.deletion.SET_DEFAULT,
                to="client.accounttable",
                verbose_name="病人",
            ),
        ),
        migrations.DeleteModel(
            name="AppointmentTable",
        ),
    ]
