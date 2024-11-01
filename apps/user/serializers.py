""" Imports """
from apps.abstract.serializers import AbstractSerializer
from apps.user.models import User



""" User serializer class """
class UserSerializer(AbstractSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'user_type',
                'email', 'is_active', 'created', 'updated']
        read_only_fields = ['is_active']



