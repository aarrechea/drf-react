# Generated by Django 5.0.2 on 2024-07-28 20:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apps_companies', '0002_alter_company_public_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='bussines_description',
            new_name='business_description',
        ),
    ]
