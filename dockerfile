# 使用nginx作为基础镜像
FROM nginx

# 移除默认的nginx配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将自定义的nginx配置文件添加到容器中的nginx配置目录中
ADD default.conf /etc/nginx/conf.d/

# 将dist目录下的静态文件复制到nginx默认的网站根目录
COPY dist/ /usr/share/nginx/html/

