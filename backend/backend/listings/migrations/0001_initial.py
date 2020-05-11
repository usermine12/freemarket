# Generated by Django 3.0.6 on 2020-05-11 10:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField()),
                ('title', models.CharField(max_length=25, unique=True)),
                ('description', models.TextField(max_length=1000)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('postal_code', models.IntegerField()),
            ],
            options={
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('display_name', models.CharField(max_length=25, unique=True)),
                ('full_name', models.CharField(max_length=25)),
                ('email', models.EmailField(max_length=254)),
                ('description', models.TextField(max_length=1000, null=True)),
                ('website', models.URLField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feedback', models.CharField(choices=[('POSITIVE', 'positive'), ('NEUTRAL', 'neutral'), ('NEGATIVE', 'negative')], default='NEGATIVE', max_length=8)),
                ('review', models.TextField(max_length=200)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='given_reviews', to='listings.User')),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='listings.User')),
            ],
            options={
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('question', models.CharField(max_length=200)),
                ('reply', models.TextField(max_length=1000, null=True)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='listings.User')),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='listings.Listing')),
            ],
            options={
                'ordering': ['created'],
            },
        ),
        migrations.AddField(
            model_name='listing',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listings', to='listings.User'),
        ),
    ]
