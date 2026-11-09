FROM nginx:alpine

# Remove a página padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos HTML, CSS e JS para o diretório público do servidor web
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]