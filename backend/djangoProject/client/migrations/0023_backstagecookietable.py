# Generated by Django 4.1 on 2024-05-09 12:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0022_backstageaccounttable"),
    ]

    operations = [
        migrations.CreateModel(
            name="BackstageCookieTable",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("cookie", models.CharField(max_length=6, verbose_name="cookie")),
                (
                    "account",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="client.backstageaccounttable",
                        verbose_name="账号",
                    ),
                ),
            ],
            options={
                "verbose_name": "后台Cookie",
                "verbose_name_plural": "后台Cookie",
            },
        ),
    ]