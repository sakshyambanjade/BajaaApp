from django.urls import path
from . import views

urlpatterns = [
    path('live/', views.live_data),
    path('predict-race/', views.predict_race),
    path('driver/<str:driver_id>/stats/', views.driver_stats),
    path('optimize-pit/', views.optimize_pit),
]
