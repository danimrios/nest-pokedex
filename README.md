<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# ejecutar en desarrollo
1. clonar el repositorio
2. ejecutar
```
yarn install

```
3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli

```

4. levantar la base de datos 

```
doker compose up -d

```
5. clonar el archivo __.env.template__ y renombrar la copia a __.env__


6. llenar las variales de entornos definidas en el __.env__


7. ejecutar la aplicacion en dev:

```
yarn start:dev

```

8. Recosntruir la base de datos con la semilla 
```
http://localhost:3000/api/seed

```
# production Build
1. crear el archivo ```.env.prod```
2. llenar las variables de entornos de prod
3. crear la nueva imagen 

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build

```
4. levantar la imagen 

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up

```


## Stack usado
* mongoDB
* Nest
