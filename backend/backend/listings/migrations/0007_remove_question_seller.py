# Generated by Django 3.0.6 on 2020-05-18 16:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0006_auto_20200518_1900'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='seller',
        ),
    ]
