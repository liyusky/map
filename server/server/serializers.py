
from rest_framework import serializers
from .models import *


class PCISerializer(serializers.ModelSerializer):

    class Meta:
        model = PCI
        fields = '__all__'

    def create(self, validated_data):
        pic = PCI.objects.create(**validated_data)
        return pic

    def update(self, instance, validated_data):
        print(validated_data)
        instance.update(**validated_data)
        return instance
