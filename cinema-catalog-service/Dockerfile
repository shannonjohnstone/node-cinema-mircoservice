FROM node:8

WORKDIR /usr/app

COPY package.json .
COPY src/ .

# RUN npm install --slient --progress=false --production
RUN npm install --quiet

# CMD ["npm", "start"]
