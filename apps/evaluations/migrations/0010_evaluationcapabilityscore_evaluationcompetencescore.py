# Generated by Django 5.0.2 on 2024-10-07 12:51

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps_evaluations', '0009_alter_evaluationscore_evaluation'),
    ]

    operations = [
        migrations.CreateModel(
            name='EvaluationCapabilityScore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public_id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('competence', models.IntegerField()),
                ('capability', models.IntegerField()),
                ('score', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('evaluation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_capability', to='apps_evaluations.evaluation')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='EvaluationCompetenceScore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public_id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('competence', models.IntegerField()),
                ('score', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('evaluation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_competence', to='apps_evaluations.evaluation')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
