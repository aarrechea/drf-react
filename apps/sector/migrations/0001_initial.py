# Generated by Django 5.0.2 on 2025-01-06 22:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('apps_supersector', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sector',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('supersector', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sectors', to='apps_supersector.supersector')),
            ],
        ),
    ]
