# Generated by Django 5.0.2 on 2024-08-15 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps_relations', '0014_alter_relationtree_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relation',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Relation name'),
        ),
    ]
