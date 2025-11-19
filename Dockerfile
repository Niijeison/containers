FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install --production

COPY entry-point.sh /entry-point.sh
RUN chmod +x /entry-point.sh

EXPOSE 3000

ENTRYPOINT ["/entry-point.sh"]
