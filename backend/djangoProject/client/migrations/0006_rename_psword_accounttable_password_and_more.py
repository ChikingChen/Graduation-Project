# Generated by Django 4.1 on 2024-04-19 15:31

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0005_alter_codetable_email_alter_codetable_time"),
    ]

    operations = [
        migrations.RenameField(
            model_name="accounttable",
            old_name="psword",
            new_name="password",
        ),
        migrations.RenameField(
            model_name="accounttable",
            old_name="rgtime",
            new_name="register",
        ),
    ]