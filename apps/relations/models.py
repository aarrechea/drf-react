""" Imports """
from django.db import models
from apps.abstract.models import AbstractModel
from apps.element.models import Element



""" Relation model """
class Relation(AbstractModel):
    name = models.CharField(max_length=255, verbose_name='Relation name', unique=True, blank=False, null=False)
    total_elements = models.IntegerField(default=0)
    competences = models.SmallIntegerField(default=0, verbose_name='Competences')
    capabilities = models.SmallIntegerField(default=0, verbose_name='Capabilities')
    processes = models.IntegerField(default=0, verbose_name='Processes')
    eva_made = models.IntegerField(default=0, verbose_name='Evaluations made')
    eva_progress = models.IntegerField(default=0, verbose_name='Evaluations in progress')    
    user_creator = models.ForeignKey(to="apps_user.User", on_delete=models.CASCADE)   
    comments = models.CharField(max_length=255, verbose_name="Comments", default="None")
    status = models.BooleanField(default=0) # whether the relation is open or close
    
    class Meta:
        verbose_name = 'Relation'
        verbose_name_plural = 'Relations'
        ordering = ('name', 'eva_made', 'eva_progress', 'status')
        db_table = "apps.relation"



""" Relation tree holds each element in the relation with its respective information """
class RelationTree(models.Model):
    order = models.IntegerField()
    capability_number = models.CharField()
    process_number = models.CharField()
    percentage = models.DecimalField(decimal_places=2, max_digits=5)
    element_type = models.SmallIntegerField()
    relation_letter = models.SmallIntegerField()
    relation_letter_display = models.CharField()
    element = models.ForeignKey(Element, on_delete=models.CASCADE, related_name='element')
    relation = models.ForeignKey(Relation, on_delete=models.CASCADE, related_name='relation_tree')
    related_capability = models.IntegerField(null=True, blank=True)
    related_competence = models.IntegerField(null=True, blank=True)
    
            
    class Meta:
        ordering = ('relation', 'order')
        db_table = "apps.relation_tree"




