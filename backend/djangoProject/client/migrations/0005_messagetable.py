# Generated by Django 4.1 on 2024-04-23 17:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0004_appointmenttable_endtime_appointmenttable_starttime"),
    ]

    operations = [
        migrations.CreateModel(
            name="MessageTable",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("time", models.DateTimeField(auto_now_add=True, verbose_name="发送时间")),
                ("content", models.CharField(max_length=300, verbose_name="内容")),
                (
                    "receiver",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="receive",
                        to="client.accounttable",
                        verbose_name="接收者",
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="send",
                        to="client.accounttable",
                        verbose_name="发送者",
                    ),
                ),
            ],
        ),
    ]