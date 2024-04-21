# Generated by Django 4.1 on 2024-04-21 08:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0007_clinictable"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="accounttable",
            options={"verbose_name": "账号", "verbose_name_plural": "账号"},
        ),
        migrations.AlterModelOptions(
            name="citycountytable",
            options={"verbose_name": "县", "verbose_name_plural": "县"},
        ),
        migrations.AlterModelOptions(
            name="citytable",
            options={"verbose_name": "城市", "verbose_name_plural": "城市"},
        ),
        migrations.AlterModelOptions(
            name="clinictable",
            options={"verbose_name": "诊所", "verbose_name_plural": "诊所"},
        ),
        migrations.AlterModelOptions(
            name="codetable",
            options={"verbose_name": "验证码", "verbose_name_plural": "验证码"},
        ),
        migrations.AlterField(
            model_name="accounttable",
            name="password",
            field=models.CharField(max_length=300, verbose_name="密码"),
        ),
    ]
