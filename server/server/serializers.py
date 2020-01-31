
from rest_framework import serializers
from .models import *


class PCISerializer(serializers.ModelSerializer):

    class Meta:
        model = PCI
        fields = '__all__'

    def create(self, validated_data):
        pic = PCI.objects.create(**validated_data)
        return pic
