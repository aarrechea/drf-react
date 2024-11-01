# Generated by Django 5.0.2 on 2024-09-23 18:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps_evaluations', '0008_alter_evaluation_relation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='evaluationscore',
            name='evaluation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaScore', to='apps_evaluations.evaluation'),
        ),
    ]
