# Generated by Django 5.0.2 on 2024-10-08 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps_evaluations', '0012_evaluationcapabilityscore_count_competence'),
    ]

    operations = [
        migrations.AlterField(
            model_name='evaluationcapabilityscore',
            name='count_competence',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
    ]
