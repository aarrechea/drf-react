""" Imports """
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from apps.abstract.models import AbstractManager, AbstractModel



""" User manager """
class UserManager(BaseUserManager, AbstractManager):                
    def create_user(self, email, password=None, **kwargs):        
        if email is None:
            raise TypeError("User must have an email")
        if password is None:
            raise TypeError("User must have a password")
                        
        user = self.model(email=self.normalize_email(email), **kwargs)        
        user.set_password(password)
        user.save(using=self._db)
        
        return user
        
        
    def create_superuser(self, email, password, **kwargs):        
        if email is None:
            raise TypeError("User must have an email")
        if password is None:
            raise TypeError("User must have a password")
        
        user = self.create_user(email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True        
        user.user_type = 1
        user.save(using=self._db)
        
        return user



""" User model """
class User(AbstractModel, AbstractBaseUser, PermissionsMixin):
    USER_TYPE = (
        ('1', 'ADMIN'),
        ('2', 'SUPER_USER'),
        ('3', 'GENERAL_USER')
    )
    
    public_id = models.UUIDField(db_index=True, unique=True, default=uuid.uuid4, editable=False)    
    email = models.EmailField(db_index=True, max_length=100, unique=True, default="def@email.com")
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    eva_closed = models.SmallIntegerField(default=0)
    eva_in_progress = models.SmallIntegerField(default=0)
    user_type = models.CharField(max_length=12, choices=USER_TYPE, default='3')
    photo = models.ImageField(null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
            
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
                                
    """ def __str__(self):
        return  """
                        
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
                
    @property
    def total_evaluations(self):
        return self.evaluation_in_progress + self.evaluation_closed


