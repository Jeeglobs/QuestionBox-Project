from django.contrib import admin
from .models import User, Question, Answer, StarTracker

admin.site.register(User)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(StarTracker)
