from django.db import models

class Race(models.Model):
    season = models.IntegerField()
    round = models.IntegerField()
    name = models.CharField(max_length=200)
    circuit = models.CharField(max_length=200)
    date = models.DateField()
    
    class Meta:
        unique_together = ('season', 'round')
        ordering = ['season', 'round']
    
    def __str__(self):
        return f"{self.season} - Round {self.round}: {self.name}"

class Driver(models.Model):
    driver_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    number = models.IntegerField()
    team = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name} ({self.number})"

class Session(models.Model):
    """F1 Session (Practice, Qualifying, Race)"""
    race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='sessions')
    session_type = models.CharField(max_length=20)  # 'FP1', 'FP2', 'FP3', 'Q', 'R'
    date = models.DateTimeField()
    
    class Meta:
        unique_together = ('race', 'session_type')
    
    def __str__(self):
        return f"{self.race} - {self.session_type}"

class TelemetryData(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='telemetry', null=True, blank=True)
    driver_number = models.IntegerField()
    lap_number = models.IntegerField()
    lap_time = models.FloatField(null=True, blank=True)
    sector1_time = models.FloatField(null=True, blank=True)
    sector2_time = models.FloatField(null=True, blank=True)
    sector3_time = models.FloatField(null=True, blank=True)
    speed_trap = models.FloatField(null=True, blank=True)
    compound = models.CharField(max_length=20, null=True, blank=True)
    tyre_life = models.IntegerField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['lap_number']
    
    def __str__(self):
        return f"Driver {self.driver_number} - Lap {self.lap_number}"
