# Generated by Django 5.0.2 on 2025-01-07 12:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apps_country', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='country',
            name='public_id',
        ),
    ]
