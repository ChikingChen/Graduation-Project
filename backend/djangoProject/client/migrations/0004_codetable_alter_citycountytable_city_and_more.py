# Generated by Django 4.1 on 2024-04-19 13:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0003_citycountytable_citycountytable_uniquecitycounty"),
    ]

    operations = [
        migrations.CreateModel(
            name="CodeTable",
            fields=[
                (
                    "email",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        serialize=False,
                        to="client.accounttable",
                        verbose_name="用户名",
                    ),
                ),
                ("code", models.CharField(max_length=100, verbose_name="验证码")),
                ("time", models.DateTimeField(verbose_name="输入时间")),
            ],
        ),
        migrations.AlterField(
            model_name="citycountytable",
            name="city",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="client.citytable",
                verbose_name="城市",
            ),
        ),
        migrations.AlterField(
            model_name="citycountytable",
            name="county",
            field=models.CharField(max_length=5, verbose_name="县"),
        ),
    ]