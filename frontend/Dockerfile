FROM node:14-alpine

WORKDIR /app

ENV PORT 8080
ENV PUBLIC_URL ./todo-app-demo

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package*.json ./
RUN npm install
# RUN npm install react-scripts -g

# copy app files
COPY . .

RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "start-docker"]
