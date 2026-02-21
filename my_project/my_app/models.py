from django.db import models

# Create your models here.

class Employee (models.Model):
    full_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    role = models.CharField(max_length = 50)

    def __str__(self):
        return (self.full_name)

class Project (models.Model):
    project_name = models.CharField(max_length = 50)
    date_created = models.DateField(auto_now_add=True)
    description = models.CharField(max_length = 100)

    def __str__(self):
        return (self.project_name)

class Department (models.Model):
    department_name = models.CharField(max_length=50)
    location = models.CharField(max_length=100)

    def __str__(self):
        return (self.department_name)
