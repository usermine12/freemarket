# Generated by Django 3.0.6 on 2020-05-10 21:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0003_auto_20200510_2122'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listing',
            name='questions',
        ),
        migrations.RemoveField(
            model_name='user',
            name='feedback',
        ),
        migrations.RemoveField(
            model_name='user',
            name='listings',
        ),
        migrations.AddField(
            model_name='question',
            name='listing',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='listings.Listing'),
        ),
        migrations.AddField(
            model_name='review',
            name='target',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='listings.User'),
        ),
        migrations.AlterField(
            model_name='listing',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='listings', to='listings.User'),
        ),
        migrations.AlterField(
            model_name='review',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='given_reviews', to='listings.User'),
        ),
    ]
