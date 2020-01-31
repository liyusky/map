通过 ipconfig 获取 IPv4 地址(e.g: 192.168.1.33)
修改 client 下18行  "start": "set PORT=3000 HOST=192.168.1.33 && react-scripts start" 中的 HOST 为查询中的IPv4
进入 client 文件夹下  使用cmd, 输入指令 npm install，安装完成后 npm run start 启动前端项目
进入 server 文件夹下 cmd 指令 python manage.py runserver ip:8080 (ip换为IPv4 地址)