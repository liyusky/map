> 通过ipconfig 获取 IPv4 地址(e.g: 192.168.1.33)
> 进入client文件夹下   
  1. 找到client下18行
  `"start": "set PORT=3000 HOST=192.168.1.33 && react-scripts start"`
  修改 192.168.1.33 为查询中的IPv4
  2. 打开cmd, 输入指令 `npm install`，安装模块
  3. 安装完成后 npm run start 启动前端项目
> 进入 server/server 文件夹下   
  1. 找到 settings.py   
>>    82行   
      `DATABASES = {
          'default': {
              'ENGINE': 'django.db.backends.mysql',
              'NAME': 'map',
              'USER': 'root',
              'PASSWORD': '123456',
              'HOST': '127.0.0.1',
              'PORT': '3306',
          }
      }`
      自己修改数据库 (mysql)   
>>    112行 `ALLOWED_HOSTS = ['192.168.1.33']` 修改 192.168.1.33 为查询中的IPv4
  2. pip install Django
  3. pip install mysqlclient
  4. pip install djangorestframework
  5. pip install django-cors-headers
  6. pip install xlrd
  6. 打开cmd (在外层server打开)   
    1. python manage.py makemigrations server 
    2. python manage.py migrate 
    3. 输入指令 python manage.py runserver 192.168.1.33:8080 (192.168.1.33 换为 IPv4 地址)