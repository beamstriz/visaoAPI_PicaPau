FROM node:18

WORKDIR /user/src/app
RUN apt-get update && apt-get install -y python3 python3-pip
COPY package*.json ./

WORKDIR /user/src/app/python
RUN python3 -m pip install requests beautifulsoup4

# Volte para o diretório raiz
WORKDIR /user/src/app

COPY . .

RUN npm install

CMD npm run serve
