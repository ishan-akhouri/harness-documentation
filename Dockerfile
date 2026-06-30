FROM node:20-alpine
WORKDIR /app
COPY package.json .
COPY app.js .
RUN npm install --omit=dev && npm cache clean --force
EXPOSE 3000
CMD ["node", "app.js"]
