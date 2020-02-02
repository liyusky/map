from django.db import models
import uuid

class PCI(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    derication = models.CharField(max_length=200)
    number = models.CharField(max_length=200)
    width = models.FloatField(default=0)
    length = models.FloatField(default=0)

    alligatorCrackSlightly = models.FloatField(default=0) ## 龟裂 轻
    alligatorCrackIntermediate = models.FloatField(default=0)  ## 龟裂 中
    alligatorCrackSerious = models.FloatField(default=0)  ## 龟裂 重

    netShapedCrackSlightly = models.FloatField(default=0) ## 块状裂缝 轻
    netShapedCrackSerious = models.FloatField(default=0)  ## 块状裂缝 重

    longitudinalCrackSlightly = models.FloatField(default=0) ## 纵向裂缝 轻
    longitudinalCrackSerious = models.FloatField(default=0)  ## 纵向裂缝 重

    transverseCrackSlightly = models.FloatField(default=0) ## 横向裂缝 轻
    transverseCrackSerious = models.FloatField(default=0)  ## 横向裂缝 重

    pitSlotSlightly = models.FloatField(default=0) ## 坑槽 轻
    pitSlotSerious = models.FloatField(default=0)  ## 坑槽 重

    looseCrackSlightly = models.FloatField(default=0) ##  松散 轻
    looseCrackSerious = models.FloatField(default=0)  ##  松散 重


    subsidenceSlightly = models.FloatField(default=0) ##  沉陷 轻
    subsidenceSerious = models.FloatField(default=0)  ##  沉陷 重

    rutSlightly = models.FloatField(default=0) ##  车辙 轻
    rutSerious = models.FloatField(default=0)  ##  车辙 重

    wavePackSlightly = models.FloatField(default=0) ##  波浪拥包 轻
    wavePackSerious = models.FloatField(default=0)  ##  波浪拥包 重

    bleed = models.FloatField(default=0) ##  泛油
    repair = models.FloatField(default=0) ##  修补

    keepAlive = models.BooleanField(default=True) 
