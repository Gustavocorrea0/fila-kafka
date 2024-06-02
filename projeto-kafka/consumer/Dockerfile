FROM node:14
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
CMD ["sh", "-c", "sleep 20 && node app.js"]