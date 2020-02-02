from django.http import HttpResponse
from rest_framework.parsers import JSONParser

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .response_content import ResponseContent
from .serializers import PCISerializer
from .models import *
import xlrd

class Test(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):
        response = ResponseContent(code=200, description=10000)
        state = status.HTTP_200_OK

        try:
            pci = PCI.objects.filter(keepAlive=True)
            serializer = PCISerializer(pci, many=True)
            response.data = serializer.data
        except Exception as e:
            response.refresh(code=10500, description=10500, error=e.__str__())
            state = status.HTTP_500_INTERNAL_SERVER_ERROR

        return Response(response.content(), status=state)

    def post(self, request, *args, **kwargs):
        response = ResponseContent(code=200, description=10001)
        state = status.HTTP_200_OK
        excel = request.FILES.get('file', None)

        data = xlrd.open_workbook(filename=excel.name.split('.')[0], file_contents=excel.read())
        data.sheet_names()
        table = data.sheet_by_name('PCI(5210)')
        fileds = ['name', 'derication', 'number', 'width', 'length', 'alligatorCrackSlightly', 'alligatorCrackIntermediate', 'alligatorCrackSerious', 'netShapedCrackSlightly', 'netShapedCrackSerious', 'longitudinalCrackSlightly', 'longitudinalCrackSerious', 'transverseCrackSlightly', 'transverseCrackSerious', 'pitSlotSlightly', 'pitSlotSerious', 'looseCrackSlightly', 'looseCrackSerious', 'subsidenceSlightly', 'subsidenceSerious', 'rutSlightly', 'rutSerious', 'wavePackSlightly', 'wavePackSerious', 'bleed', 'repair']
        content = []
        for i in range(5, table.nrows):
            row = table.row_values(i)
            record = {}
            for i in range(len(fileds)):
                record[fileds[i]] = row[i]
            serializer = PCISerializer(data=record, partial=True)
            if serializer.is_valid():
                serializer.save()
            else:
                response.refresh(code=11000, description=11000, error=serializer.errors)
                state = status.HTTP_501_NOT_IMPLEMENTED

        return Response(response.content(), status=state)


    def patch(self, request, *args, **kwargs):
        response = ResponseContent(code=200, description=10002)
        state = status.HTTP_200_OK
        pci = PCI.objects.filter(id=request.data['id'])
        serializer = PCISerializer(pci, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            response.refresh(code=10502, description=10502, error=serializer.errors)
            state = status.HTTP_500_INTERNAL_SERVER_ERROR

        return Response(response.content(), status=state)


    def delete(self, request, *args, **kwargs):
        response = ResponseContent(code=200, description=10003)
        state = status.HTTP_200_OK
        pci = PCI.objects.filter(id=request.data['id'])
        serializer = PCISerializer(pci, data={'keepAlive': False}, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            response.refresh(code=10503, description=10503, error=serializer.errors)
            state = status.HTTP_500_INTERNAL_SERVER_ERROR

        return Response(response.content(), status=state)

    def put(self, request, *args, **kwargs):
        response = ResponseContent(code=200, description=10004)
        state = status.HTTP_200_OK
        serializer = PCISerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response.data = serializer.data
        else:
            response.refresh(code=10504, description=10504, error=serializer.errors)
            state = status.HTTP_500_INTERNAL_SERVER_ERROR

        return Response(response.content(), status=state)





