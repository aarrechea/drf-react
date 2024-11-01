# Generated by Django 5.0.2 on 2024-08-29 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps_evaluations', '0004_alter_datamodel_plans_to_export'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='datamodel',
            name='plans_to_export',
            field=models.SmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='datamodel',
            name='plans_to_export',
            field=models.BooleanField(default=0),
        ),        
    ]
