# Generated by Django 4.1.7 on 2023-03-30 14:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questionbox', '0006_question_accepted_answer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='accepted_answer',
        ),
    ]