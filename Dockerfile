FROM node:23-alpine
EXPOSE 4000
WORKDIR /
COPY . .
RUN npm install
CMD ["npm", "start"]