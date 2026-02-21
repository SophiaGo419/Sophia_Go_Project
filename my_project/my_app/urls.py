from django.contrib import admin
from django.urls import path
from .views import EmployeeListCreateAPIView, ProjectListCreateAPIView, DepartmentListCreateAPIView, EmployeeRetrieveUpdateDestroyAPIView, ProjectRetrieveUpdateDestroyAPIView, DepartmentRetrieveUpdateDestroyAPIView

urlpatterns = [

    path('employee/', EmployeeListCreateAPIView.as_view(), name='employee-list-create'),
    path('employee/<int:pk>/', EmployeeRetrieveUpdateDestroyAPIView.as_view(), name='employee-detail'),

    path('project/', ProjectListCreateAPIView.as_view(), name='project-list-create'),
    path('project/<int:pk>/', ProjectRetrieveUpdateDestroyAPIView.as_view(), name='project-detail'),

     path('department/', DepartmentListCreateAPIView.as_view(), name='department-list-create'),
    path('department/<int:pk>/', DepartmentRetrieveUpdateDestroyAPIView.as_view(), name='department-detail'),

]
