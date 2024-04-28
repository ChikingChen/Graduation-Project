# Generated by Django 4.1 on 2024-04-26 14:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0013_clinicdoctortable_patient_delete_appointmenttable"),
    ]

    operations = [
        migrations.CreateModel(
            name="AppointmentTable",
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
                ("date", models.DateField(verbose_name="日期")),
                ("starttime", models.TimeField(verbose_name="开始时间")),
                ("endtime", models.TimeField(verbose_name="结束时间")),
                ("appointment", models.BooleanField(default=0, verbose_name="是否被预约")),
                (
                    "clinic",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="client.clinictable",
                        verbose_name="诊所",
                    ),
                ),
                (
                    "doctor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="client.doctortable",
                        verbose_name="医生",
                    ),
                ),
                (
                    "patient",
                    models.ForeignKey(
                        default="chiking0718@163.com",
                        null=True,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        to="client.accounttable",
                        verbose_name="病人",
                    ),
                ),
            ],
            options={
                "verbose_name": "诊所医生",
                "verbose_name_plural": "诊所医生",
            },
        ),
        migrations.DeleteModel(
            name="ClinicDoctorTable",
        ),
        migrations.AddConstraint(
            model_name="appointmenttable",
            constraint=models.UniqueConstraint(
                fields=("clinic", "doctor", "date", "starttime", "endtime"),
                name="uniqueClinicDoctor",
            ),
        ),
    ]
